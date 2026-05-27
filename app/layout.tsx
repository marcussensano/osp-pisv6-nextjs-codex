import type { Metadata } from "next";
import { Provider } from "./provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "One St. Peter Operations",
  description: "Insurance planholder operations dashboard and accounts summary.",
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
