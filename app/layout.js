import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font" });

export const metadata = { title: "MovieHub", description: "Movies discover karein aur free movies dekhein" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        <nav className="nav">
          <Link href="/" className="logo">MovieHub</Link>
          <Link href="/" className="link">Home</Link>
          <Link href="/free" className="link">Free Movies</Link>
          <span className="spacer" />
          <SearchBar />
        </nav>
        {children}
        <footer>
          Movie data aur images TMDb se hain. This product uses the TMDb API but is not endorsed or certified by TMDb.
        </footer>
      </body>
    </html>
  );
}
