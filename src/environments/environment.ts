/**
 * Development environment.
 * Uses /api so requests are proxied to the backend (see proxy.conf.json).
 */
export const environment = {
  production: false,
  apiUrl: '/api',
  // External portals
  portalLoginUrl: 'https://portal-reeworkcoach.mobiloitte.io/pages/login',
  reecoachApplicationUrl: 'https://portal-reeworkcoach.mobiloitte.io/pages/reecoach-application',
};
