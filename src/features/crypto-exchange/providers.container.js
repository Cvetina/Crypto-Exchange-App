import React from "react";
import { useSelector } from "react-redux";
import { selectProviders, selectLoadingState } from "./cryptoExchangeSlice";
import { Provider } from "./provider.container";

export const Providers = ({ isAscDirection }) => {
  const providers = useSelector(selectProviders);
  const isLoading = useSelector(selectLoadingState);

  if (isLoading || !providers) {
    return (
      <div style={{ height: "135.2px" }}>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  const sortedProviders = Object.keys(providers)
    .map((key) => ({ ...providers[key], name: key }))
    .sort((a, b) =>
      isAscDirection
        ? parseFloat(a.price) - parseFloat(b.price)
        : parseFloat(b.price) - parseFloat(a.price)
    );

  return (
    <div className="provider-cards-wrapper">
      {sortedProviders.map((provider) => (
        <Provider key={provider.name} provider={provider} />
      ))}
    </div>
  );
};
