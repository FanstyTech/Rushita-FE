'use client';

import { motion } from 'framer-motion';
import AddClinicForm from './ClinicForm';
import PageLayout from '@/components/layouts/PageLayout';
import { Card } from '@/components/ui/card';

export default function AddClinicPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=""
        >
          <Card className="p-6 sm:p-8">
            <AddClinicForm />
          </Card>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}
