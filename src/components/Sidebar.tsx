
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSidebar from "./sidebar/MobileSidebar";
import DesktopSidebar from "./sidebar/DesktopSidebar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />;
  }

  return <DesktopSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />;
};

export default Sidebar;

