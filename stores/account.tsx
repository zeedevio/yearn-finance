import async from 'async';
import {
  GAS_PRICE_API,
  ZAPPER_GAS_PRICE_API,
  ERROR,
  STORE_UPDATED,
  CONFIGURE,
  ACCOUNT_CONFIGURED,
  GET_ACCOUNT_BALANCES,
  ACCOUNT_BALANCES_RETURNED,
  CONFIGURE_VAULTS,
  CONFIGURE_LENDING,
  CONFIGURE_CDP,
  LENDING_CONFIGURED,
  CDP_CONFIGURED,
  ACCOUNT_CHANGED,
  GET_GAS_PRICES,
  GAS_PRICES_RETURNED,
  CONNECTION_DISCONNECTED
} from './constants';

import { ERC20ABI } from './abis';
import Web3Modal from 'web3modal';

import { bnDec } from '../utils';

import stores from './';

import { injected, walletconnect, walletlink, fortmatic, portis, network } from './connectors';

import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { IAssetData } from '../utils/helpers/types';
import { getChainData } from '../utils/helpers/utilities';

// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
// @ts-ignore
import Fortmatic from 'fortmatic';

interface IProps {
    dispatcher:any;
    emitter:any;
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
  

type Props = IProps;
class Store<IAppState,Props>{

    dispatcher:any;
    emitter:any;
    web3Modal:any;

   store = {
    web3modalInfo: {
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
    },  //web3modal will contain all the web 3 info coming from web3modal
    account: null,
    chainInvalid: false,
    web3context: null,
    tokens: [],
    connectorsByName: {
      MetaMask: injected,
      TrustWallet: injected,
      WalletConnect: walletconnect,
      WalletLink: walletlink,
      // Ledger: ledger,
      // Trezor: trezor,
      // Frame: frame,
      Fortmatic: fortmatic,
      Portis: portis,
      // Squarelink: squarelink,
      // Torus: torus,
      // Authereum: authereum
    },
    gasPrices: {
      standard: 90,
      fast: 100,
      instant: 130,
    },
    gasSpeed: 'fast',
    currentBlock: 11743358,
  };
 
