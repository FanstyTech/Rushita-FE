import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoChevronBackOutline } from 'react-icons/io5';
import { adminNav, clinicNav, doctorNav } from './Sidebar';

export default function QuickMenu({ userRole = 'admin' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [navigationStack, setNavigationStack] = useState<any[]>([]);

  const navItems = {
    admin: adminNav,
    clinic: clinicNav,
    doctor: doctorNav,
  }[userRole];

  const currentItems =
    navigationStack.length > 0
      ? navigationStack[navigationStack.length - 1].children
      : navItems;

  const handleItemClick = (item: any) => {
    if (item.children) {
      setNavigationStack([...navigationStack, item]);
    }
  };

  const handleBack = () => {
    setNavigationStack(navigationStack.slice(0, -1));
  };

  const renderItems = (items: any[]) => {
    return items.map((item) => (
      <motion.div
        key={item.name}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {item.href ? (
          <Link
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="block h-full"
          >
            <div className="group flex flex-col items-center justify-center p-5 h-full rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:from-primary/5 hover:to-primary/10 border border-gray-100 hover:border-primary/20 transition-all duration-200">
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow-lg shadow-gray-200/50 mb-4 group-hover:shadow-primary/20 transition-all duration-200">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <item.icon className="w-8 h-8 text-gray-700 group-hover:text-primary transition-colors" />
                </div>
              </div>
              <span className="text-base font-medium text-gray-800 group-hover:text-gray-900 text-center transition-colors">
                {item.name}
              </span>
              {item.description && (
                <span className="text-xs text-gray-500 mt-1 text-center">
                  {item.description}
                </span>
              )}
            </div>
          </Link>
        ) : (
          <div
            onClick={() => handleItemClick(item)}
            className="block h-full cursor-pointer"
          >
            <div className="group flex flex-col items-center justify-center p-5 h-full rounded-2xl bg-gradient-to-b from-gray-50 to-white hover:from-primary/5 hover:to-primary/10 border border-gray-100 hover:border-primary/20 transition-all duration-200">
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow-lg shadow-gray-200/50 mb-4 group-hover:shadow-primary/20 transition-all duration-200">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <item.icon className="w-8 h-8 text-gray-700 group-hover:text-primary transition-colors" />
                </div>
              </div>
              <span className="text-base font-medium text-gray-800 group-hover:text-gray-900 text-center transition-colors">
                {item.name}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {item.children?.length} items
              </span>
            </div>
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-white p-3 rounded-[22px] shadow-lg hover:shadow-xl transition-all duration-300 border-[1.5px] border-gray-200"
        >
          <AiOutlineMenu className="w-6 h-6 text-gray-700" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl"
            >
              <div className="p-6 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-black/5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {navigationStack.length > 0 && (
                      <button
                        onClick={handleBack}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <IoChevronBackOutline className="w-6 h-6" />
                      </button>
                    )}
                    <h2 className="text-2xl font-bold text-gray-800">
                      {navigationStack.length > 0
                        ? navigationStack[navigationStack.length - 1].name
                        : 'Quick Menu'}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setNavigationStack([]);
                    }}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <IoCloseOutline className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto p-2">
                  {renderItems(currentItems)}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
