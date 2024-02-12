import { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

function LatestTransactions() {
  const { getBlocksInfo, blocksData, transactionsData } =
    useContext(DataContext);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactionsData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const transactionArr = transactionsData.slice(startIndex, endIndex);

  return (
    <>
      <p>{transactionsData.length} transaction...</p>
      <p>Curent Page: {currentPage}</p>
      <div>
        {transactionsData.length ? (
          <>
            {transactionArr.map((txn, index) => {
              return (
                <div key={index}>
                  <p>
                    <Link to={`Transaction/${txn.hash}`}>
                      {txn.hash.slice(0, 12)}...
                    </Link>
                    {"    "}
                    <Link to={`/Account/${txn.from}`}>
                      {txn.from.slice(0, 12)}...
                    </Link>
                    {"    "}
                    <Link to={`/Account/${txn.to}`}>
                      {txn.to.slice(0, 12)}...
                    </Link>
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
            <div>
              <span>Pages: </span>
              <select
                value={currentPage}
                onChange={(e) => {
                  setCurrentPage(Number(e.target.value));
                }}
              >
                {Array.from(
                  { length: totalPages },
                  (_, pgNum) => pgNum + 1
                ).map((page) => {
                  <option key={page} value={page}>
                    {page}
                  </option>;
                })}
              </select>
              <span>of {totalPages}</span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default LatestTransactions;
