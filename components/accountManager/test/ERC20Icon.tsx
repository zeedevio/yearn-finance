import * as React from "react";
import * as PropTypes from "prop-types";
import Icon from "./Icon";
// import erc20 froms "./assets/erc20.svg";

const ERC20Icon = (props: any) => {
  const src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${props.contractAddress.toLowerCase()}.png`;
  return null;
};

ERC20Icon.propTypes = {
  contractAddress: PropTypes.string,
  size: PropTypes.number,
};

ERC20Icon.defaultProps = {
  contractAddress: null,
  size: 20,
};

export default ERC20Icon;
