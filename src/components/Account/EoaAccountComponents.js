import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export function AccountExternalTransactions(account) {
  const [toTransactions, setToTransactions] = useState([]);
  const [fromTransactions, setFromTransactions] = useState([]);
  const [isToTx, setToTx] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getToTransactions() {
      try {
        const newTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          toAddress: account.account,
          order: "desc",
          excludeZeroValue: true,
          pageKey: true,
          category: [
            "external",
            // "internal", done
            // "erc20", done
            // "erc721", done
            // "erc1155",
            // "specialnft",
          ],
        });
        setToTransactions(newTransactions.transfers);
        console.log("to tx: ", newTransactions);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching account transactions: ",
          err.message
        );
      }
    }
    async function getFromTransactions() {
      try {
        const newTransactions = await alchemy.core.getAssetTransfers({
          maxCount: 10,
          fromAddress: account.account,
          order: "desc",
          excludeZeroValue: true,
          category: ["external"],
        });
        setFromTransactions(newTransactions.transfers);
        console.log("from tx: ", newTransactions);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching account transactions: ",
          err.message
        );
      }
    }
    getToTransactions();
    getFromTransactions();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button
            onClick={() => {
              setToTx(true);
            }}
          >
            To
          </button>
          <button
            onClick={() => {
              setToTx(false);
            }}
          >
            From
          </button>
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
              {isToTx &&
                toTransactions.map((tx) => (
                  <tr>
                    <td>{tx.hash}</td>
                    <td>{parseInt(tx.blockNum, 16)}</td>
                    <td>{tx.from}</td>
                    <td>{tx.to}</td>
                    <td>{tx.value}</td>
                  </tr>
                ))}
              {!isToTx &&
                fromTransactions.map((tx) => (
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

export function AccountInternalTransactions(account) {
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
        setTransactions(newTransactions.transfers);
        console.log(newTransactions);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching account transactions: ",
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

export function AccountERC20Tokens(account) {
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
          category: ["erc20"],
        });
        setTransactions(newTransactions.transfers);
        console.log(newTransactions);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error while fetching account transactions: ",
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
                <th>Asset</th>
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
                  <td>{tx.asset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export function AccountNFTs(account) {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getNFTs() {
      try {
        const newNFTs = await alchemy.core.getAssetTransfers({
          maxCount: 20,
          fromAddress: account.account,
          order: "desc",
          category: ["erc721"],
        });
        setNFTs(newNFTs.transfers);
        console.log(newNFTs);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching account NFTs: ", err.message);
      }
    }
    getNFTs();
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
                <th>Token id</th>
              </tr>
            </thead>
            <tbody>
              {NFTs.map((nft) => (
                <tr>
                  <td>{nft.hash}</td>
                  <td>{nft.blockNum}</td>
                  <td>{nft.from}</td>
                  <td>{nft.to}</td>
                  <NavLink
                    to={`/NFT/${nft.rawContract.address}/${parseInt(
                      nft.erc721TokenId,
                      16
                    )}`}
                  >
                    <td>{nft.tokenId}</td>
                  </NavLink>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </>
      )}
    </>
  );
}
