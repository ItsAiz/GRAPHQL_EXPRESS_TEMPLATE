import { logger as log } from './logger';

const {
  ORIGINS,
} = process.env;

const corsConfig = () => {
  const corsOrigins = JSON.parse(ORIGINS || '[]');
  log.info(`[corsConfig] cors config is loaded ${corsOrigins}`);
  try {
    return {
      credentials: true,
      origin: corsOrigins,
    };
  } catch (error) {
    log.error('[corsConfig] CORS configuration error:', error);
    throw error;
  }
};

export default corsConfig;
