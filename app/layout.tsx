import type { Metadata } from "next";
import { Provider } from "./provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenith Dashboard",
  description: "A premium dark-mode admin dashboard for commerce analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
