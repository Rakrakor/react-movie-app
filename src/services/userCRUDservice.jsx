import http from "./httpServices";
import { apiUrl } from "../configuration/config.json";

const apiURLuserProfile = apiUrl + "/user/profile";
const apiURLuserUpdate = apiUrl + "/user/update";
const apiURLuserDelete = apiUrl + "/user/delete";

const tokenKey = "token";
const jwt = localStorage.getItem(tokenKey);
const header = { headers: { Authorization: "Bearer " + jwt } };

export async function getUserProfile() {
  //Observer le contenu console et renvoyer une varaible adequate via cette fonction
  try {
    const { data: responseProfile } = await http.get(apiURLuserProfile, header);
    console.log(responseProfile);

    return responseProfile;
  } catch (e) {
    return null;
  }
}

export async function saveUserProfile(
  username,
  userpassword,
  email,
  phonenumber,
  usercompany
) {
  try {
    const updatedToken = await http.put(
      apiURLuserUpdate,
      { username, userpassword, email, phonenumber, usercompany },
      header
    );
    return updatedToken;
  } catch (e) {
    return null;
  }
}

export async function deleteUserProfile() {
  try {
    await http.delete(apiURLuserDelete, header);
  } catch (e) {
    return null;
  }
}

export default {
  getUserProfile,
  saveUserProfile,
  deleteUserProfile
};
