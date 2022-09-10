import React, { useState } from "react";
import { makeJpgV2Listing, Royalty, ListParams } from "@cardano/transactions";
import { toHex } from "@utils";
import { WalletApiCip0030 } from "@cardano/wallet";

type ListNftFormProps = {
    wallet: WalletApiCip0030;
}

function ListNftForm(props: ListNftFormProps) {

    const [policyId, setPolicyId] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [price, setPrice] = useState(0);
    const [royaltyAddr, setRoyaltyAddr] = useState("");
    const [royaltyRate, setRoyaltyRate] = useState(0);

    const handleList: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent) => {
        e.preventDefault();
        await makeJpgV2Listing({
            policyId,
            tokenNameHex: toHex(tokenName),
            price,
            royalty: royaltyAddr !== "" && royaltyRate !== 0 ? {
                address: royaltyAddr,
                rate: royaltyRate
            } as Royalty : undefined
        } as ListParams, props.wallet);
    };

    return (
        <form onSubmit={async (e) => await handleList(e)}>
            <label htmlFor="policy-id">Policy ID</label>
            <input id="policy-id" type="text" onChange={(e) => setPolicyId(e.currentTarget.value)} />
            <br/>
            <label htmlFor="token-name">Token name</label>
            <input id="token-name" type="text" onChange={(e) => setTokenName(e.currentTarget.value)} />
            <br/>
            <label htmlFor="price">Price (lovelace)</label>
            <input id="price" type="number" onChange={(e) => setPrice(Number(e.currentTarget.value))} />
            <br/>
            <label htmlFor="royalty-addr">Royalty address</label>
            <input id="royalty-addr" type="text" onChange={(e) => setRoyaltyAddr(e.currentTarget.value)} />
            <br/>
            <label htmlFor="royalty-rate">Royalty rate</label>
            <input id="royalty-rate" type="number" onChange={(e) => setRoyaltyRate(Number(e.currentTarget.value))} />
            <br/>
            <input type="submit" />
        </form>
    );
}

export default ListNftForm;