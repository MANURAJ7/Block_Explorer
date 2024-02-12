import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home/Home";
import Block from "./routes/Block/Block";
import Transaction from "./routes/Transaction/Transaction";
import Account from "./routes/Account/EoaAccount";
import Contract from "./routes/Account/ContractAccount";
import NFT from "./routes/NFT/NFT";
import { DataContextProvider } from "./context/DataContext";

function App() {
  return (
    <DataContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Block/*" element={<Block />} />
        <Route path="/Transaction/*" element={<Transaction />} />
        <Route path="/NFT/*" element={<NFT />} />
        <Route path="/Contract/*" element={<Contract />} />
        <Route path="/Account/*" element={<Account />} />
      </Routes>
    </DataContextProvider>
  );
}

export default App;
