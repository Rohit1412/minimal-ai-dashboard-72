
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Menu,
  Languages,
  Video,
  AudioLines,
  FileText,
  Image as ImageIcon,
  History,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Languages, label: "Translate", href: "/translate" },
    { icon: Video, label: "Analyse Video", href: "/analyse-video" },
    { icon: AudioLines, label: "Analyse Audio", href: "/analyse-audio" },
    { icon: FileText, label: "Analyse Text", href: "/analyse-text" },
    { icon: ImageIcon, label: "Analyse Image", href: "/analyse-image" },
    { icon: History, label: "History", href: "/history" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed left-5 top-5 z-[100]">
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "240px" }}
        className="h-[calc(100vh-40px)] bg-gray-900 border border-gray-800 flex flex-col rounded-xl shadow-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center space-x-2"
              >
                <span className="text-xl font-semibold text-white">AI</span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  className="text-xl font-semibold text-white"
                >
                  Analysis
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white group"
                >
                  <item.icon size={20} className="group-hover:text-purple-400" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default Sidebar;
