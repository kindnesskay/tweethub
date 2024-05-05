import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-2 h-16 w-full fixed text-white font-semibold px-4 items-center bg-gray-800 top-0">
      <div className="flex justify-between w-full max-w-5xl">
        <div className="flex gap-4">
          <Link href={"/"}>logo</Link>
        </div>
        <div>
          <Link href={'/auth/sign-in'}>Account</Link>
        </div>
      </div>
    </nav>
  );
}
