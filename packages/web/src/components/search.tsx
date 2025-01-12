import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import searchProps from "../interfaces/SearchProps";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search: React.FC<searchProps> = ({  value, onChange }) => {
  const [query, setquery] = useState(value);
  const [isFocused, setIsFocused] = useState(false); 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setquery(event.target.value);
  };
  const handleSearchClick = () => {
    onChange(query);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchClick();
    }
  };
  const handleClear = () => {
    setquery("");
    onChange("");
  };


  return (
    <div style={{ display: "flex", alignItems: "center",marginRight:"10px" }}>
      <TextField
        variant="outlined"
        size="small"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        style={{
          marginTop: "10px",
         
          color: "#181D8C",
          border: "none",
          borderBottom: "2px solid #181D8C",
        }}
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)}  
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearchClick}>
                <SearchIcon
                  style={{
                    color: isFocused ? "#181D8C" : "#A0A0A0", 
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query && (
                <IconButton onClick={handleClear}>
                  <CloseIcon style={{ color: "#181D8C" }} />
                </IconButton>
              )}
            </InputAdornment>
          ),

          sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#181D8C",
            },
          },
        }}
      />
    </div>
  );
};

export default Search;
