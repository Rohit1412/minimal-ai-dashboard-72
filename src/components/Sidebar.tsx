
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, LayoutDashboard, BrainCircuit, BarChart3, Settings, Menu } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: BrainCircuit, label: "AI Models", href: "/models" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "240px" }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <span className="text-xl font-semibold text-gray-800">Analytics</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon size={20} className="text-gray-600" />
                {!isCollapsed && (
                  <span className="text-gray-700">{item.label}</span>
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
