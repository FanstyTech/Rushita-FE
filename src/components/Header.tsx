'use client';

import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '@/lib/api/hooks/useAuth';
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react';
import { BellIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/LanguageProvider';
import { BsGrid } from 'react-icons/bs';
import Avatar from './common/Avatar';
import { languages } from '@/middleware';
import { Language } from '@/i18n/LanguageProvider';
import ThemeToggle from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { FaBars } from 'react-icons/fa';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { logout, user } = useAuth();
  const { t } = useTranslation();
  const { language, setLanguage, direction, isChangingLanguage, toggolemenue } =
    useLanguage();
  const [mounted, setMounted] = useState(false);

  // Use useEffect to handle client-side operations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder during server rendering or initial client render
  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Branding */}
          <div className="flex items-center justify-center ">
            <button
              onClick={toggolemenue}
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none "
              aria-expanded="false"
            >
              <FaBars className="h-6 w-6 text-secend" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 mt-1 dark:text-white">
              {user?.clinicInfo?.name || 'Rushita'}
            </h1>
          </div>

          {/* Right Section: Icons */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Extra Utility Icon (Placeholder) */}
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <span className="sr-only">{t('user.notifications')}</span>
              <BsGrid className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <span className="sr-only">{t('user.notifications')}</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Dropdown */}
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full p-1 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                    <span className="sr-only">{t('settings.language')}</span>
                    <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent asChild>
                  <div>
                    {languages.map((lang, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="mx-auto p-0 my-1 flex justify-center items-center"
                      >
                        <button
                          onClick={() => setLanguage(lang as Language)}
                          disabled={isChangingLanguage}
                          className={classNames(
                            'block w-full px-4 py-2 text-start text-sm text-gray-700 dark:text-gray-300',
                            language === lang
                              ? 'bg-gray-50 dark:bg-gray-700/50'
                              : '',
                            isChangingLanguage
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          )}
                        >
                          {t(`languages.${lang}`)}
                          {isChangingLanguage && language === lang && (
                            <span className="ml-2 inline-block h-3 w-3 animate-pulse rounded-full bg-blue-500"></span>
                          )}
                        </button>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-3 outline-none ">
                <span className="sr-only">{t('user.profile')}</span>
                <div className="flex items-center gap-3">
                  <div className="text-end md:block hidden">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.clinicInfo?.name}
                    </div>
                  </div>
                  <Avatar
                    name={user?.name || ''}
                    className="ring-2 ring-white dark:ring-gray-700"
                  />
                </div>
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                  className={classNames(
                    'absolute z-10 mt-2 w-56 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg  bg-popover py-1 shadow-lg ring-1 ring-black ring-opacity-5  outline-none',
                    direction === 'rtl'
                      ? 'left-0 right-auto origin-top-left'
                      : 'right-0 left-auto origin-top-right'
                  )}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="/admin/profile"
                          className={classNames(
                            active ? 'bg-gray-100 dark:bg-gray-700' : '',
                            'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                          )}
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {t('user.profile')}
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="/admin/settings"
                          className={classNames(
                            active ? 'bg-gray-100 dark:bg-gray-700' : '',
                            'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                          )}
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {t('settings.settings')}
                        </a>
                      )}
                    </MenuItem>
                  </div>

                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => {
                        const handleLogout = () => {
                          logout.mutate();
                        };

                        return (
                          <button
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-100 dark:bg-gray-700' : '',
                              'group flex w-full items-center px-4 py-2 text-sm text-red-700 dark:text-red-500'
                            )}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-red-400 dark:text-red-300 group-hover:text-red-500 dark:group-hover:text-red-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            {t('user.logout')}
                          </button>
                        );
                      }}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
