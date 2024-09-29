let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
} else {
    // 기본값 또는 다른 환경을 위한 설정
    backendHost = "https://your-production-url.com"; // 필요에 따라 다른 URL로 설정
}

// 템플릿 리터럴에서 `${}` 사용
export const API_BASE_URL = `${backendHost}`;
