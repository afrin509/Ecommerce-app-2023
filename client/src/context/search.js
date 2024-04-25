import { createContext, useContext, useState } from "react";
const SearchContext = createContext({
  search: "",
  setSearch: () => {},
  submit: false,
  setSubmit: () => {},
});
export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [submit, setSubmit] = useState(false);
  return (
    <SearchContext.Provider value={{ search, setSearch, submit, setSubmit }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => useContext(SearchContext);
