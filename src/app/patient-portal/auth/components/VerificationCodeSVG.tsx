import { motion } from 'framer-motion';

export default function VerificationCodeSVG({
  isInvalid = false,
}: {
  isInvalid?: boolean;
}) {
  return (
    <motion.div
      className="flex justify-center mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Outer circle with pulse effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isInvalid ? 'bg-destructive/10' : 'bg-primary/10 dark:bg-primary/5'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: 0.8 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />

        {/* Main SVG */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isInvalid ? 'text-destructive' : 'text-primary'}
        >
          {/* Shield outline */}
          <motion.path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {isInvalid ? (
            // X mark for invalid code
            <>
              <motion.path
                d="M9 15L15 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeInOut' }}
              />
              <motion.path
                d="M15 15L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeInOut' }}
              />
            </>
          ) : (
            // Check mark for valid state
            <motion.path
              d="M8 12L11 15L16 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
            />
          )}

          {/* Lock icon elements */}
          <motion.path
            d="M12 12V14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1.2, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="12"
            cy="10"
            r="1"
            fill="currentColor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          />
        </svg>

        {/* Inner glow */}
        <motion.div
          className={`absolute inset-4 rounded-full ${
            isInvalid ? 'bg-destructive/5' : 'bg-primary/5'
          } blur-md`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
