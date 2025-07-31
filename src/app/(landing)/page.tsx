'use client';

import { useEffect, useRef, useState } from 'react';

import HeroSection from '@/components/LandingPage/HeroSection';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import NumberDiv from '@/components/LandingPage/NumberDiv';
import SubscriptionSection from '@/components/LandingPage/SubscriptionSection';
import CicyleBg from '@/components/LandingPage/CicyleBg';
import { ChartPie } from '@/components/LandingPage/ChartPie';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const whyroshita = [
  {
    image: "Why94551.png",
    Title: "مريض اتصل يسأل عن حالته… والسكرتيرة قلبت الدفاتر.",
  },
  {
    image: "Why21492610591.png",
    Title: "موعد تأخر لأنه الجدول ما انتبه للتداخل.",
  },
  {
    image: "Why21512376191.png",
    Title: "ملف مريض ناقص… والطبيب ارتجل من الذاكرة.",
  },
]

const whatswepost = ["جدولة مواعيد بدون تعقيد. بتعرف من بدري وين في فراغات، وين في ضغط.", "ملف رقمي لكل مريض. مش بس التاريخ الطبي، بل ملاحظاتك كمان.", "تنبيهات تلقائية. للمريض، للطبيب، وللعيادة.", "متابعة عن بعد. مريضك في البيت؟ تقدر تتابعه من عندك.", "تقارير ذكية. مو بس أرقام… بل رؤى تساعدك تطور العيادة."]
const roshtasystem = ["الطبيب يشوف تنبيهات السكرتارية", "المختبر يستلم المطلوب لحاله", "المحاسب يعرف تلقائيًا حالة الفاتورة"]
export default function Home() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false)
  }, [])
  if (loading) {
    return <Card className='w-screen fixed top-0 left-0  z-50 h-screen flex justify-center items-center'>Loading..</Card>
  }
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div id='home' className='relative'>
        <HeroSection />
      </div>
      <Card className='rounded-none border-0'>

        <div className='max-w-7xl w-full   relative  mx-auto'>

          <h1 className="xxs:text-3xl text-xl max-w-3xl w-full   mx-auto leading-tight font-normal text-center sm:text-4xl  p-4 bg-gradient-to-t from-primary/50 to-[#9612FC] bg-clip-text text-transparent">
            ليش كل العيادات بتتحوّل لروشيتة؟ لأن الوقت ما بيتحمّل الفوضى.
          </h1>
          <CicyleBg className='top-[50%] -right-10' />

          <p className='text-center mb-3 sm:mb-0'> لماذا روشيتة؟</p>
          <div className='grid md:grid-cols-3 xsm:grid-cols-2  w-[95%] mx-auto grid-cols-1  py-3 gap-5  md:py-10 sm:py-5 '>
            {whyroshita.map((item, index) => (
              <div className='relative lg:h-[60vh]   w-full  flex justify-center items-center'
                key={index}>
                <div className='w-full flex justify-center items-center'>
                  <div className='relative '
                  >

                    <Image
                      src={`/images/${item.image}`} fill className='!w-fit !relative object-cover bg-center' alt='' />
                    <div className='bg-white/50  backdrop-blur p-2 py-3 text-center absolute  bottom-0 left-0'>
                      {item.Title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Card>

      <Card className='md:pb-20 pb-10 rounded-none border-0'>
        <h1 className="xxs:text-3xl text-xl max-w-6xl relative mx-auto leading-tight font-normal text-center sm:text-5xl  p-4 bg-gradient-to-tr to-secend from-primary bg-clip-text text-transparent">
          روشيتة خلصتك من كل هالفوضى، بنظام يشوف عنك، يتذكّر عنك، ويرتب لك كل شيء من أول لحظة.</h1>
      </Card>

      <div id='whyroshita' className='py-20 bg-gray-bg relative overflow-hidden'>
        <div className='flex flex-col gap-5 max-w-xl mx-auto justify-center items-center text-center text-white'>
          <h1 className="xxs:text-3xl text-xl  leading-tight font-normal text-center sm:text-4xl  p-4 ">
            احصل الآن على نسختك وتمتع بخصم مدى الحياة !
          </h1>

          <div className='flex flex-col gap-3'>
            <div>
              <Link href="/auth/login">
                <Button variant="lineargradian" size="lg">
                  إبدأ تجربة مجانية الآن
                  <MoveLeft className="  scale-125 ltr:rotate-180" />
                </Button>
              </Link>
            </div>
            <p>كن من ضمن الفئة الأولى واحصل على خصم 50% مدى الحياة</p>
          </div>
        </div>
        <div className='rounded-full absolute -bottom-10 bg-secend w-24 h-24  -left-10'></div>
      </div>
      <Card className=' p-0 pt-7 border-0 rounded-none'>
        <h1 className="xxs:text-3xl text-xl max-w-3xl   mx-auto leading-tight font-normal text-center sm:text-5xl  p-4 bg-gradient-to-tr to-secend from-primary bg-clip-text text-transparent">
          لماذا روشيتة؟!
        </h1>
        <div className='md:mt-10 mt-5 max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto md:min-h-[60vh] '>
          <div className='grid  sm:grid-cols-2 grid-cols-1 gap-5 w-full h-full'>
            <div className='flex items-center ltr:ml-auto'>
              <div className=''>
                <div className=' flex
                      flex-col gap-5 sm:max-w-sm sm:ltr:max-w-lg  sm:text-right text-center'>
                  <div >
                    <h1 className=" inline-block text-xl max-w-6xl relative mx-auto leading-tight font-normal text-center lg:text-4xl md:text-2xl sm:text-xl   ">
                      مش مجرد نظام طبي…
                    </h1>
                  </div>

                  <div>
                    <h1 className=" inline-block text-xl max-w-6xl relative mx-auto leading-tight font-normal text-center lg:text-4xl md:text-2xl sm:text-xl   ">
                      إحنا  فاهمين ألم العيادة.
                    </h1>
                  </div>
                  <p className='text-foreground/70  md:text-sm text-xs font-semibold'>{`"روشيتة"`} انولد من قلب عيادة.. اشتغلنا مع أطباء، سكرتارية، مرضى سمعنا كل التفاصيل، كل المآسي، وكل آه صغيرة من ضغط يوم العيادة.</p>
                  <p className='text-secend md:text-sm text-xs font-semibold'>ورجعنا صممنا النظام مش عشان يكون {`"جميل"`}وبس! ، لكن عشان يكون مفيد – سريع – واقعي – ذكي.</p>
                </div>
                <div className='flex  max-w-2xl   sm:justify-end sm:ltr:justify-start justify-center mt-10'>
                  <div className='xxs:w-3/5 w-full justify-between flex  '>
                    <NumberDiv number='1947' text='موظف' />
                    <NumberDiv number='+60' text='عيادة' />
                  </div>
                </div>
              </div>
            </div>
            <div className='relative rounded-4xl w-full sm:h-full h-[50vh] bg-center bg-cover ' style={{ backgroundImage: "url('/images/bg1.jpg')", backgroundPosition: "40% 20%" }}>
            </div>
          </div>
        </div>
      </Card>

      <div id='projects' className='relative bg-gradient-to-t to-transparent from-gray-50 overflow-hidden'>
        <CicyleBg className='bottom-10 right-0' />

        <Card className='md:pt-10 pt-5 border-0 rounded-none bg-gray-100 dark:bg-gray-700    px-4 sm:px-6 lg:px-8 sm:min-h-[60vh] '>
          <div className='flex md:flex-nowrap flex-col-reverse md:flex-row flex-wrap justify-between w-full h-full'>
            <div className='md:w-1/2 w-full'>
              <div className='relative rounded-4xl lg:w-4/5 w-full md:h-full h-[50vh] bg-center bg-contain bg-no-repeat ' style={{ backgroundImage: "url('/images/image349.png')" }}>
                <div className=' rounded-4xl xxs:block hidden w-[218px]  absolute sm:bottom-16 bottom-10 ltr:right-0 left-0  sm:left-10  lg:ltr:left-0 md:-left-10   lg:-left-20  h-[100px] bg-center bg-cover bg-no-repeat ' style={{ backgroundImage: "url('/images/image350.png')" }}>
                </div>
              </div>
            </div>
            <div className='flex items-center md:w-[45%] w-full'>
              <div className=''>
                <div className=' flex
                      flex-col gap-5  ltr:sm:text-right sm:text-left text-center'>
                  <div className='ltr:text-left text-right'>
                    <h1 className="xxs:text-3xl  text-xl max-w-3xl   mx-auto leading-tight font-normal  sm:text-5xl  p-4 bg-gradient-to-tr to-secend from-primary bg-clip-text text-transparent">
                      ماذا نقدم؟
                    </h1>
                    <h1 className=" inline-block text-xl max-w-6xl relative mx-auto leading-tight font-normal  lg:text-3xl md:text-2xl sm:text-xl   ">
                      كل شي تحتاجه… من أول {`"أهلا دكتور"`}

                    </h1>
                  </div>

                  <div className='ltr:text-left text-right'>
                    <h1 className=" inline-block text-xl max-w-6xl relative mx-auto leading-tight font-normal  lg:text-3xl md:text-2xl sm:text-xl   ">
                      لآخر   {`" الله يعطيك العافية"`}
                    </h1>
                  </div>
                  <div>
                    <ul className='flex-col flex gap-3 text-foreground/70 sm:text-sm text-xs'>
                      {whatswepost.map((item, index) => (
                        <li key={index} className='flex gap-2 '> <div className='min-h-2.5 mt-2 ltr:mt-1 min-w-2.5 max-h-2.5 max-w-2.5   bg-secend rotate-45'></div> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

      </div>

      <Card className='rounded-none border-0 p-0'>
        <div className='md:mt-32  mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto sm:min-h-[60vh] '>
          <div className='flex md:flex-nowrap flex-col-reverse md:flex-row  flex-wrap justify-between w-full h-full'>
            <div className='md:w-1/2 w-full'>
              <div className='max-w-[540px] flex flex-col gap-5'>
                <div className='lg:text-5xl md:text-4xl sm:text-3xl xxs:text-2xl text-xl font-normal md:leading-16'>
                  <h1 className=''>
                    <span>مش بس نظام…</span>
                    <span className='mr-1 font-black'>روشيتة </span>
                    <span>
                      بيشتغل كأنه فريق كامل
                    </span>
                  </h1>
                  <h1>
                  </h1>
                </div>

                <p className='text-foreground/70 md:text-lg text-sm'>من لحظة دخول المريض، لجدولة الموعد، للتشخيص، للوصفة، للمتابعة.. كل قسم في العيادة يتواصل تلقائيًا مع الثاني.</p>
                <ul className='flex-col flex gap-3 text-foreground/80 md:text-sm text-xs'>
                  {roshtasystem.map((item, index) => (
                    <li key={index} className='flex gap-2 '> <div className='min-h-2.5 mt-1 min-w-2.5 max-h-2.5 max-w-2.5   bg-secend rotate-45'></div> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='flex justify-center  items-center md:w-[45%] w-full'>
              <div className=''>
                <ChartPie />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className='bg-gray-100 dark:bg-gray-700 pt-10  rounded-none border-0' id='contact'>
        <h1 className="xxs:text-3xl text-xl max-w-3xl   mx-auto leading-tight font-normal text-center sm:text-5xl  p-4 bg-gradient-to-tr to-secend from-primary bg-clip-text text-transparent">
          نظامك متكامل، ذكي، وما بيضيّع وقت.
        </h1>

        <p className='text-foreground/70 max-w-5xl mx-auto sm:text-lg xxs:text-base text-sm  text-center leading-8 w-[98%]'>
          روشيتة وُلدت من قلب العيادات، بعد سنوات من الاستماع للأطباء، الموظفين، والمرضى. مش بس برنامج… بل شريك رقمي حقيقي، صُمم ليحل التحديات اليومية ويُعيد ترتيب يوم العمل الطبي
        </p>
        <SubscriptionSection />
      </Card>
    </div>

  );
}
