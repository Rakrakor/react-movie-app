import http from "./httpServices";
import { apiUrl } from "../configuration/config.json";

const apiURLuserListOffers = apiUrl + "/recruiter/submittedOffers";
const apiURLuserFindAnOffer = apiUrl + "/recruiter/findOffer/";
const apiURLuserSaveOffer = apiUrl + "/recruiter/saveNewOffer";
const apiURLuserUpdateOffer = apiUrl + "/recruiter/update/";
const apiURLuserDeleteOffer = apiUrl + "/recruiter/delete/";

const apiURLadminListOffers = apiUrl + "/admin/offers";

const tokenKey = "token";
const jwt = localStorage.getItem(tokenKey);
const header = { headers: { Authorization: "Bearer " + jwt } };

export async function listUserOffers() {
  //Observer le contenu console et renvoyer une varaible adequate via cette fonction
  try {
    const { data: responseOffers } = await http.get(
      apiURLuserListOffers,
      header
    );
    console.log(responseOffers);

    return responseOffers;
  } catch (e) {
    return null;
  }
}

export async function listAdminOffers() {
  //Observer le contenu console et renvoyer une varaible adequate via cette fonction
  try {
    const { data: responseOffers } = await http.get(
      apiURLadminListOffers,
      header
    );
    console.log(responseOffers);

    return responseOffers;
  } catch (e) {
    return null;
  }
}

export async function userFindAnOffer(offerRef) {
  const offerURI = apiURLuserFindAnOffer + offerRef;
  console.log("URL", offerURI);
  try {
    const { data: responseOffer } = await http.get(offerURI, header);
    return responseOffer;
  } catch (e) {
    return null;
  }
}

export async function userSaveOffer(
  title,
  description,
  contractType,
  startDate,
  wages
) {
  //Observer le contenu console et renvoyer une varaible adequate via cette fonction

  try {
    const valid = await http.post(
      apiURLuserSaveOffer,
      { title, description, contractType, startDate, wages },
      header
    );
    console.log("Valid save:", valid);
  } catch (e) {
    return null;
  }
}

export async function deleteOffer(offerRef) {
  const offerURI = apiURLuserDeleteOffer + offerRef;
  console.log("URL", offerURI);
  try {
    await http.delete(offerURI, header);
  } catch (e) {
    return null;
  }
}

export async function updateOffer(
  offerRef,
  title,
  description,
  contractType,
  startDate,
  wages
) {
  const offerURI = apiURLuserUpdateOffer + offerRef;
  console.log("URL UPDATE:", offerURI);
  try {
    await http.put(
      offerURI,
      { title, description, contractType, startDate, wages },
      header
    );
  } catch (e) {
    return null;
  }
}

export default {
  listUserOffers,
  userFindAnOffer,
  userSaveOffer,
  updateOffer,
  deleteOffer,
  listAdminOffers
};
