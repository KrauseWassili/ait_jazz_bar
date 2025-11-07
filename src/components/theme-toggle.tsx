"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="bg-importantbtn p-2 rounded-2xl"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="hover:text-[#ecd346]" />
      ) : (
        <Moon className="hover:text-[#ecd346]" />
      )}
    </button>
  );
}
