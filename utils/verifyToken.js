import jwt from "jsonwebtoken";
export default async function VerifyToken(token) {
  const jwt_secret = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, jwt_secret);
  if (!decodedToken) return false;
  return decodedToken.userID;
}
