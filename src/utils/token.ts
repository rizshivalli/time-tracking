import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getToken(str?: string) {
  const tokenString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('jwt') : str; // tokenString could be admin, "admin", ["admin"]

  let token;

  try {
    if (tokenString) {
      token = JSON.parse(tokenString);
    }
  } catch (e) {
    token = tokenString;
  }

  if (typeof token === 'string') {
    return [token];
  }

  return token;
}
export function setToken(token: string) {
  const proToken = typeof token === 'string' ? [token] : token;
  localStorage.setItem('jwt', JSON.stringify(proToken)); // auto reload

  reloadAuthorized();
}

export function removeToken() {
  localStorage.removeItem('jwt'); // auto reload
  localStorage.clear();
  reloadAuthorized();
}
