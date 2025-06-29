'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
export const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'whyroshita', label: 'لماذا روشيتة؟' },
  { id: 'projects', label: 'خدماتنا' },
  { id: 'contact', label: 'الاسعار' },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setpathName] = useState('');
  useEffect(() => {
    const savedPath = localStorage.getItem('pathname') || 'home';
    setpathName(savedPath);
  }, []);

  useEffect(() => {
    if (pathname !== '') {
      localStorage.setItem('pathname', pathname);
    }
  }, [pathname]);

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

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => {
    document.body.classList.toggle('overflow-y-hidden');
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full  bg-white z-40 top-0 left-0  transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  items-center h-16">
          {/* Logo and Name */}
          <div className="flex-shrink-0 ">
            <div className="relative md:hidden block">
              <Image
                src="/images/image4.png"
                alt="cscs"
                width={150}
                height={70}
              />
            </div>
            <div className="md:flex hidden items-center  gap-3 ">
              <Link href="/auth/login" className="">
                <Button
                  size="sm"
                  variant="outline"
                  className="lg:text-base text-xs"
                >
                  سجل دخولك
                </Button>
              </Link>
              <Link href="/auth/login" className="">
                <Button
                  size="sm"
                  className="items-center flex lg:text-base text-xs"
                  variant="lineargradian"
                >
                  إبدأ تجربة مجانية الآن
                  <MoveLeft />
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ">
            {navLinks.map((link) => (
              <Link key={link.id} href={`/#${link.id}`}>
                <Button
                  variant="link"
                  onClick={() => {
                    setpathName(link.id);
                  }}
                  className={`${
                    pathname == link.id
                      ? "text-secend relative after:content-['']  after:w-2/5 after:bg-secend after:p-[1px] after:absolute after:bottom-0 dark:text-blue-400"
                      : ''
                  }  p-2 lg:p-3 `}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="relative lg:mr-10 mr-3">
              <Image
                src="/images/image4.png"
                alt="cscs"
                width={150}
                height={50}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none "
              aria-expanded="false"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6 text-secend" />
              ) : (
                <FaBars className="h-6 w-6 text-secend" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? 'max-h-screen ' : 'max-h-0 '
        } h-full overflow-hidden md:hidden fixed top-16 right-0 bottom-0 left-0 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 duration-500 `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.id} href={`/#${link.id}`}>
              <Button
                key={link.id}
                onClick={() => {
                  setpathName(link.id);
                  toggleMenu();
                }}
                variant="none"
                className={`${
                  pathname == link.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : ''
                } my-1.5 `}
              >
                {link.label}
              </Button>
            </Link>
          ))}

          <div className=" xxs:flex-row flex-col flex justify-center   items-center  gap-3 mt-4 ">
            <Link href="/auth/login" className="xxs:w-fit w-full">
              <Button size="sm" variant="outline" className=" xxs:w-fit w-full">
                سجل دخولك
              </Button>
            </Link>
            <Link href="/auth/login" className="xxs:w-fit w-full">
              <Button
                size="sm"
                className="items-center flex xxs:w-fit w-full "
                variant="lineargradian"
              >
                إبدأ تجربة مجانية الآن
                <MoveLeft className="mt-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Updated: Modified AboutMe component with rectangular image layout
export const AboutMe = () => {
  return (
    <section
      id="about"
      className="py-20 min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Updated: Left side - Rectangular Profile Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* <Image
                                fill
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                                className="w-full h-[500px] object-cover rounded-lg shadow-xl"
                            /> */}
            </div>
          </div>

          {/* No changes made to right side content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p className="text-lg">
                Hi there! Im John Doe, a passionate web developer with expertise
                in modern web technologies. I specialize in creating responsive
                and user-friendly web applications using React, TailwindCSS, and
                other cutting-edge tools.
              </p>
              <p className="text-lg">
                With 5 years of experience in the industry, Ive worked on
                various projects ranging from small business websites to
                large-scale enterprise applications. Im always excited to learn
                new technologies and take on challenging projects.
              </p>
              <div className="pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'React',
                    'JavaScript',
                    'TailwindCSS',
                    'Node.js',
                    'TypeScript',
                    'Next.js',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
