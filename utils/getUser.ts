import axios from "axios";
export default async function getUser() {
  const request = await axios.get("/api/profile");
  if (request.status == 400) return false;
  const data = await request.data;
  return data.user;
}
