'use client';

import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { BsGrid } from 'react-icons/bs';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { t } = useTranslation();
  const { language, setLanguage, direction } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className=" bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Branding */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Rushita</h1>
          </div>
          {/* Right Section: Icons */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Extra Utility Icon (Placeholder) */}
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Utility</span>
              <BsGrid className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Notifications */}
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">{t('notifications')}</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Language Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={classNames(
                    'absolute z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                    direction === 'rtl'
                      ? 'left-0 right-auto origin-top-left'
                      : 'right-0 left-auto origin-top-right'
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setLanguage('en')}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block w-full px-4 py-2 text-start text-sm text-gray-700',
                          language === 'en' ? 'bg-gray-50' : ''
                        )}
                      >
                        {t('english')}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setLanguage('ar')}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block w-full px-4 py-2 text-start text-sm text-gray-700',
                          language === 'ar' ? 'bg-gray-50' : ''
                        )}
                      >
                        {t('arabic')}
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">{t('profile')}</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={classNames(
                    'absolute z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                    direction === 'rtl'
                      ? 'left-0 right-auto origin-top-left'
                      : 'right-0 left-auto origin-top-right'
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700 text-start'
                        )}
                      >
                        {t('profile')}
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700 text-start'
                        )}
                      >
                        {t('logout')}
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
