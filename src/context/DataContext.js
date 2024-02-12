import React from "react";
import { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const DataContext = React.createContext();

function DataContextProvider({ children }) {
  const [blocksData, setBlocksData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  async function getBlocksInfo() {
    try {
      setBlocksData([]);
      setTransactionsData([]);
      const latestBlock = await alchemy.core.getBlockNumber();
      for (let i = 0; i < 20; i++) {
        const blockInfo = await alchemy.core.getBlockWithTransactions(
          latestBlock - i
        );

        const newBlock = {
          number: blockInfo.number,
          hash: blockInfo.hash,
          parentHash: blockInfo.parentHash,
          timestamp: blockInfo.timestamp,
          nonce: parseInt(blockInfo.nonce, 16),
          transactions: blockInfo.transactions,
          difficulty: parseInt(blockInfo._difficulty._hex, 16),
          miner: blockInfo.miner,
          gasLimit: parseInt(blockInfo.gasLimit._hex, 16),
          baseFeePerGas: parseInt(blockInfo.baseFeePerGas._hex, 16),
          gasUsed: parseInt(blockInfo.gasUsed._hex, 16),
        };
        setBlocksData((prevData) => {
          return [...prevData, newBlock];
        });
        if (i == 0) {
          setTransactionsData((prev) => {
            return [...prev, ...newBlock.transactions];
          });
        }
      }
    } catch (err) {
      alert("Error while getting latest blocks: ", err.message);
    }
  }
  return (
    <DataContext.Provider
      value={{ getBlocksInfo, blocksData, transactionsData }}
    >
      {children}
    </DataContext.Provider>
  );
}
export { DataContextProvider, DataContext };
