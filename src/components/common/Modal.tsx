import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Card, CardFooter, CardHeader } from '../ui/card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  footer?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '2xl',
  footer,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="min-h-full p-4 sm:p-6 flex items-center justify-center">
            {/* Modal panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel
                className={`w-full transform transition-all relative
                  ${
                    maxWidth === '7xl'
                      ? 'max-w-7xl'
                      : maxWidth === '6xl'
                      ? 'max-w-6xl'
                      : maxWidth === '5xl'
                      ? 'max-w-5xl'
                      : maxWidth === '4xl'
                      ? 'max-w-4xl'
                      : maxWidth === '3xl'
                      ? 'max-w-3xl'
                      : 'max-w-2xl'
                  }`}
              >
                <Card className="p-0 overflow-hidden rounded-2xl">
                  {/* Modal header */}
                  {title && (
                    <CardHeader className="px-6 py-4 border-b border-gray-100 dark:border-gray-900 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold leading-6 text-foreground">
                          {title}
                        </Dialog.Title>
                        <button
                          type="button"
                          onClick={onClose}
                          className="rounded-lg p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100/80 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </CardHeader>
                  )}

                  {/* Modal content */}
                  <div className="px-6 py-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
                    {children}
                  </div>

                  {/* Modal footer */}
                  {footer && (
                    <CardFooter className="px-6 py-4 border-t border-gray-100  dark:bg-gray-900/50 dark:border-gray-900 bg-gray-50/80 backdrop-blur-sm">
                      {footer}
                    </CardFooter>
                  )}
                </Card>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
