import Cookies from 'js-cookie';

export const TokenKeys = {
  ADMIN: 'Admin-Token',
  ADMIN_EXPIRES: 'Admin-Expires-In',
};

export function getToken(key = TokenKeys.ADMIN) {
  return Cookies.get(key);
}

export function setToken(token, key = TokenKeys.ADMIN) {
  return Cookies.set(key, token);
}

export function removeToken(key = TokenKeys.ADMIN) {
  return Cookies.remove(key);
}

export function getExpiresIn(key = TokenKeys.ADMIN_EXPIRES) {
  return Cookies.get(key) || -1;
}

export function setExpiresIn(time, key = TokenKeys.ADMIN_EXPIRES) {
  return Cookies.set(key, time);
}

export function removeExpiresIn(key = TokenKeys.ADMIN_EXPIRES) {
  return Cookies.remove(key);
}
