"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "@/contexts/language-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          href="/"
          className="font-bold text-xl cursor-pointer"
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          <span className={language === "ar" ? "arabic-text" : ""}>
            {t("nav.logo")}
          </span>
        </Link>

        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="flex h-9 w-9 items-center justify-center rounded-md cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <ul
          className={`fixed inset-x-0 top-[57px] z-50 flex h-[calc(100vh-57px)] transform flex-col gap-6 bg-background p-8 transition-transform duration-300 md:static md:h-auto md:w-auto md:flex-row md:items-center md:gap-8 md:bg-transparent md:p-0 md:transition-none ${
            isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          <li>
            <Link
              href="#about"
              onClick={closeMenu}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span className={language === "ar" ? "arabic-text" : ""}>
                {t("nav.about")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="#education"
              onClick={closeMenu}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span className={language === "ar" ? "arabic-text" : ""}>
                {t("nav.education")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              onClick={closeMenu}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span className={language === "ar" ? "arabic-text" : ""}>
                {t("nav.projects")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              onClick={closeMenu}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span className={language === "ar" ? "arabic-text" : ""}>
                {t("nav.contact")}
              </span>
            </Link>
          </li>
          <div className="flex items-center gap-2 md:ml-8">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </ul>
      </div>
    </nav>
  );
} 