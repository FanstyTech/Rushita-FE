'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Users,
  Calendar,
  BarChart3,
  Clock,
  Shield,
  Stethoscope,
  LogIn,
  Heart,
  Activity,
  Pill,
  Star,
  ChevronDown,
  CheckCircle,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

interface CountUpAnimationProps {
  end: number;
  duration?: number;
}

interface FloatingIconProps {
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

const Parallax = ({ children, offset = 50, className = '' }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const FloatingIcon = ({
  icon: Icon,
  delay = 0,
  className = '',
}: FloatingIconProps) => {
  const float = {
    y: [0, -15, 0],
    x: [0, 10, 0],
    rotate: [-5, 5, -5],
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      animate={float}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <Icon className="w-8 h-8 text-blue-500/30" />
    </motion.div>
  );
};

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Doctor Management',
    description:
      'Efficiently manage your medical staff with comprehensive profiles and scheduling.',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Smart Scheduling',
    description:
      'Intelligent appointment system that optimizes doctor availability and patient convenience.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Analytics & Reports',
    description:
      'Gain valuable insights with detailed analytics and performance reports.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Real-time Updates',
    description:
      'Stay informed with instant notifications and real-time status updates.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure Platform',
    description:
      'Enterprise-grade security ensuring your medical data is always protected.',
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Clinical Excellence',
    description:
      'Tools and features designed to enhance clinical care and patient outcomes.',
  },
];

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Medical Director',
    image: '/images/testimonials/doctor1.jpg',
    content:
      'Rushita has transformed how we manage our clinic. The efficiency gains are remarkable.',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Pediatrician',
    image: '/images/testimonials/doctor2.jpg',
    content:
      'The patient management features are intuitive and save us hours every week.',
    rating: 5,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Family Physician',
    image: '/images/testimonials/doctor3.jpg',
    content:
      'Outstanding support team and regular updates keep the system running smoothly.',
    rating: 5,
  },
];

const statistics = [
  { label: 'Active Users', value: 2000, suffix: '+', icon: Users },
  {
    label: 'Patient Appointments',
    value: 1000000,
    suffix: '+',
    icon: Calendar,
  },
  { label: 'Clinics Worldwide', value: 500, suffix: '+', icon: Activity },
  { label: 'Patient Satisfaction', value: 98, suffix: '%', icon: Heart },
];

const howItWorks = [
  {
    title: 'Sign Up',
    description: 'Create your clinic account in minutes',
    icon: LogIn,
  },
  {
    title: 'Setup Your Clinic',
    description: 'Customize settings to match your workflow',
    icon: Shield,
  },
  {
    title: 'Start Managing',
    description: 'Begin scheduling and managing patients',
    icon: Calendar,
  },
];

const faqs = [
  {
    question: 'How secure is patient data?',
    answer:
      'We implement bank-level security measures and are fully HIPAA compliant to ensure your patient data is always protected.',
  },
  {
    question: 'Can I integrate with existing systems?',
    answer:
      'Yes, Rushita offers API integration capabilities with most major healthcare systems and EMRs.',
  },
  {
    question: 'What support options are available?',
    answer:
      'We provide 24/7 technical support, comprehensive documentation, and regular training sessions.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'We offer flexible pricing plans based on your clinic size and needs. Contact us for a custom quote.',
  },
];

const CountUpAnimation = ({ end, duration = 2000 }: CountUpAnimationProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isInView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Parallax Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingIcon icon={Heart} className="top-[15%] left-[10%]" delay={0} />
        <FloatingIcon
          icon={Activity}
          className="top-[45%] right-[15%]"
          delay={1}
        />
        <FloatingIcon
          icon={Pill}
          className="bottom-[20%] left-[20%]"
          delay={2}
        />
        <FloatingIcon
          icon={Stethoscope}
          className="top-[30%] right-[25%]"
          delay={1.5}
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform -skew-y-6"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Parallax offset={30} className="relative z-10">
            <div className="text-center relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Rushita
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="sm:text-xl text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
              >
                Your comprehensive clinic management solution for enhanced
                healthcare delivery and seamless operations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center gap-4 flex-wrap"
              >
                <Link
                  href="/clinic/dashboard"
                  className="px-8 py-3 sm:w-fit w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:text-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="px-8 py-3 sm:w-fit w-full flex justify-center items-center bg-white text-gray-700 rounded-xl sm:text-lg text-base font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300  gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              </motion.div>
            </div>
          </Parallax>
        </div>
      </div>

      {/* Features Section with Enhanced Parallax */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <Parallax offset={20}>
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Powerful Features for Modern Healthcare
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Discover how our comprehensive suite of tools can transform your
              clinic&apos;s operations and enhance patient care.
            </motion.p>
          </div>
        </Parallax>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <Parallax
              key={feature.title}
              offset={20 + index * 10}
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full transform transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 lg:py-24">
        <Parallax offset={30}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid xxs:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-12">
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <div className="sm:text-3xl text-lg font-bold text-gray-900 mb-2">
                    <CountUpAnimation end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 sm:text-lg text-base line-clamp-2 ">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>

      {/* How It Works Section */}
      <div className="py-16 lg:py-24">
        <Parallax offset={30}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                How It Works
              </motion.h2>
              <p className="text-gray-600">
                Get started with Rushita in three simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-10">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-blue-300"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronDown className="w-8 h-8 rotate-[-90deg]" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <Parallax offset={30}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                What Our Users Say
              </motion.h2>
              <p className="text-gray-600">
                Trusted by healthcare professionals worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>

      {/* FAQ Section */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <Parallax offset={30}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Frequently Asked Questions
              </motion.h2>
              <p className="text-gray-600">
                Find answers to common questions about Rushita
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>

      {/* CTA Section with Parallax Background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 lg:py-24 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-10">
          <motion.div
            style={{
              backgroundImage: "url('/images/pattern.png')",
              y: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']),
            }}
            className="absolute inset-0 bg-repeat"
          />
        </motion.div>

        <Parallax offset={40} className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6"
            >
              Ready to Transform Your Clinic?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of healthcare providers who have already enhanced
              their practice with our platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-xl text-lg font-medium hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <LogIn className="w-5 h-5" />
                Start Now
              </Link>
            </motion.div>
          </div>
        </Parallax>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Rushita. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
