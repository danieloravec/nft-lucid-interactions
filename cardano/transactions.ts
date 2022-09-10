import { Lucid, Blockfrost } from "lucid-cardano";
import { WalletApiCip0030 } from "@cardano/wallet";

export type Royalty = {
  address: string;
  rate: number;
};

export type ListParams = {
  policyId: string;
  tokenNameHex: string;
  price: number;
  royalty?: Royalty;
};

export async function makeJpgV2Listing(
  listParams: ListParams,
  wallet: WalletApiCip0030
): Promise<string> {
  const lucid = await Lucid.new(
    new Blockfrost(
      "https://cardano-mainnet.blockfrost.io/api/v0",
      "mainnetGXsABkjQDCdtDNrPdRZJFeqaPH41BPSY"
    ),
    "Mainnet"
  );
  lucid.selectWallet(wallet);

  const tx = await lucid
    .newTx()
    .payToAddress(
      "addr1qy3g22ypmul3ya40j98qry0gaw5kjukj9kvh44j439a2mtkkrakerzxehehdulnn55lecm0n83t9r77w8crju6u3z6zsnu2tl6",
      { lovelace: 1000000n }
    )
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  console.log(txHash);

  return txHash;
}
