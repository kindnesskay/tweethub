import axios from "axios";

export default async function (id: string) {
  if (!id) return "user id invalid";
  const request = await axios.get(
    "http://localhost:3000/api/users/user?id=" + id
  );
  if (request.status !== 200) return false;
  return request.data;
}