  state = {
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
   }
  constructor(props) {
   this.dispatcher = props.dispatcher;
   this.emitter = props.emitter;

   

   this.web3Modal = new Web3Modal({
    network: this.getNetwork(),
    cacheProvider: true,
    providerOptions: this.getProviderOptions(),
  });

    props.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case GET_ACCOUNT_BALANCES:
            this.getBalances(payload);
            break;
          default: {
          }
        }
      }.bind(this),
    );
  }

  getStore(index) {
    return this.store[index];
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj };
    // console.log(this.store);
    return this.emitter.emit(STORE_UPDATED);
  }



  configure = async () => {
    this.getGasPrices();
    this.getCurrentBlock();
    const provider = await this.web3Modal.connect();

    await this.subscribeProvider(provider);

    const web3: any = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const networkId = await web3.eth.net.getId();

    const chainId = await web3.eth.chainId();

    await setState({
        web3,
        provider,
        connected: true,
        address,
        chainId,
        networkId,
      });
      await this.getAccountAssets();
    injected.isAuthorized().then((isAuthorized) => {
      const { supportedChainIds } = injected;
      // fall back to ethereum mainnet if chainId undefined
      const { chainId = 1 } = window.ethereum || {};
      const parsedChainId = parseInt(chainId, 16);
      const isChainSupported = supportedChainIds.includes(parsedChainId);
      if (!isChainSupported) {
        this.setStore({ chainInvalid: true });
        this.emitter.emit(ACCOUNT_CHANGED);
      }

      if (isAuthorized && isChainSupported) {
        injected
          .activate()
          .then((a) => {
            this.setStore({
              account: { address: a.account },
              web3context: { library: { provider: a.provider } },
            });
            this.emitter.emit(ACCOUNT_CONFIGURED);

            this.dispatcher.dispatch({
              type: CONFIGURE_VAULTS,
              content: { connected: true },
            });
            this.dispatcher.dispatch({
              type: CONFIGURE_LENDING,
              content: { connected: true },
            });
            this.dispatcher.dispatch({
              type: CONFIGURE_CDP,
              content: { connected: true },
            });
          })
          .catch((e) => {
            this.emitter.emit(ERROR, e);
            this.emitter.emit(ACCOUNT_CONFIGURED);

            this.dispatcher.dispatch({
              type: CONFIGURE_VAULTS,
              content: { connected: false },
            });
            this.dispatcher.dispatch({
              type: CONFIGURE_LENDING,
              content: { connected: false },
            });
            this.dispatcher.dispatch({
              type: CONFIGURE_CDP,
              content: { connected: false },
            });
          });
      } else {
        //we can ignore if not authorized.
        this.emitter.emit(ACCOUNT_CONFIGURED);
        this.emitter.emit(LENDING_CONFIGURED);
        this.emitter.emit(CDP_CONFIGURED);

        this.dispatcher.dispatch({
          type: CONFIGURE_VAULTS,
          content: { connected: false },
        });
      }
    });

    if (window.ethereum) {
      this.updateAccount();
    } else {
      window.removeEventListener('ethereum#initialized', this.updateAccount);
      window.addEventListener('ethereum#initialized', this.updateAccount, {
        once: true,
      });
    }
  };

  updateAccount = () => {
    const that = this;
    const res = window.ethereum.on('accountsChanged', function (accounts) {
      that.setStore({
        account: { address: accounts[0] },
        web3context: { library: { provider: window.ethereum } },
      });
      that.emitter.emit(ACCOUNT_CHANGED);
      that.emitter.emit(ACCOUNT_CONFIGURED);

      that.dispatcher.dispatch({
        type: CONFIGURE_VAULTS,
        content: { connected: true },
      });
      that.dispatcher.dispatch({
        type: CONFIGURE_LENDING,
        content: { connected: true },
      });
      that.dispatcher.dispatch({
        type: CONFIGURE_CDP,
        content: { connected: true },
      });
    });

    window.ethereum.on('chainChanged', function (chainId) {
      const supportedChainIds = [1];
      const parsedChainId = parseInt(chainId, 16);
      const isChainSupported = supportedChainIds.includes(parsedChainId);
      that.setStore({ chainInvalid: !isChainSupported });
      that.emitter.emit(ACCOUNT_CHANGED);
      that.emitter.emit(ACCOUNT_CONFIGURED);

      that.configure()
    });
  };

  disconnectAccount = () =>{
    this.emitter.emit(ACCOUNT_CONFIGURED);
    this.emitter.emit(LENDING_CONFIGURED);
    this.emitter.emit(CDP_CONFIGURED);

    this.dispatcher.dispatch({
      type: CONFIGURE_VAULTS,
      content: { connected: false },
    });
    stores.accountStore.setStore({ account: {}, web3context: null });
    stores.emitter.emit(CONNECTION_DISCONNECTED);
  }

  getBalances = async (payload) => {
    const account = this.getStore('account');
    if (!account) {
      return false;
      //maybe throw an error
    }

    const web3 = await this.getWeb3Provider();
    if (!web3) {
      return false;
      //maybe throw an error
    }

    const vaults = stores.investStore.getStore('vaults');

    const vaultTokens = vaults.map((v) => {
      return {
        address: v.tokenAddress,
        decimals: v.tokenMetadata.decimals,
        symbol: v.tokenMetadata.symbol,
        displayName: v.tokenMetadata.displayName,
        name: v.tokenMetadata.name,
        icon: v.tokenMetadata.icon,
      };
    });
    //get lelnding assets, append them to this
    async.map(
      vaultTokens,
      async (token, callback) => {
        try {
          const erc20Contract = new web3.eth.Contract(ERC20ABI, token.address);
          const balanceOf = await erc20Contract.methods.balanceOf(account.address).call();

          token.balance = BigNumber(balanceOf).div(bnDec(token.decimals)).toFixed(token.decimals, BigNumber.ROUND_DOWN);

          if (callback) {
            callback(null, token);
          } else {
            return token;
          }
        } catch (ex) {
          console.log(ex);
        }
      },
      (err, tokensBalanced) => {
        if (err) {
          return this.emitter.emit(ERROR, err);
        }

        const tokens = this.setStore({ tokens: tokensBalanced });
      },
    );
  };

  getCurrentBlock = async (payload?) => {
    try {
      var web3 = new Web3(process.env.NEXT_PUBLIC_PROVIDER);
      const block = await web3.eth.getBlockNumber();
      this.setStore({ currentBlock: block });
    } catch (ex) {
      console.log(ex);
    }
  };

  getGasPrices = async (payload?) => {
    const gasPrices = await this._getGasPrices();
    let gasSpeed = localStorage.getItem('yearn.finance-gas-speed');

    if (!gasSpeed) {
      gasSpeed = 'fast';
      localStorage.getItem('yearn.finance-gas-speed', 'fast');
    }

    this.setStore({ gasPrices: gasPrices, gasSpeed: gasSpeed });
    this.emitter.emit(GAS_PRICES_RETURNED);
  };

  _getGasPrices = async (payload?) => {
    try {
      const url = ZAPPER_GAS_PRICE_API;
      const priceResponse = await fetch(url);
      const priceJSON = await priceResponse.json();

      if (priceJSON) {
        return priceJSON;
      }
    } catch (e) {
      console.log(e);
      const web3 = await this._getWeb3Provider();
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceInGwei = web3.utils.fromWei(gasPrice, "gwei");
      return {
        standard: gasPriceInGwei,
        fast: gasPriceInGwei,
        instant: gasPriceInGwei,
      };
    }
  };

  getGasPrice = async (speed) => {
    let gasSpeed = speed;
    if (!speed) {
      gasSpeed = this.getStore('gasSpeed');
    }

    try {
      const url = ZAPPER_GAS_PRICE_API;
      const priceResponse = await fetch(url);
      const priceJSON = await priceResponse.json();

      if (priceJSON) {
        return priceJSON[gasSpeed].toFixed(0);
      }
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  getWeb3Provider = async () => {
    let web3context = this.getStore('web3context');
    let provider = null;

    if (!web3context) {
      provider = network.providers['1'];
    } else {
      provider = web3context.library.provider;
    }

    if (!provider) {
      return null;
    }
    return new Web3(provider);
  };

// ==========================================

//   /NewFunctions added



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

  public getNetwork = () => getChainData(this.store.web3modalInfo.chainId).network;

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


}

export default Store;
