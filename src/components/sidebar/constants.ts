
import { 
  Home,
  Video,
  AudioLines,
  FileText,
  Image as ImageIcon,
  History,
  Settings,
  UserCircle2,
  Shield
} from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Shield, label: "Police AI", href: "/police-ai" },
  { icon: Video, label: "Analyse Video", href: "/analyse-video" },
  { icon: AudioLines, label: "Analyse Audio", href: "/analyse-audio" },
  { icon: FileText, label: "Analyse Text", href: "/analyse-text" },
  { icon: ImageIcon, label: "Analyse Image", href: "/analyse-image" },
  { icon: History, label: "History", href: "/history" },
  { icon: UserCircle2, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
