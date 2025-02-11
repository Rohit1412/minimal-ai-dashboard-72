
import { motion } from "framer-motion";
import { AudioLines } from "lucide-react";

interface AnalysisStatusProps {
  title: string;
}

const AnalysisStatus = ({ title }: AnalysisStatusProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-8">
        <AudioLines className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary dark:text-white">{title}</h1>
      </div>
    </motion.div>
  );
};

export default AnalysisStatus;
