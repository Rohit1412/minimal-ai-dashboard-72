
import { APP_TITLE } from "@/constants/text";
import { useIsMobile } from "@/hooks/use-mobile";

const PageHeader = () => {
  const isMobile = useIsMobile();

  return (
    <div className="h-[80px] w-full bg-background fixed top-0 z-40 border-none flex items-center justify-center">
      <h1 className={`font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent ${isMobile ? 'text-lg' : 'text-2xl'}`}>
        {APP_TITLE}
      </h1>
    </div>
  );
};

export default PageHeader;
