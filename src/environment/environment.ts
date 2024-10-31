const dev = {
  backEnd: 'http://localhost:8080/',
  production: false,
};

const ngrok = {
  backEnd: 'https://7eee-190-246-216-183.ngrok-free.app/',
  production: false,
};

const _prod = {
  backEnd: 'https://league-cubb.fly.dev/',
  production: true,
};

export const environment = true ? ngrok : dev;
