
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
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <div className="fixed left-0 top-0 z-50 p-5">
      <motion.div
        initial={false}
        animate={{ 
          width: isCollapsed ? "80px" : "240px",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="h-[calc(100vh-40px)] bg-gray-900 border border-gray-800 flex flex-col rounded-xl shadow-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <AnimatePresence mode="wait" initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center space-x-2"
              >
                <span className="text-xl font-semibold text-white">AI</span>
                <motion.span className="text-xl font-semibold text-white">
                  Analysis
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            layout
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white flex items-center justify-center w-8 h-8"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
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
                  <AnimatePresence mode="wait" initial={false}>
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

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white group"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="group-hover:text-yellow-400" />
            ) : (
              <Moon size={20} className="group-hover:text-blue-400" />
            )}
            <AnimatePresence mode="wait" initial={false}>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
