import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
interface AnalysisStatusProps {
  title: string;
  description?: string;
  icon: LucideIcon;
}
const AnalysisStatus = ({
  title,
  description,
  icon: Icon
}: AnalysisStatusProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary dark:text-white">{title}</h1>
      </div>
      {description && <p className="text-muted-foreground dark:text-gray-300 ml-8 mt-2 py-[16px] font-semibold px-0">
          {description}
        </p>}
    </motion.div>;
};
export default AnalysisStatus;