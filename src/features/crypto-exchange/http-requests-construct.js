export const HISTORICAL_RATES = (symbolPair) => ({
  binance: `https://api.bittrex.com/v3/markets/${symbolPair.toUpperCase()}/orderbook`,
  bitfinex: `https://api.bittrex.com/v3/markets/${symbolPair.toUpperCase()}/orderbook`,
  huobi: `https://api.bittrex.com/v3/markets/${symbolPair.toUpperCase()}/orderbook`,
  kraken: `https://api.bittrex.com/v3/markets/${symbolPair.toUpperCase()}/orderbook`,
});

export const PROVIDERS = (symbolPair, pair) => {
  return [
    {
      name: "binance",
      url: `https://api.binance.com/api/v3/ticker/price?symbol=${symbolPair.toUpperCase()}`,
      remapper: (response) => ({
        binance: { error: false, price: Number(response.price), symbol: pair },
      }),
    },
    {
      name: "bitfinex",
      url: `https://api-pub.bitfinex.com/v2/tickers?symbols=t${symbolPair.toUpperCase()}`,
      remapper: (response) => {
        if (response.length === 0) {
          return { bitfinex: { error: true, price: 0 } };
        }
        return {
          bitfinex: {
            error: false,
            symbol: pair,
            price: Number(response.flat()[1]),
          },
        };
      },
    },
    {
      name: "huobi",
      url: `https://api.huobi.pro/market/detail/merged?symbol=${symbolPair.toLowerCase()}`,
      websocket: "wss://api.huobi.pro/ws",
      remapper: (response) => {
        if (response.status === "error") {
          return { huobi: { error: true, price: 0 } };
        }
        return {
          huobi: {
            error: false,
            symbol: pair,
            price: Number(response.tick.high),
          },
        };
      },
    },
    {
      name: "kraken",
      url: `https://api.kraken.com/0/public/Ticker?pair=${symbolPair.toUpperCase()}`,
      remapper: (response) => {
        if (response.error.length > 0) {
          return { kraken: { error: true, price: 0 } };
        }
        return {
          kraken: {
            error: false,
            symbol: pair,
            price: Number(response.result[Object.keys(response.result)[0]].o),
          },
        };
      },
    },
  ];
};
