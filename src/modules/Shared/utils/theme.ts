export const THEME_KEY = "theme";

export const applySavedTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle("dark");

  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");

  return isDark;
};