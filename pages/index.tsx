import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { WalletApiCip0030, SupportedWallet } from '@cardano/wallet';
import ListNftForm from "@components/ListNftForm";

const Home: NextPage = () => {
  const [selectedWallet, setSelectedWallet] = useState("undefined" as SupportedWallet);
  const [wallet, setWallet] = useState(undefined as WalletApiCip0030 | undefined);
  const [address, setAddress] = useState(undefined as string | undefined);

  useEffect(() => {
    async function connectWallet() {
      if(selectedWallet === "undefined") {
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
      setWallet(walletEnabled);
      setAddress((await walletEnabled.getUsedAddresses())[0]);
    }
    if(!wallet) {
      connectWallet();
    }
  }, [selectedWallet, wallet]);

  if(!wallet) {
    return <button onClick={() => setSelectedWallet("nami")}>Connect Nami</button>
  }

  console.log(`walletLook: ${wallet.getUtxos}`);

  return (
    <div>
      <p>{address ? "connected" : "not connected"}</p>
      <ListNftForm wallet={wallet} />
    </div>
  )
}

export default Home
