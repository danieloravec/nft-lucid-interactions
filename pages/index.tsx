import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { WalletApiCip0030, SupportedWallet, supportedWallets } from '@cardano/wallet';
import NftForm from "@components/NftForm";
import { Lucid, Blockfrost } from 'lucid-cardano';

const Home: NextPage = () => {
  const [selectedWallet, setSelectedWallet] = useState(undefined as SupportedWallet | undefined);
  const [lucid, setLucid] = useState(undefined as Lucid | undefined);
  const [wallet, setWallet] = useState(undefined as WalletApiCip0030 | undefined);
  const [address, setAddress] = useState(undefined as string | undefined);

  const disconnectWallet = () => {
    setSelectedWallet(undefined);
    setWallet(undefined);
    setAddress(undefined);
    setLucid(undefined);
  }

  useEffect(() => {
    async function connectWallet() {
      if(selectedWallet === undefined) {
        disconnectWallet();
        return;
      }
      const walletApi =
          typeof window !== "undefined"
            ? window.cardano?.[selectedWallet]
            : undefined;
      if (!walletApi) {
        throw new Error("WALLET_NOT_INSTALLED");
      }
      const walletEnabled = await walletApi.enable();

      const newLucid = await Lucid.new(
          new Blockfrost(
          "https://cardano-mainnet.blockfrost.io/api/v0",
          "mainnetGXsABkjQDCdtDNrPdRZJFeqaPH41BPSY" // This is a throwaway key, but it works
          ),
          "Mainnet"
      );
      newLucid.selectWallet(walletEnabled);
      setLucid(newLucid);
      setWallet(walletEnabled);
      setAddress(await newLucid.wallet.address());
    }
    if(!wallet || !lucid) {
      connectWallet();
    }
  }, [wallet, lucid, selectedWallet]);

  if(!wallet || !lucid) {
    return (
      <div>
        <select id="wallet-name">
          {supportedWallets.map((supportedWallet: SupportedWallet) =>
            <option key={supportedWallet} value={supportedWallet}>{supportedWallet}</option>
          )}
        </select>
        <button onClick={() => setSelectedWallet((document.getElementById("wallet-name") as HTMLInputElement).value as SupportedWallet)}>
          Connect wallet
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>{address ? address : "connecting..."}</p>
      <NftForm lucid={lucid} />
      <button onClick={disconnectWallet}>Disconnect</button>
    </div>
  )
}

export default Home
