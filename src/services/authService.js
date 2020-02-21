import http from "./httpServices";
//BI-directional dependencies authServie <=> HttpService
import jwtDecode from "jwt-decode";
import { authenticate } from "../configuration/config.json";
import { register } from "../configuration/config.json";

//const apiEndPoint = apiUrl + "/login";
const tokenKey = "token";

//this fixies Bi-Directional dependencies httpServices <=> authServices
//http.setJwt(getJwt()); // getJwt() is called here directly instead of as a dependency in httpServices

export async function login(username, userpassword) {
  const { data: dataToken } = await http.post(authenticate, {
    username,
    userpassword
  });
  console.log("dataToken:", dataToken);
  localStorage.setItem(tokenKey, dataToken.jwt);
}

export async function signin(
  username,
  userpassword,
  email,
  phonenumber,
  usercompany
) {
  http.post(register, {
    username,
    userpassword,
    email,
    phonenumber,
    usercompany
  });
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    //Install Tool: jwt-decode@2.2.0
    return jwtDecode(jwt);
  } catch (e) {
    //empty: jwtDecoder bug. But it's not an App bug
    return null;
  }
}

//export function getJwt() {
//  return localStorage.getItem(tokenKey);
//}

export default { login, signin, logout, getCurrentUser /*, getJwt*/ };
