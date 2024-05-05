import { LogoutUserAction } from "@/context/AuthContext";
import Image from "next/image";
export type userData = {
  email: string;
  bio: string;
  profilePic: string;
};

export default function Profile({ user }: { user: userData }) {
  const { email, bio, profilePic } = user;
  const useLogout = LogoutUserAction();
  const handlelogOut = () => {
    useLogout();
  };
  return (
    <section>
      <div>
        <div className="w-full flex justify-center">
          <Image
            priority
            width={400}
            height={400}
            src={profilePic}
            alt="user-profile"
            className="shadow-xl rounded-full overflow-hidden h-36 w-36  mt-10"
          />
        </div>

        <div className="text-center mt-12 shadow-xl bg-white py-4">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
            Jenna Stones
          </h3>
          <div className="text-sm leading-normal text-blueGray-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt text-lg text-blueGray-400"></i>
            {email}
          </div>
          <div className="mb-2 text-blueGray-600 mt-4">
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            {bio}
          </div>
        </div>
        <button
          onClick={handlelogOut}
          className="p-4 bg-slate-600 shadow-md ml-4 mt-4 text-white w-36 hover:bg-slate-800 rounded-lg"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
