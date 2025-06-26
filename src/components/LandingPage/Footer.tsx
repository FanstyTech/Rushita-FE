"use client"
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const navLinks = [
    { id: "home", label: "الرئيسية" },
    { id: "whyroshita", label: "لماذا روشيتة" },
    { id: "projects", label: "خدماتنا" },
    { id: "contact", label: "الاسعار" }
];
function Footer() {
    return (
        <footer className=" mt-5 text-black ">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex  md:flex-row flex-col sm:justify-between justify-center">
                    {/* معلومات الشركة */}
                    <div className="flex justify-center items-center  text-right">
                        <div className='flex justify-center items-center'>
                            <div className="flex flex-row-reverse text-[#12141D]/85  space-x-reverse space-x-4">
                                <Link href="#" className=" duration-300  hover:text-blue-500"><FaFacebook size={24} /></Link>
                                <Link href="#" className=" duration-300  hover:text-blue-400"><FaTwitter size={24} /></Link>
                                <Link href="#" className=" duration-300  hover:text-blue-600"><FaLinkedin size={24} /></Link>
                                <Link href="#" className=" duration-300  hover:text-pink-500"><FaInstagram size={24} /></Link>
                            </div>
                        </div>

                    </div>

                    <div className="text-right ">
                        <ul className="space-y-2 xxs:flex-row flex-col flex xxs:gap-5 mt-3 justify-center w-full md:w-fit  items-center  text-[#12141D]">
                            {navLinks.map((item) => (
                                <li key={item.id} className='m-0'><Link href={`/#${item.id}`} className="  hover:text-secend text-gray-color duration-300 ">{item.label}</Link></li>
                            ))}

                        </ul>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Image
                            width={150}
                            height={50}
                            src="/images/image4.png"
                            alt="شعار الشركة"
                            className="h-12 w-auto"
                        />

                    </div>
                </div>

                {/* الشريط السفلي */}
                <div className="mt-12 pt-8 border-t border-gray-500 flex flex-col sm:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-color">
                    <div className="flex flex-row-reverse xxs:flex-nowrap flex-wrap gap-5 items-center space-x-reverse ">
                        <Link href="#" className="hover:text-secend duration-300 text-gray-color ">سياسة الخصوصية</Link>
                        <Link href="#" className="hover:text-secend duration-300 text-gray-color">الشروط والأحكام</Link>
                    </div>
                    <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لشركتك</p>

                </div>

                {/* زر الصعود للأعلى */}

            </div>
        </footer>

    )
}

export default Footer