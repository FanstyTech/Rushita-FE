// Animation variants for staggered animations
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
export function calculateBMI(height: number, weight: number) {
  return weight / Math.pow(height / 100, 2);
}

export function getBMICategory(bmi: number) {
  if (bmi < 18.5) return 'نحيف';
  if (bmi < 25) return 'عادي';
  if (bmi < 30) return 'ممتلئ';
  return 'سمين';
}
