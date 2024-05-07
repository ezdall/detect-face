export const saveAuthTokenInSession = token => {
  if (window.sessionStorage) {
    window.sessionStorage.setItem('t-jwt', token);

    // OR window.localStorage.setItem('t-jwt', token)
  }
};
