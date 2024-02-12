import { useLocation } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Block.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Block() {
  const [block, setBlock] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const blockid = pathname.split("/");

  useEffect(() => {
    async function getBlock() {
      try {
        let newblock;
        if (isNaN(blockid[2])) {
          newblock = await alchemy.core.getBlock(blockid[2]);
        } else {
          newblock = await alchemy.core.getBlock(parseInt(blockid[2]));
        }
        setBlock(newblock);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching block:", err.message);
      }
    }
    getBlock();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading Details...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Block Number:</td>
              <td>{block.number}</td>
            </tr>
            <tr>
              <td>Timestamp:</td>
              <td>{block.timestamp}</td>
            </tr>
            <tr>
              <td>Transactions:</td>
              <td>
                {/* total {block.transactions.length} and first is{" "}
                {block.transactions[0]} */}
                {block.transactions.map((tx) => (
                  <NavLink to={`/Transaction/${tx}`}>
                    <p>hash: {tx},</p>
                  </NavLink>
                ))}
              </td>
            </tr>
            <hr />
            <tr>
              <td>Hash:</td>
              <td>{block.hash.slice}</td>
            </tr>
            <tr>
              <td>Parent Hash:</td>
              <td>{block.parentHash}</td>
            </tr>
            <tr>
              <td>Nonce:</td>
              <td>{parseInt(block.nonce, 16)}</td>
            </tr>
            <tr>
              <td>Miner:</td>
              <td>{block.miner}</td>
            </tr>
            <tr>
              <td>Dificulty:</td>
              <td>{parseInt(block._difficulty._hex, 16)}</td>
            </tr>
            <hr />
            <tr>
              <td>Gas Limit:</td>
              <td>{parseInt(block.gasLimit._hex, 16)}</td>
            </tr>
            <tr>
              <td>Gas Used:</td>
              <td>{parseInt(block.gasUsed._hex, 16)}</td>
            </tr>
            <tr>
              <td>Base Fee Per Gas:</td>
              <td>{parseInt(block.baseFeePerGas._hex, 16)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
export default Block;
