import { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";

import "./LatestBlocks.css";
import { Link } from "react-router-dom";
function LatestBlocks() {
  const { getBlocksInfo, blocksData, transactionsData } =
    useContext(DataContext);

  const currentTimeInMillis = new Date().getTime();
  const epochTimeInMillis = new Date("1970-01-01T00:00:00Z").getTime();
  const currTime = Math.trunc((currentTimeInMillis - epochTimeInMillis) / 1000);

  function formatTimeDifference(blockTimestamp) {
    const timeDifferenceInSeconds = currTime - blockTimestamp;

    if (timeDifferenceInSeconds > 60) {
      const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${timeDifferenceInMinutes} min`;
    } else {
      return `${timeDifferenceInSeconds} s`;
    }
  }
  const itemsPerPage = 10;
  const totalPages = Math.ceil(blocksData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const blockArr = blocksData.slice(startIndex, endIndex);

  return (
    <>
      <p>{blocksData.length}</p>
      <p>Curent Page: {currentPage}</p>
      <div>
        {blocksData.length ? (
          <>
            {blockArr.map((block, index) => {
              return (
                <div key={index}>
                  <p>
                    <Link to={`/Block/${block.number}`}>{block.number}</Link>
                    {"    "}
                    {formatTimeDifference(block.timestamp)}
                    {"    "}
                    {block.transactions.length}
                  </p>
                </div>
              );
            })}
            <div>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Prev
              </button>
              {/* For next page */}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );

  // return (
  //   <>
  //     <button onClick={callGetBlockInfo}>Get Recent Blocks</button>
  //     <h3>Blocks Table:</h3>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Block Number</th>
  //           <th>Time</th>
  //           <th>Transactions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {blocksData.length ? (
  //           <>
  //             {blocksData.map((block, index) => {
  //               if (index >= 10) return;
  //               return (
  //                 <tr key={block.number}>
  //                   <td>{block.number}</td>
  //                   <td>{formatTimeDifference(block.timestamp)}</td>
  //                   <td>{block.transactions.length}</td>
  //                 </tr>
  //               );
  //             })}
  //           </>
  //         ) : (
  //           <tr>
  //             <td>Loading...</td>
  //           </tr>
  //         )}
  //       </tbody>
  //     </table>
  //   </>
  // );
}

export default LatestBlocks;
