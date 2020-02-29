import http from "./httpServices";
//BI-directional dependencies authServie <=> HttpService
import jwtDecode from "jwt-decode";
import { apiUrl } from "../configuration/config.json";

const apiURLauthentication = apiUrl + "/authenticate";
const apiURLcredentials = apiUrl + "/usercredentials";
const apiURLregister = apiUrl + "/register";

const tokenKey = "token";
const userRole = "roles";
const jwt = localStorage.getItem(tokenKey);
const header = { headers: { Authorization: "Bearer " + jwt } };

//this fixies Bi-Directional dependencies httpServices <=> authServices
//http.setJwt(getJwt()); // getJwt() is called here directly instead of as a dependency in httpServices

export async function login(username, userpassword) {
  const { data: dataToken } = await http.post(apiURLauthentication, {
    username,
    userpassword
  });
  console.log("dataToken:", dataToken);
  //localStorage.setItem(tokenKey, dataToken.jwt);
  localStorage.setItem(tokenKey, dataToken);
}

export async function signin(
  username,
  userpassword,
  email,
  phonenumber,
  usercompany
) {
  http.post(apiURLregister, {
    username,
    userpassword,
    email,
    phonenumber,
    usercompany
  });
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userRole);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    //Install Tool: jwt-decode@2.2.0
    console.log("user:", jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (e) {
    //empty: jwtDecoder bug. But it's not an App bug
    return null;
  }
}

export async function getUserCredentials() {
  try {
    //const { data: roles } = await http.get(credentials, header);
    const { data: userCreds } = await http.get(apiURLcredentials, header);
    console.log("UserCreds", userCreds);
    localStorage.setItem("roles", JSON.stringify(userCreds));
  } catch (e) {
    return null;
  }
}

export function parseUserCredentials() {
  try {
    return JSON.parse(localStorage.getItem("roles"));
  } catch (e) {
    return null;
  }
}

//export function getJwt() {
//  return localStorage.getItem(tokenKey);
//}

export default {
  login,
  signin,
  logout,
  getCurrentUser /*, getJwt*/,
  getUserCredentials,
  parseUserCredentials
};
