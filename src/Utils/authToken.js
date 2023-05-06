export const storeTokenLocal = (authToken) => {
  localStorage.setItem("authT", authToken);
};
export const getTokenLocal = (authK) => {
  return localStorage.getItem(authK);
};
export const storeUserLocal = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUserLocal = (user) => {
  return localStorage.getItem(user);
};
export const storeSearchWordLocal = (searchWordL) => {
  localStorage.setItem("searchWordL", searchWordL);
};
export const getSearchWordLocal = (searchWordL) => {
  return localStorage.getItem(searchWordL);
};
