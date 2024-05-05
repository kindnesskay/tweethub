import { Inter } from "next/font/google";
import React from "react";
import "../globals.css";
import AuthProvider from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>Authentication</title>
        </head>
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
