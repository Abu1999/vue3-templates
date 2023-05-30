export function useEnv() {
  const { VITE_APP_TITLE, VITE_APP_NAME, VITE_BASE_API, VITE_PUBLIC_PATH, MODE, VITE_BASE_UPLOAD_API } = import.meta.env;
  // 如果名字变换了，我们可以在这里解构别名

  return {
    MODE,
    VITE_APP_TITLE,
    VITE_APP_NAME,
    VITE_BASE_API,
    VITE_PUBLIC_PATH,
    VITE_BASE_UPLOAD_API
  };
}
