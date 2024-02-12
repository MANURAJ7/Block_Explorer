import { useLocation } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const transactionid = pathname.split("/");

  useEffect(() => {
    async function getTransaction() {
      try {
        const newtransaction = await alchemy.core.getTransaction(
          transactionid[2]
        );
        setTransaction(newtransaction);
        setLoading(false);
        console.log(newtransaction);
      } catch (err) {
        console.error("Error while fetching transaction: ", err.message);
      }
    }

    getTransaction();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tr>
            <td>Transaction Hash:</td>
            <td>{transaction.hash}</td>
          </tr>
          <tr>
            <td>Block:</td>
            <td>{transaction.blockNumber}</td>
          </tr>
          <tr>
            <td>Confirmations:</td>
            <td>{transaction.confirmations}</td>
          </tr>
          <tr>
            <td>Chain id:</td>
            <td>{transaction.chainId}</td>
          </tr>
          <hr />
          <tr>
            <td>From:</td>
            <td>{transaction.from}</td>
          </tr>
          <tr>
            <td>To:</td>
            <td>{transaction.to}</td>
          </tr>
          <tr>
            <td>Nonce:</td>
            <td>{transaction.nonce}</td>
          </tr>
          <hr />
          <tr>
            <td>Value:</td>
            <td>{parseInt(transaction.value._hex, 16)}</td>
          </tr>
          <tr>
            <td>Gas Price:</td>
            <td>{parseInt(transaction.gasPrice._hex, 16)}</td>
          </tr>
          <tr>
            <td>Gas Limit:</td>
            <td>{parseInt(transaction.gasLimit._hex, 16)}</td>
          </tr>
        </table>
      )}
    </>
  );
}
