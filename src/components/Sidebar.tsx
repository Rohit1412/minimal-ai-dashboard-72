
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
  UserCircle2,
  Home
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Languages, label: "Translate", href: "/translate" },
    { icon: Video, label: "Analyse Video", href: "/analyse-video" },
    { icon: AudioLines, label: "Analyse Audio", href: "/analyse-audio" },
    { icon: FileText, label: "Analyse Text", href: "/analyse-text" },
    { icon: ImageIcon, label: "Analyse Image", href: "/analyse-image" },
    { icon: History, label: "History", href: "/history" },
    { icon: UserCircle2, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  if (isMobile) {
    return (
      <>
        <motion.button
          layout
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`fixed right-4 top-[26px] z-50 p-2 rounded-lg transition-colors flex items-center justify-center w-8 h-8 ${
            theme === 'dark' 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <Menu size={20} />
        </motion.button>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={() => setIsCollapsed(true)}
            >
              <div className={`w-[240px] h-full ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              } p-4`}>
                <div className={`flex items-center justify-between p-4 border-b ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <AnimatePresence mode="wait" initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center space-x-2"
                      >
                        <span className={`text-xl font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>AI</span>
                        <motion.span className={`text-xl font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Analysis
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button
                    layout
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 rounded-lg transition-colors flex items-center justify-center w-8 h-8 ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
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
                          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                            theme === 'dark'
                              ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                          }`}
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

                <div className={`p-4 border-t ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors group ${
                      theme === 'dark'
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

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
        className={`h-[calc(100vh-40px)] ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        } border flex flex-col rounded-xl shadow-xl`}
      >
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <AnimatePresence mode="wait" initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center space-x-2"
              >
                <span className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>AI</span>
                <motion.span className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Analysis
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            layout
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center w-8 h-8 ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
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
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                    theme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
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

        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors group ${
              theme === 'dark'
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
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
