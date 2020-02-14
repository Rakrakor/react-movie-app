import http from "./httpServices";
import { apiUrl } from "../configuration/config.json";

const apiEndPoint = apiUrl + "/login";

export function login(username, password) {
  return http.post(apiEndPoint, { username, password });
}
