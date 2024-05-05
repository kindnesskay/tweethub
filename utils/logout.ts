import axios from "axios";

export default async function logoutUser() {
  sessionStorage.removeItem("tweethub_user");
  const request = await axios.get("/api/auth/logout");
  return request;
}
