import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProvidersPrices } from "./cryptoExchangeSlice";
import { Providers } from "./providers.container";
import "./exchange-components.css";

export const ExchangeInfoContainer = () => {
  const [searchValue, setSearchValue] = useState("LTC/BTC");
  const [isAscDirection, setSortDirection] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => dispatch(getProvidersPrices(searchValue)), []);

  const search = () => dispatch(getProvidersPrices(searchValue));

  const sort = () => setSortDirection((isAscDirection) => !isAscDirection);

  const onPriceSearch = (e) => setSearchValue(e.target.value);

  return (
    <div className="exchange-container">
      <h1>Exchange information</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          onChange={onPriceSearch}
          value={searchValue}
        />
        <button className="search-button" onClick={search}>
          Search
        </button>
        <button className="sort-button" onClick={sort}>
          Sort
        </button>
      </div>
      <Providers isAscDirection={isAscDirection} />
    </div>
  );
};
