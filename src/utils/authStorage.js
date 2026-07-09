const AUTH_TOKEN_KEY = 'shopease.auth.token';
const AUTH_USER_KEY = 'shopease.auth.user';
const AUTH_REMEMBER_KEY = 'shopease.auth.remember';

function clearStoredAuth(storage) {
  storage.removeItem(AUTH_TOKEN_KEY);
  storage.removeItem(AUTH_USER_KEY);
  storage.removeItem(AUTH_REMEMBER_KEY);
}

export function persistAuthSession({ token, user, rememberMe }) {
  const primaryStorage = rememberMe ? window.localStorage : window.sessionStorage;
  const secondaryStorage = rememberMe ? window.sessionStorage : window.localStorage;

  // TODO: Move token storage to secure httpOnly cookies once the backend owns session handling.
  clearStoredAuth(secondaryStorage);
  primaryStorage.setItem(AUTH_TOKEN_KEY, token);
  primaryStorage.setItem(AUTH_REMEMBER_KEY, rememberMe ? 'true' : 'false');

  if (user) {
    primaryStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
}