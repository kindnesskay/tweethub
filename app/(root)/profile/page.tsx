"use client";
import Profile from "@/components/pages/Profile";
import { useAuth } from "@/context/AuthContext";
export default function page() {
  const auth = useAuth().authState;
  const user = auth.user;
  return <>{user ? <Profile user={user} /> : <section>Loading...</section>}</>;
}
