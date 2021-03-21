export const vaultManagerKeep3rSushiSwapMainAssetABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultManagerParameters",
        type: "address"
      },
      {
        internalType: "address",
        name: "_keep3rOracleSushiSwapMainAsset",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "main",
        type: "uint256"
      },
      { indexed: false, internalType: "uint256", name: "usdp", type: "uint256" }
    ],
    name: "Exit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "main",
        type: "uint256"
      },
      { indexed: false, internalType: "uint256", name: "usdp", type: "uint256" }
    ],
    name: "Join",
    type: "event"
  },
  {
    inputs: [],
    name: "ORACLE_TYPE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "Q112",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "mainAmount", type: "uint256" },
      { internalType: "uint256", name: "usdpAmount", type: "uint256" }
    ],
    name: "depositAndBorrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "usdpAmount", type: "uint256" }],
    name: "depositAndBorrow_Eth",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract ChainlinkedOracleSimple",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "mainAmount", type: "uint256" },
      { internalType: "uint256", name: "usdpAmount", type: "uint256" }
    ],
    name: "spawn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "usdpAmount", type: "uint256" }],
    name: "spawn_Eth",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "vault",
    outputs: [{ internalType: "contract Vault", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "vaultManagerParameters",
    outputs: [
      {
        internalType: "contract VaultManagerParameters",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "mainAmount", type: "uint256" },
      { internalType: "uint256", name: "usdpAmount", type: "uint256" }
    ],
    name: "withdrawAndRepay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "ethAmount", type: "uint256" },
      { internalType: "uint256", name: "usdpAmount", type: "uint256" }
    ],
    name: "withdrawAndRepay_Eth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
