// This middleware will set Authorization Header and will refresh access token on expire
// if we use this middleware we won't have to explicitly make request to refresh-token api url

import logger from '../utils/logger.js';
import refreshAccessToken from "../utils/refreshAccessToken.js";
import isTokenExpired from "../utils/isTokenExpired.js";
import setTokensCookies from "../utils/setTokensCookies.js";

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    // Skip token processing for login, register, and refresh-token routes
    const skipPaths = ['/api/user/login', '/api/user/register', '/api/user/refresh-token'];
    if (skipPaths.includes(req.path)) {
      return next();
    }

    const accessToken = req.cookies.accessToken;

    // If no access token, continue without authentication
    if (!accessToken) {
      return next();
    }

    // Check if token is expired
    if (!isTokenExpired(accessToken)) {
      // Add the access token to the Authorization header
      req.headers['authorization'] = `Bearer ${accessToken}`;
      return next();
    }

    // Token is expired, try to refresh it
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      // If refresh token is also missing, continue without authentication
      return next();
    }

    // Access token is expired, make a refresh token request
    const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res)

    // set cookies
    setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);

    // Add the access token to the Authorization header
    req.headers['authorization'] = `Bearer ${newAccessToken}`;
    
    next();
  } catch (error) {
    logger.error('Error in accessTokenAutoRefresh middleware:', error.message);
    // Continue without authentication instead of throwing error
    next();
  }
}

export default accessTokenAutoRefresh;