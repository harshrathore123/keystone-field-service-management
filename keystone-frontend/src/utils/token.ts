const TOKEN_KEY = "keystone_token";
const ROLE_KEY = "keystone_role";

export const saveToken = (token: string, role: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserRole = (): string | null => {
  return localStorage.getItem(ROLE_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
