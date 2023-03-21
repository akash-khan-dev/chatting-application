import React from "react";
import "./style.css";
import { BsSearch } from "react-icons/bs";

export const Search = () => {
  return (
    <>
      <div className="search">
        <div className="search-icon">
          <BsSearch />
        </div>
        <div className="search-input">
          <input type="text" placeholder="Search " />
        </div>
      </div>
    </>
  );
};
