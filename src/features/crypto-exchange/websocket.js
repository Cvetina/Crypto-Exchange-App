export const websocketUpdates = (provider, pair) => {
  if (provider.websocket) {
    const ws = new WebSocket(provider.websocket);
    ws.onopen = (event) => {
      const subscribe = {
        sub: `market.${pair.toLowerCase()}.kline.1min`,
        id: 1,
      };
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {};
    ws.onclose = () => {
      ws.close();
    };
  }
};
