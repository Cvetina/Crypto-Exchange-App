import { configureStore } from '@reduxjs/toolkit';
import cryptoExchange from '../features/crypto-exchange/cryptoExchangeSlice';

export default configureStore({
  reducer: {
    cryptoExchange: cryptoExchange,
  },
});
