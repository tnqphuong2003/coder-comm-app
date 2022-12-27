import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

function SearchInput({ handleSubmit }) {
  const [queryString, setQueryString] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(queryString);
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={queryString}
        placeholder="Search by name"
        onChange={(event) => {
          setQueryString(event.target.value);
        }}
        sx={{ width: 300 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </form>
  );
}

export default SearchInput;
