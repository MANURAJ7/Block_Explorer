import { useLocation } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useState, useEffect } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function NFT() {
  const [Nft, setNft] = useState();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const nftDetails = pathname.split("/");
  useEffect(() => {
    async function getNft() {
      try {
        const newNft = await alchemy.nft.getNftMetadata(
          nftDetails[2],
          nftDetails[3]
        );
        setNft(newNft);
        console.log("newNft: ", newNft);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching NFT: ", err.message);
      }
    }
    getNft();
  }, []);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h4>{Nft.title}</h4>
          <table>
            <tr>
              <td>Token id: </td>
              <td>{Nft.tokenId}</td>
            </tr>
            <tr>
              <td>Contract Address: </td>
              <td>{Nft.contract.address}</td>
            </tr>
            <tr>
              <td>Contract Name: </td>
              <td>{Nft.contract.name}</td>
            </tr>
            <tr>
              <td>Image:</td>
              <td>
                <img src={Nft.rawMetadata.image} width={250} height={200}></img>
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{Nft.description}</td>
            </tr>
            <tr>
              <table>
                <tr>
                  <th>Trait Type</th>
                  <th>Value</th>
                </tr>
                {Nft.rawMetadata.attributes.map((trait) => (
                  <tr>
                    <td>{trait.trait_type}</td>
                    <td>{trait.value}</td>
                  </tr>
                ))}
              </table>
            </tr>
          </table>
        </>
      )}
    </>
  );
}
