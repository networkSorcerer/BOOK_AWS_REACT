let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}
// 템플릿 리터럴에서 `${}` 사용
export const API_BASE_URL = `${backendHost}`;
