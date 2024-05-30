const prod = window.location.href.includes('academy.whalemate.com');
const dev = {
  backEnd: 'https://backend.com/api/academy/',
  production: false,
};

const _prod = {
  backEnd: 'https://backend.com/api/academy/',
  production: true,
};

export const environment = prod ? _prod : dev;
