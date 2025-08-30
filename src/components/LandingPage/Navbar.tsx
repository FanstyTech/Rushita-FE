'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import LanguageToggle from '../LanguageToggle';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setpathName] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedPath = localStorage.getItem('pathname') || 'home';
    setpathName(savedPath);
  }, []);

  useEffect(() => {
    if (pathname !== '') {
      localStorage.setItem('pathname', pathname);
    }
  }, [pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll observer
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setpathName(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    });

    ['home', 'whyroshita', 'services', 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      ['home', 'whyroshita', 'services', 'contact'].forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => {
    document.body.classList.toggle('overflow-y-hidden');
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');

      if (isOpen && mobileMenu && menuButton) {
        // Check if click is outside both the menu and the menu button
        if (!mobileMenu.contains(target) && !menuButton.contains(target)) {
          closeMenu();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 transition-all duration-300">
      <div
        className={`${
          scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg'
            : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src="/images/image4.png"
                  alt="روشيتة"
                  width={160}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {['home', 'whyroshita', 'services', 'contact'].map((id) => (
                <Link key={id} href={`/#${id}`}>
                  <button
                    onClick={() => setpathName(id)}
                    className={`${
                      pathname === id
                        ? 'text-blue-600 dark:text-blue-400 font-semibold relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    } px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105`}
                  >
                    {t(`landing.nav.${id}`)}
                  </button>
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme and Language Toggles */}
              <div className="flex items-center gap-2 mr-4">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-all duration-300"
                >
                  {t(`landing.nav.login`)}
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t(`landing.nav.getStarted`)}
                  <MoveLeft className="mr-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              {/* Mobile Theme and Language Toggles */}
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <button
                id="menu-button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none shadow-lg"
                aria-expanded="false"
              >
                {isOpen ? (
                  <FaTimes className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FaBars className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } lg:hidden fixed inset-x-0 top-20 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl`}
          style={{
            maxHeight: isOpen ? '100vh' : '0',
          }}
        >
          <div className="px-6 py-8 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              {['home', 'whyroshita', 'services', 'contact'].map((id) => (
                <Link key={id} href={`/#${id}`}>
                  <button
                    onClick={() => {
                      setpathName(id);
                      toggleMenu();
                    }}
                    className={`${
                      pathname === id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700'
                        : 'text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    } w-full text-right px-4 py-3 text-lg font-medium rounded-xl border transition-all duration-300`}
                  >
                    {t(`landing.nav.${id}`)}
                  </button>
                </Link>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href="/auth/login" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg font-medium border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  {t(`landing.nav.login`)}
                </Button>
              </Link>
              <Link href="/auth/login" className="block">
                <Button
                  size="lg"
                  className="w-full text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t(`landing.nav.getStarted`)}
                  <MoveLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
