'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'whyroshita', label: 'لماذا روشيتة' },
  { id: 'services', label: 'خدماتنا' },
  { id: 'contact', label: 'الاسعار' },
];

const socialLinks = [
  {
    icon: FaFacebook,
    href: '#',
    color: 'hover:text-blue-500',
    label: 'Facebook',
  },
  {
    icon: FaTwitter,
    href: '#',
    color: 'hover:text-blue-400',
    label: 'Twitter',
  },
  {
    icon: FaLinkedin,
    href: '#',
    color: 'hover:text-blue-600',
    label: 'LinkedIn',
  },
  {
    icon: FaInstagram,
    href: '#',
    color: 'hover:text-pink-500',
    label: 'Instagram',
  },
];

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <Image
                width={180}
                height={60}
                src="/images/image4.png"
                alt="روشيتة"
                className="h-14 w-auto"
              />
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              {t('landing.footer.companyInfo.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>{t('landing.footer.companyInfo.email')}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-green-400" />
                <span dir="ltr">{t('landing.footer.companyInfo.phone')}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>{t('landing.footer.companyInfo.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              {t('landing.footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {['contact', 'services', 'whyroshita', 'home'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {t('landing.nav.' + item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              {t('landing.footer.supportResources.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  {t('landing.footer.supportResources.helpCenter')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  {t('landing.footer.supportResources.faq')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  {t('landing.footer.supportResources.userGuide')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  {t('landing.footer.supportResources.contactUs')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & CTA Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 font-medium">
                {t('landing.footer.socialMedia')}
              </span>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110`}
                      aria-label={social.label}
                    >
                      <IconComponent size={20} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Scroll to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
            >
              {t('landing.footer.scrollToTop')}
              <ArrowUp className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="#"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {t('landing.footer.privacyPolicy')}
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {t('landing.footer.termsConditions')}
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {t('landing.footer.usagePolicy')}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <span>&copy; {currentYear}</span>
              <span className="text-blue-400 font-medium">
                {t('landing.projectName')}
              </span>
              <span>{t('landing.footer.allRightsReserved')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
