import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import GoogleSignIn from "../google-sign-in";

export default function Header() {
  return (
    <header>
      <div>
        <nav className="bg-accent p-4">
          <div className="flex space-x-6 justify-center">
            <Link
              href={"/"}
              className="text-background hover:text-foreground transition-colors"
            >
              Home
            </Link>

            <Link
              href={"/events"}
              className="text-background hover:text-foreground transition-colors"
            >
              Events
            </Link>
                      
            <Link
              href={"/events/new"}
              className="text-background hover:text-foreground transition-colors"
            >
              Create event
            </Link>
            
            <Link
              href={"/profile"}
              className="text-background hover:text-foreground transition-colors"
            >
              Profile
            </Link>
            <Link
              href={"/about"}
              className="text-secondary hover:text-foreground transition-colors"
            >
              About
            </Link>
            
            <GoogleSignIn />
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
