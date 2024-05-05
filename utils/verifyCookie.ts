import * as jsoe from "jose";
const JWT_SECRET = process.env.JWT_SECRET;
export default async function verifyCookie(cookie: any) {
  if (!cookie) return false;
  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jsoe.jwtVerify(cookie, secret);
  return payload ? payload : false;
}
