import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HISTORICAL_RATES, PROVIDERS } from "./http-requests-construct";
import { websocketUpdates } from "./websocket";

export const getProvidersPrices = createAsyncThunk(
  "getProvidersPrices",
  async (pair) => {
    const stripedPair = pair.replace(/[^a-zA-Z,.!?\d\s:]/gi, "");

    const tickers = await Promise.all(
      PROVIDERS(stripedPair, pair).map((provider) => {
        return axios
          .create({ timeout: 1000 })
          .get(provider.url)
          .then((response) => {
            websocketUpdates(provider, stripedPair);
            return provider.remapper(response.data);
          })
          .catch((error) => ({ [provider.name]: { error: true, price: 0 } }));
      })
    );
    return Object.assign({}, ...tickers);
  }
);

export const getHistoricalPrices = createAsyncThunk(
  "getHistoricalPrices",
  async (provider) => {
    const pair = provider.symbol.replace(/[^a-zA-Z,.!?\d\s:]/gi, "-");
    const rates = await axios.get(HISTORICAL_RATES(pair)[provider.name]);
    return rates.data;
  }
);

export const cryptoExchangeSlice = createSlice({
  name: "cryptoExchange",
  initialState: {
    providers: {},
    isLoading: true,
    historicalRates: [],
  },
  extraReducers: {
    [getHistoricalPrices.fulfilled]: (state, action) => {
      state.historicalRates = action.payload;
    },
    [getProvidersPrices.fulfilled]: (state, action) => {
      state.providers = action.payload;
      state.isLoading = false;
    },
    [getProvidersPrices.pending]: (state) => {
      state.isLoading = true;
    },
    [getProvidersPrices.rejected]: (state, action) => {
      state.providers = action.payload;
      state.isLoading = false;
    },
  },
});

export const { updateSearchValue } = cryptoExchangeSlice.actions;

export const selectProviders = (state) => state.cryptoExchange.providers;

export const selectHistoricalRates = (state) =>
  state.cryptoExchange.historicalRates;

export const selectLoadingState = (state) => state.cryptoExchange.isLoading;

export default cryptoExchangeSlice.reducer;
