
import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "240px" }}
      className="h-screen bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0 z-50"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && (
          <span className="text-xl font-semibold text-white">AI Analysis</span>
        )}
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
                {!isCollapsed && (
                  <span>{item.label}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
