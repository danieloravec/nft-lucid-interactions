import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { WalletApiCip0030, SupportedWallet } from '@cardano/wallet';
import ListNftForm from "@components/ListNftForm";
import { Lucid, Blockfrost } from 'lucid-cardano';

const Home: NextPage = () => {
  const [selectedWallet, setSelectedWallet] = useState("undefined" as SupportedWallet);
  const [lucid, setLucid] = useState(undefined as Lucid | undefined);
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

      const newLucid = await Lucid.new(
          new Blockfrost(
          "https://cardano-mainnet.blockfrost.io/api/v0",
          "mainnetGXsABkjQDCdtDNrPdRZJFeqaPH41BPSY"
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
  }, [selectedWallet, wallet, lucid]);

  if(!wallet || !lucid) {
    return <button onClick={() => setSelectedWallet("nami")}>Connect Nami</button>
  }

  return (
    <div>
      <p>{address ? address : "not connected"}</p>
      <ListNftForm lucid={lucid} />
    </div>
  )
}

export default Home
