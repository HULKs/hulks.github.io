import { ref, watchEffect } from "vue";

const STORAGE_KEY = "hulks-theme"; // localStorage key
const isDark = ref(
  typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark"),
);

watchEffect(() => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // update local storage and class
  if (isDark.value) {
    root.classList.add("dark");
    localStorage.setItem(STORAGE_KEY, "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem(STORAGE_KEY, "light");
  }
});

// toggle dark mode
export function useDarkMode() {
  const toggle = () => {
    isDark.value = !isDark.value;
  };
  return { isDark, toggle };
}
