import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistoricalPrices,
  selectHistoricalRates,
} from "./cryptoExchangeSlice";

export const Provider = ({ provider, name }) => {
  const [isModalShown, setModalState] = useState(false);

  const rates = useSelector(selectHistoricalRates);

  const dispatch = useDispatch();

  const getRates = () => {
    dispatch(getHistoricalPrices(provider));
    setModalState(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalState(false);
  };

  if (provider.error) {
    return (
      <div className="provider-card" key={provider.name}>
        <div className="card-header">{provider.name.toUpperCase()} </div>
        <div className="card-body">No results for searched pair</div>
      </div>
    );
  }
  return (
    <div onClick={getRates} className="provider-card" key={provider.name}>
      <div className="card-header">{provider.name.toUpperCase()} </div>
      <div className="card-body">
        {provider.symbol} : {provider.price}
      </div>
      {isModalShown && (
        <div className="modal-container-prices">
          <div className="inner-modal-container">
            <h2 className="modal-header">{provider.symbol}</h2>
            <div className="rate-container">
              {rates &&
                rates.bid &&
                rates.bid.map((rate, index) => {
                  return (
                    <div className="rate" key={rate + index}>
                      Rate: {rate.rate}
                    </div>
                  );
                })}
            </div>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
