import { useState } from "react";
import { NavLink } from "react-router-dom";

function SearchBar() {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <select
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
      >
        <option value="">Select an option</option>
        <option value="Block">Block</option>
        <option value="Transaction">Transaction</option>
        <option value="Account">Account</option>
      </select>
      <input
        type="text"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="Search Transaction / Block / Address..."
      />
      <NavLink to={`${selectedOption}/${searchText}`}>
        <button type="submit">search</button>
      </NavLink>
    </>
  );
}

export default SearchBar;
