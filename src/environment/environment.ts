const dev = {
  backEnd: 'https://9943-2001-fb1-d8-1e24-e4f6-83a-a5e2-355c.ngrok-free.app/',
  production: false,
};

const ngrok = {
  backEnd: 'http://localhost:8080/',
  production: false,
};

const _prod = {
  backEnd: 'https://league-cubb.fly.dev/',
  production: true,
};

export const environment = import.meta.env.VITE_PRODUCTION ? dev : _prod;
