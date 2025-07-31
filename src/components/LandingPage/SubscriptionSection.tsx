import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const SubscriptionSection = () => {
    const [paymentInterval, setPaymentInterval] = useState('monthly');

    const subscriptions = [
        {
            name: 'الباقة الرئيسية',
            subtitle: "خطة وحدة… تغطي كل العيادة.",
            price: { monthly: 50, yearly: 500 },
            type: " الانسب لك",
            features: ['كامل العيادة بخطة واحدة', 'باقة شهرية ثابتة تشمل كل شيء', 'لا رسوم خفية', 'لا إضافات مفاجئة', 'الدعم الفني', '، التحديثات والميزات الكاملة', 'إدخال أكثر 100 مريض بشكل شهري', 'ضبط مواعيد لكل طبيب لديك'],
        },
        {
            name: 'الباقة الرئيسية',
            subtitle: "خطة وحدة… تغطي كل العيادة.",
            price: { monthly: 50, yearly: 500 },
            type: " الانسب لك",
            features: ['كامل العيادة بخطة واحدة', 'باقة شهرية ثابتة تشمل كل شيء', 'لا رسوم خفية', 'لا إضافات مفاجئة', 'الدعم الفني', '، التحديثات والميزات الكاملة', 'إدخال أكثر 100 مريض بشكل شهري', 'ضبط مواعيد لكل طبيب لديك'],
        },
        {
            name: 'الباقة الرئيسية',
            subtitle: "خطة وحدة… تغطي كل العيادة.",
            price: { monthly: 50, yearly: 500 },
            type: " الانسب لك",
            features: ['كامل العيادة بخطة واحدة', 'باقة شهرية ثابتة تشمل كل شيء', 'لا رسوم خفية', 'لا إضافات مفاجئة', 'الدعم الفني', '، التحديثات والميزات الكاملة', 'إدخال أكثر 100 مريض بشكل شهري', 'ضبط مواعيد لكل طبيب لديك'],
        },

    ];

    const togglePaymentInterval = (from: string) => {
        if (paymentInterval !== from) {
            setPaymentInterval(paymentInterval === 'monthly' ? 'yearly' : 'monthly');
        }

    };

    return (
        <section className="py-8">
            <div className="container mx-auto px-2">
                <div className="flex justify-center items-center mb-4 ">
                    <Card className=' border-0 relative flex-row z-10 flex px-3 py-2 rounded-xl gap-1'>
                        <Button
                            size="sm"
                            variant={`${paymentInterval === 'monthly' ? "PlanButton" : "outline"}`}
                            className='px-5 border-0'
                            onClick={() => togglePaymentInterval("monthly")}
                        >
                            شهري
                        </Button>
                        <Button
                            size="sm"
                            variant={`${paymentInterval === 'yearly' ? "PlanButton" : "outline"}`}
                            className='border-0'
                            onClick={() => togglePaymentInterval("yearly")}
                        >
                            سنوي
                        </Button>
                    </Card>
                </div>
                <div className="flex justify-center items-center relative ">
                    {subscriptions.map((subscription, index) => (
                        <Card key={index} dir={`${index == 2 && "ltr"}`} className={`${index == 0 ? "border border-secend relative z-10" : `${index == 2 ? "rotate-[-30deg] -translate-x-10  origin-bottom-left" : "rotate-[30deg] origin-bottom-right"} opacity-30 top-5 sm:flex hidden  absolute -z-0`} xl:w-[25%] lg:w-2/5 border border-secend w-full sm:w-2/3 md:w-1/2 flex flex-col sm:gap-7 gap-3 px-6 py-10 bg-white rounded-lg shadow-md`}>
                            <div>
                                <div className='flex flex-wrap  gap-3 items-center mb-2'>
                                    <h2 className="sm:text-2xl text-xl font-black">{subscription.name}</h2>
                                    <div className='text-primary bg-primary/10 sm:text-lg text-sm  rounded-lg px-3  py-1 text-center'>
                                        {subscription.type}
                                    </div>
                                </div>
                                <p className='text-foreground/70 text-sm'>{subscription.subtitle}</p>
                            </div>
                            <div className='flex gap-4 mt-3  mr-2 '>
                                <p className="text-xl font-semibold mb-4 text-center text-foreground">
                                    <span className='sm:text-5xl text-3xl font-black '>${paymentInterval === 'yearly' ? subscription.price.yearly : subscription.price.monthly}</span>
                                </p>
                                <p className='xxs:text-sm text-xs text-foreground/70
                            '>
                                    وفر 100 دولار في الاشتراك
                                    <br className='xxs:block hidden' />
                                    السنوي
                                </p>
                            </div>
                            <Button className='sm:h-20 h-14 mx-2'>
                                إبدا الآن
                            </Button>
                            <ul className="flex flex-col gap-3 xxs:text-sm text-xs">
                                {subscription.features.map((feature, index) => (
                                    <li key={index} className="flex items-center  gap-2">
                                        <Check className=" text-check-color" size={16} /> {feature}
                                    </li>
                                ))}
                            </ul>

                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SubscriptionSection;