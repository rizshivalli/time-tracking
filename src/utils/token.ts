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

export function setOrganization(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('organization', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}

export function getOrganization(str?: string) {
  const tokenString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('organization') : str; // tokenString could be admin, "admin", ["admin"]

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

export async function hasAccess(str?: string) {
  const tokenString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // tokenString could be admin, "admin", ["admin"]

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
  const authString = token.toString();

  if (authString === 'admin' || authString === 'owner' || authString === 'project_manager') {
    return true;
  } else {
    return false;
  }
}
