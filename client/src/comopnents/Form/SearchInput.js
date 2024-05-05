import React from "react";
import { useSearch } from "../../context/search.js";

const SearchInput = () => {
  const { search, setSearch, setSubmit } = useSearch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let a = true;
    setSubmit(a);
  };
  return (
    <form
      className="d-flex search-form p-2"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSubmit(false);
        }}
      />
      <button className="btn btn-outline-secondary" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
