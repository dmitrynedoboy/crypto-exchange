const BASIC_FROM = {
  ticker: 'btc',
  name: 'Bitcoin',
  image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg'
};
const BASIC_TO = {
  ticker: 'eth',
  name: 'Ethereum',
  image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg'
};

const WAIT_INTERVAL = 1000;

const DISABLE_ERROR = 'This pair is disabled now';
const MIN_ERROR = 'Exchange amount is below the minimum';
const API_ERROR = 'Something went wrong, try again later';

export {
  BASIC_FROM,
  BASIC_TO,
  WAIT_INTERVAL,
  DISABLE_ERROR,
  MIN_ERROR,
  API_ERROR
};
