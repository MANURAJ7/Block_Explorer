import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import LatestBlocks from "../../components/LatestBlocks/LatestBlocks";
import LatestTransactions from "../../components/LatestTransactions/LatestTransactions";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Home() {
  const { getBlocksInfo, blocksData, transactionsData } =
    useContext(DataContext);

  function callGetBlockInfo() {
    if (blocksData.length < 20 && blocksData.length > 0) return;
    getBlocksInfo();
  }
  return (
    <>
      <SearchBar />
      <button onClick={callGetBlockInfo}>Call Data</button>
      <LatestBlocks />
      <LatestTransactions></LatestTransactions>
    </>
  );
}

export default Home;
