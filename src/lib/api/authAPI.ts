// api 사용 방법
// client.ts(클라이언트) 인스턴스로 만들어서 계속 가져와서 사용할 수 있다!!!
// client.post("/auth/login", { email, password})
// client. 포스트 겟get 등등 / 베이스 유알엘 base url 다음에 오는 것 / 받아올것들, 데이터들
// client.ts에 const BASE_URL = "http://52.78.195.183:3003";
// 위와 같이 BASE_URL이 있기 때문에 ex) "api/auth/login" 이런 식으로 넣어서 사용

import client from "./client";

const login = async (email: string, password?: string) => {
  try {
    client.post("api/auth/login", { email, password });
  } catch (e) {
    console.error(e, "에러 발생!!!");
  }
};

//export { login };
