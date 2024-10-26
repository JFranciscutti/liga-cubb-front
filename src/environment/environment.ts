const dev = {
  backEnd: 'http://localhost:8080/',
  production: false,
};

const _prod = {
  backEnd: 'https://league-cubb.fly.dev/',
  production: true,
};

export const environment = import.meta.env.VITE_PRODUCTION ? _prod : dev;
