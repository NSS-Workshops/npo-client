// src/app/layout.tsx

"use client";  // This needs to stay because you're using Redux on the client

import { Inter } from "next/font/google";
import { Provider } from "react-redux";  // Client-side context
import { store } from "../store/store";  // Import Redux store
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap your app with the Redux Provider */}
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
