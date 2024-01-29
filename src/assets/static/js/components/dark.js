const THEME_KEY = 'theme';

/**
 * Set theme for mazer
 * @param {"dark"|"light"} theme
 * @param {boolean} persist
 */
const setThemeGlobal = function setTheme(theme, persist = false) {
  document.body.classList.add(theme);
  document.documentElement.setAttribute('data-bs-theme', theme);

  if (persist) {
    localStorage.setItem(THEME_KEY, theme);
  }
};

/**
 * Init theme from setTheme()
 */
function initTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    return setThemeGlobal(storedTheme);
  }

  if (!window.matchMedia) {
    return '';
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', (e) => setThemeGlobal(e.matches ? 'dark' : 'light', true));
  return setThemeGlobal(mediaQuery.matches ? 'dark' : 'light', true);
}

initTheme();

export default setThemeGlobal;
