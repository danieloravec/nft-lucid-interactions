import React, { useEffect, useState } from "react";
import { makeJpgV2Listing, cancelJpgV2Listing, Royalty, ListingParams } from "@cardano/transactions";
import { toHex } from "@utils";
import { WalletApiCip0030 } from "@cardano/wallet";
import { Lucid, Blockfrost } from "lucid-cardano";

type ListNftFormProps = {
    lucid: Lucid;
}

function ListNftForm(props: ListNftFormProps) {

    const [policyId, setPolicyId] = useState("95ab9a125c900c14cf7d39093e3577b0c8e39c9f7548a8301a28ee2d");
    const [tokenName, setTokenName] = useState("AdaIdiot7179");
    const [price, setPrice] = useState(10000000);
    const [royaltyAddr, setRoyaltyAddr] = useState("addr1q86rfvkfsxx65sv7vvd9yrnthxzr0twkcev0aefvrcr6yrtwftm6mnlk0uwpuljcqkmuj923y5yjm4w7ayna6slvvscqra2w2j");
    const [royaltyRate, setRoyaltyRate] = useState(0.03);

    const getCurrentListingParams = (): ListingParams => {
        return {
            policyId,
            tokenNameHex: Buffer.from(tokenName, "utf-8").toString("hex"),
            price,
            royalty: royaltyAddr !== "" && royaltyRate !== 0 ? {
                address: royaltyAddr,
                rate: royaltyRate
            } as Royalty : undefined
        }
    }

    const handleList = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await makeJpgV2Listing(getCurrentListingParams(), props.lucid);
    };

    const handleCancel = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await cancelJpgV2Listing(getCurrentListingParams(), props.lucid);
    }

    return (
        <form>
            <label htmlFor="policy-id">Policy ID</label>
            <input id="policy-id" type="text" value={policyId} onChange={(e) => setPolicyId(e.currentTarget.value)} />
            <br/>
            <label htmlFor="token-name">Token name</label>
            <input id="token-name" type="text" value={tokenName} onChange={(e) => setTokenName(e.currentTarget.value)} />
            <br/>
            <label htmlFor="price">Price (lovelace)</label>
            <input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.currentTarget.value))} />
            <br/>
            <label htmlFor="royalty-addr">Royalty address</label>
            <input id="royalty-addr" type="text" value={royaltyAddr} onChange={(e) => setRoyaltyAddr(e.currentTarget.value)} />
            <br/>
            <label htmlFor="royalty-rate">Royalty rate</label>
            <input id="royalty-rate" type="number" value={royaltyRate} onChange={(e) => setRoyaltyRate(Number(e.currentTarget.value))} />
            <br/>
            <button onClick={handleList}>List</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default ListNftForm;