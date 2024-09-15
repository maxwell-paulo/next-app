import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Topnav } from "./_components/topnav";

export const metadata: Metadata = {
  title: "Next App",
  description: "This app is a technical test",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="en" >
      <body className={`${GeistSans.variable}`}>
        <Topnav />
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
