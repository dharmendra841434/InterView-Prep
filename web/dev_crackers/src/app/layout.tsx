import type { Metadata } from "next";
import "./globals.css";
import LayoutComponent from "../components/layouts/LayoutComponent";
import { ToastContainer, toast } from "react-toastify";

export const metadata: Metadata = {
  title: "Dev Cracker - A New Way to Learn JavaScript",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutComponent>{children}</LayoutComponent>
        <ToastContainer />
      </body>
    </html>
  );
}
