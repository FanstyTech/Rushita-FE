import React from "react";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";
import CicyleBg from "./CicyleBg";
import Image from "next/image";
import Link from "next/link";


const HeroSection = () => {

    return (
        <section className="w-full max-w-7xl md:py-20 pt-20   mx-auto min-h-[80vh]  relative dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
            <div className="w-full">
                <CicyleBg />
                <CicyleBg className="bottom-20 -left-10" />
                <div className="w-full justify-center items-center flex">

                    <div className="text-center max-w-2xl" dir="rtl">
                        <h1 className="xxs:text-4xl text-3xl  sm:text-5xl font-bold p-4 bg-gradient-to-r from-primary to-secend bg-clip-text text-transparent">
                            العيادة الذكية تبدأ من هنا.
                        </h1>
                        <p className="text-gray-color/70 dark:text-gray-300 xxs:text-lg text-base sm:mb-8 mb-3">
                            مع روشيتة، انتهى زمن الورق والتأجيل... وبدأ زمن الترتيب، الراحة، والسيطرة الكاملة على يومك.
                            <br />
                            <span className="text-black">
                                من أول موعد... لذكر متابعة – كل شيء في مكانه.
                            </span>
                        </p>
                        <div className="flex flex-col xxs:flex-row ltr:flex-wrap-reverse items-center justify-center sm:gap-4 gap-2">
                            <Link href="/auth/login" className="xxs:w-fit w-full">
                                <Button size="lg" variant="outline" className=" xxs:w-fit w-full">
                                    سجل دخولك
                                </Button>
                            </Link>
                            <Link href="/auth/login" className="xxs:w-fit w-full">

                                <Button size="lg" className="items-center  flex xxs:w-fit w-full  " variant="lineargradian">
                                    إبدأ تجربة مجانية الآن
                                    <MoveLeft className="  scale-125 " />

                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center w-full md:mt-10 mt-5">
                    <div className=" relative max-w-5xl  sm:h-[70vh] w-full h-72 ">
                        <Image fill src="/images/Group2535.png" alt="" />
                        <div className="w-full z-0 sm:h-32 h-20 lg:h-40 bg-gradient-to-b blur-2xl  to-white from-transparent absolute bottom-0 left-0  "></div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
