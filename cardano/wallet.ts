import { Wallet } from "lucid-cardano";

export type SupportedWallet = "nami" | "undefined";

export type Paginate = {
  page: number;
  limit: number;
};

interface WalletGenericEvent {
  (eventName: "accountChange", cb: (addresses: string[]) => void): void;
  (eventName: "networkChange", cb: (network: string) => void): void;
}

export type WalletApiCip0030 = {
  enable: () => Promise<WalletApiCip0030>;
  isEnabled: () => Promise<boolean>;
  apiVersion: () => Promise<string>;
  name: () => Promise<string>;
  icon: () => Promise<string>;
  getNetworkId: () => Promise<number>;
  getUtxos: (amount?: string, paginate?: Paginate) => Promise<string[]>;
  experimental: {
    getCollateral: () => Promise<string[]>;
    on?: WalletGenericEvent;
    off?: WalletGenericEvent;
  };
  getBalance: () => Promise<string>;
  getUsedAddresses: (paginate?: Paginate) => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  signTx: (tx: string, partialSign: boolean) => Promise<string>;
  signData: (addr: string, payload: string) => Promise<string>;
  submitTx: (tx: string) => Promise<string>;
};
