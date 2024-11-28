import { API_BASE_URL } from "../api-config";

// export function call(api, method, request) {
//   let options = {
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//     url: API_BASE_URL + api,
//     method: method,
//   };
//   if (request) {
//     //GET method
//     options.body = JSON.stringify(request);
//   }
//   return fetch(options.url, options)
//     .then((response) => {
//       if (response.status === 200) {
//         return response.json();
//       } else if (response.status === 403) {
//         //window.location.href = "/login";
//       } else {
//         throw new Error("HTTP error: " + response.status);
//       }
//     })
//     .catch((error) => {
//       console.error("HTTP 요청 에러:", error);
//     });
// }

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  // 로컬 스토리지에서 ACCESS TOKENT가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    //GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        //window.location.href = "/login";
      } else {
        new Error(response);
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}

// export function signin(userDTO) {
//   return call("/auth/signin", "POST", userDTO).then((response) => {
//     console.log("response : ", response);
//     alert("로그인 토큰 : " + response.token);
//   });
// }
export function signin(userDTO) {
  console.log(userDTO);
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      console.log(response); // 응답 객체 확인
      alert("로그인 토큰 : " + response.token);
      if (response.token) {
        localStorage.setItem("ACCESS_TOKEN", response.token);
        window.location.href = "/";
      } else {
        console.error("응답에 토큰이 없습니다.");
      }
    })
    .catch((error) => {
      console.error("로그인 요청 실패:", error);
    });
}

export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO)
    .then((response) => {
      console.log("회원가입 성공:", response);
    })
    .catch((error) => {
      console.error("회원가입 실패:", error);
    });
}
