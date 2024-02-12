import { useLocation } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";

import {
  AccountExternalTransactions,
  AccountInternalTransactions,
  AccountERC20Tokens,
  AccountNFTs,
} from "../../components/Account/EoaAccountComponents";
import "./EoaAccount.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Account() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("externaltransactions");
  const { pathname } = useLocation();
  const accountid = pathname.split("/");

  useEffect(() => {
    async function getAccount() {
      try {
        const newAccountAddress = accountid[2];
        const newAccountBalance = parseInt(
          await alchemy.core.getBalance(newAccountAddress),
          16
        );
        setAccount(newAccountAddress);
        setBalance(newAccountBalance);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching account details: ", err.message);
      }
    }

    getAccount();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h4>Account Address: {account}</h4>
          <h4>ETH Balance: {balance}</h4>
          <div>
            <button onClick={() => setSelectedTab("externaltransactions")}>
              External Transactions
            </button>
            <button onClick={() => setSelectedTab("internaltransactions")}>
              Internal Transactions
            </button>
            <button onClick={() => setSelectedTab("nfts")}>NFTs</button>
            <button onClick={() => setSelectedTab("ERC20tokens")}>
              ERC-20 Tokens
            </button>
          </div>
          {selectedTab === "externaltransactions" && (
            <AccountExternalTransactions account={account} />
          )}
          {selectedTab === "internaltransactions" && (
            <AccountInternalTransactions account={account} />
          )}
          {selectedTab === "nfts" && <AccountNFTs account={account} />}
          {selectedTab === "ERC20tokens" && (
            <AccountERC20Tokens account={account} />
          )}
        </>
      )}
    </>
  );
}
