import { useLocation } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";

import {
  ContractTransactions,
  ContractInternalTransactions,
  ContractERC20Tokens,
} from "../../components/Account/ContractAccountComponents";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Contract() {
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("transactions");
  const { pathname } = useLocation();
  const contractid = pathname.split("/");

  useEffect(() => {
    async function getContract() {
      try {
        const newContractAddress = contractid[2];
        const newContractBalance = parseInt(
          await alchemy.core.getBalance(newContractAddress),
          16
        );
        const newContractDeployer = await alchemy.core.findContractDeployer(
          newContractAddress
        );
        const newContractDetails = {};
        newContractDetails.address = newContractAddress;
        newContractDetails.balance = newContractBalance;
        newContractDetails.deployer = newContractDeployer.deployerAddress;
        newContractDetails.block = newContractDeployer.blockNumber;

        setContract(newContractDetails);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching contract details: ", err.message);
      }
    }
    getContract();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading contract details...</p>
      ) : (
        <>
          <h4>Contract Address: {contract.address}</h4>
          <h4>ETH Balance: {contract.balance}</h4>
          <p>Deployer: {contract.deployer}</p>
          <p>Block: {contract.block}</p>
          <div>
            <button onClick={() => setSelectedTab("transactions")}>
              Transactions
            </button>
            <button onClick={() => setSelectedTab("internaltransactions")}>
              Internal Transactions
            </button>
            <button onClick={() => setSelectedTab("ERC20tokens")}>
              ERC-20 Tokens
            </button>
          </div>
          {selectedTab === "transactions" && (
            <ContractTransactions account={contract.address} />
          )}
          {selectedTab === "internaltransactions" && (
            <ContractInternalTransactions account={contract.address} />
          )}
          {selectedTab === "ERC20tokens" && (
            <ContractERC20Tokens account={contract.address} />
          )}
        </>
      )}
    </>
  );
}
