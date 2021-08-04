import * as React from 'react';
import Web3 from 'web3';
import styled from 'styled-components';

import Web3Modal from 'web3modal';
import { IAssetData } from '../../utils/helpers/types';
import { fonts } from '../../utils/helpers/styles';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
// @ts-ignore
import Fortmatic from 'fortmatic';
// import Torus from "@toruslabs/torus-embed";
// import Authereum from "authereum";
// import { Bitski } from "bitski";




import { apiGetAccountAssets } from '../../utils/helpers/api';
import { getChainData } from '../../utils/helpers/utilities';

import Head from "next/head";
import classes from "./layout.module.css";
import Header from "../header/header";
import Navigation from "../navigation/navigation";
import SnackbarController from "../snackbar/snackbarController";

import AccountManager from "../../stores/accountManager";
export const siteTitle = "Yearn";





function initWeb3(provider: any) {
  const web3: any = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

interface IAppState {
  fetching: boolean;
  address: string;
  web3: any;
  provider: any;
  connected: boolean;
  chainId: number;
  networkId: number;
  assets: IAssetData[];
  showModal: boolean;
  pendingRequest: boolean;
  result: any | null;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: '',
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
};


interface IProps{
  children: any;
  configure?: any;
  backClicked?:  any;
  changeTheme?: any;
}


type Props = IProps;

class Layout extends React.Component<Props> {

  public web3Modal: Web3Modal;
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions(),
    });
  }

  public componentDidMount() {
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
  }

  public onConnect = async () => {
    const provider = await this.web3Modal.connect();

    await this.subscribeProvider(provider);

    const web3: any = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const networkId = await web3.eth.net.getId();

    const chainId = await web3.eth.chainId();

    await this.setState({
      web3,
      provider,
      connected: true,
      address,
      chainId,
      networkId,
    });
    await this.getAccountAssets();
  };

  public subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on('close', () => this.resetApp());
    provider.on('accountsChanged', async (accounts: string[]) => {
      await this.setState({ address: accounts[0] });
      await this.getAccountAssets();
    });
    provider.on('chainChanged', async (chainId: number) => {
      const { web3 } = this.state;
      const networkId = await web3.eth.net.getId();
      await this.setState({ chainId, networkId });
      await this.getAccountAssets();
    });

    provider.on('networkChanged', async (networkId: number) => {
      const { web3 } = this.state;
      const chainId = await web3.eth.chainId();
      await this.setState({ chainId, networkId });
      await this.getAccountAssets();
    });
  };

  public getNetwork = () => getChainData(this.state.chainId).network;

  public getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
        },
      },
      //   torus: {
      //     package: Torus
      //   },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: process.env.REACT_APP_FORTMATIC_KEY,
        },
      },
      //   authereum: {
      //     package: Authereum
      //   },
      //   bitski: {
      //     package: Bitski,
      //     options: {
      //       clientId: process.env.REACT_APP_BITSKI_CLIENT_ID,
      //       callbackUrl: window.location.href + "bitski-callback.html"
      //     }
      //   }
    };
    return providerOptions;
  };

  public getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.setState({ fetching: true });
    try {
      // get account balances
      const assets = await apiGetAccountAssets(address, chainId);

      await this.setState({ fetching: false, assets });
    } catch (error) {
      console.error(error); // tslint:disable-line
      await this.setState({ fetching: false });
    }
  };

  public toggleModal = () => this.setState({ showModal: !this.state.showModal });

  public resetApp = async () => {
    const { web3 } = this.state;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    this.setState({ ...INITIAL_STATE });
  };


render(){
  const { assets, address, connected, chainId, fetching, showModal, pendingRequest, result } = this.state;

  return (
    <div className={classes.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name="description" content="Yearn.finance" />
        <meta name="og:title" content="Yearn" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {!this.props.configure && (
        <Navigation backClicked={this.props.backClicked} changeTheme={this.props.changeTheme} />
      )}
      {/* <AccountManager /> */}
      <div className={classes.content}>
        {!this.props.configure && (
          <Header backClicked={this.props.backClicked} 
          createConnection={this.onConnect}
          connected={connected} address={address} chainId={chainId} killSession={this.resetApp} 
          changeTheme={this.props.changeTheme} />
        )}
        <SnackbarController />
        <main>{this.props.children}</main>
      </div>
    </div>
  );
        }
        
}
export default Layout