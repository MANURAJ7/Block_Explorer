import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export function ContractTransactions(account) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTransactions() {
      try {
        const newTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          toAddress: account.account,
          order: "desc",
          category: [
            //"internal",
            "erc721",
            //"erc20",
            "external",
            "specialnft",
          ],
        });
        const newFromTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          fromAddress: account.account,
          order: "desc",
          category: [
            //"internal",
            "erc721",
            //"erc20",
            "external",
            "specialnft",
          ],
        });
        setTransactions(
          newTransactions.transfers.concat(newFromTransactions.transfers)
        );
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching contract transactions: ",
          err.message
        );
      }
    }
    getTransactions();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Block</th>
                <th>From</th>
                <th>To</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr>
                  <td>{tx.hash}</td>
                  <td>{parseInt(tx.blockNum, 16)}</td>
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td>{tx.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
export function ContractInternalTransactions(account) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTransactions() {
      try {
        const newTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          fromAddress: account.account,
          order: "desc",
          excludeZeroValue: true,
          category: ["internal"],
        });
        const newFromTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          toAddress: account.account,
          order: "desc",
          excludeZeroValue: true,
          category: ["internal"],
        });
        setTransactions(
          newTransactions.transfers.concat(newFromTransactions.transfers)
        );
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching contract transactions: ",
          err.message
        );
      }
    }
    getTransactions();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Block</th>
                <th>From</th>
                <th>To</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr>
                  <td>{tx.hash}</td>
                  <td>{parseInt(tx.blockNum, 16)}</td>
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td>{tx.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
export function ContractERC20Tokens(account) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTransactions() {
      try {
        const newTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          toAddress: account.account,
          order: "desc",
          excludeZeroValue: true,
          category: ["erc20"],
        });
        setTransactions(newTransactions.transfers);
        console.log(newTransactions);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching contract transactions: ",
          err.message
        );
      }
    }
    getTransactions();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Block</th>
                <th>From</th>
                <th>To</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr>
                  <td>{tx.hash}</td>
                  <td>{parseInt(tx.blockNum, 16)}</td>
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td>{tx.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
