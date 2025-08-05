"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Phone,
  X,
  Menu,
  Home,
  Info,
  Car,
  Wrench,
  FileText,
  Camera,
  MessageSquare,
  Mail,
} from "lucide-react";
import { getSettings, type Settings } from "@/lib/settings";
import Image from "next/image";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 100);
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/tentang", label: "Tentang Kami", icon: Info },
    { href: "/armada", label: "Armada", icon: Car },
    { href: "/layanan", label: "Layanan", icon: Wrench },
    { href: "/artikel", label: "Artikel", icon: FileText },
    { href: "/galeri", label: "Galeri", icon: Camera },
    { href: "/testimoni", label: "Testimoni", icon: MessageSquare },
    { href: "/kontak", label: "Kontak", icon: Mail },
  ];

  const handleWhatsAppCall = () => {
    if (settings?.whatsapp) {
      window.open(`https://wa.me/${settings.whatsapp}`, "_blank");
    }
  };

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href: string) => {
    closeMenu();
    router.push(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || isOpen
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20"
            : "bg-transparent"
        }`}
      >
        {/* Main Navigation */}
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link
              href="/"
              onClick={() => handleNavClick("/")}
              className="flex items-center flex-shrink-0 group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-12 w-[152px] lg:h-14 lg:w-[177px] transition-all duration-300">
                <Image
                  src="/images/logo.png"
                  alt="ATS RentCar Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="ml-3 hidden lg:block">
                {/* Teks ATS RentCar dengan gradien warna */}
                <div className="text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500 leading-tight transition-colors">
                  {settings?.companyName || "ATS RentCar"}
                </div>
                <div className="text-xs text-gray-500 font-medium -mt-0.5 transition-colors">
                  {settings?.tagline || "Rental Mobil & Tour"}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 bg-white/80 border border-gray-200/50 rounded-full shadow-lg backdrop-blur-sm px-2 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg"
                      : "text-gray-600 hover:text-emerald-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-pulse opacity-20"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                onClick={handleWhatsAppCall}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden z-50 relative overflow-hidden group"
              aria-label="Buka menu"
            >
              <div className="relative">
                <Menu
                  className={`w-6 h-6 transition-all duration-300 ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-all duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  Menu Navigasi
                </h2>
                <p className="text-xs text-gray-500">Pilih halaman tujuan</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 text-left font-medium rounded-xl transition-all duration-300 group ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:transform hover:scale-102"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen
                      ? `slideInRight 0.5s ease-out forwards`
                      : "none",
                  }}
                >
                  <div
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-white/20"
                        : "bg-gray-200 group-hover:bg-emerald-100"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        pathname === item.href
                          ? "text-white"
                          : "text-gray-600 group-hover:text-emerald-600"
                      }`}
                    />
                  </div>
                  <span className="text-base">{item.label}</span>
                  {pathname === item.href && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Menu Footer */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <Button
              onClick={handleWhatsAppCall}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-3"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp Sekarang
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
