import { AuthProvider } from "../components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "The Atom",
  description: "West Texas Arts & Culture for the Progressive Element",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#ECE7CA]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
