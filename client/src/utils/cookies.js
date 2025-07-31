import Cookies from 'js-cookie';

const INTRO_COOKIE_NAME = 'introSeen';

// Sets a cookie that expires in 1 year to remember the user has seen the intro.
export const setIntroSeenCookie = () => {
  Cookies.set(INTRO_COOKIE_NAME, 'true', { expires: 365, path: '/' });
};

// Checks for the presence of the intro cookie.
export const getIntroSeenCookie = () => {
  return Cookies.get(INTRO_COOKIE_NAME);
};

// Removes the intro cookie to allow the intro to be shown again.
export const removeIntroSeenCookie = () => {
  Cookies.remove(INTRO_COOKIE_NAME, { path: '/' });
};