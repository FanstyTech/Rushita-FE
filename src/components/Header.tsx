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
import { useLanguage } from '@/contexts/LanguageContext';
import { BsGrid } from 'react-icons/bs';
import Avatar from './common/Avatar';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { logout, user } = useAuth();
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
            <h1 className="text-xl font-bold text-gray-900">
              {user?.clinicInfo?.name || 'Rushita'}
            </h1>
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
              <MenuButton className="rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">{t('language')}</span>
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
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
                    'absolute z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1  ring-opacity-5 focus:outline-none',
                    direction === 'rtl'
                      ? 'left-0 right-auto origin-top-left'
                      : 'right-0 left-auto origin-top-right'
                  )}
                >
                  <MenuItem>
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
                  </MenuItem>
                  <MenuItem>
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
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-3">
                <span className="sr-only">{t('profile')}</span>
                <div className="flex items-center gap-3">
                  <div className="text-end">
                    <div className="text-sm font-semibold text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.clinicInfo?.name}
                    </div>
                  </div>
                  <Avatar
                    name={user?.name || ''}
                    className="ring-2 ring-white"
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
                    'absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-white py-1 shadow-lg ring-1  ring-opacity-5 focus:outline-none',
                    direction === 'rtl'
                      ? 'left-0 right-auto origin-top-left'
                      : 'right-0 left-auto origin-top-right'
                  )}
                >
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900">{user?.name}</p>
                    <p className="truncate text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="/admin/profile"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'group flex items-center px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                          {t('profile')}
                        </a>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <a
                          href="/admin/settings"
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'group flex items-center px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                          {t('settings')}
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
                              active ? 'bg-gray-50' : '',
                              'group flex w-full items-center px-4 py-2 text-sm text-red-700'
                            )}
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500"
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
                            {t('logout')}
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
