import Image from "next/image";

const DesktopHeader = () => (
  <nav className="bg-gray-800 p-4 hidden md:block">
    <div className="container mx-auto flex flex-col items-center">
      <div className="text-white font-bold text-xl mb-4">
        <Image
          src=".public/images/the-atom-header-best.jpg"
          alt="APDS Landscaping Logo"
          width={540}
          height={282}
        />
      </div>
    </div>
  </nav>
);

const MobileHeader = () => (
  <nav className="bg-gray-800 p-4 fixed bottom-0 left-0 right-0 md:hidden"></nav>
);

export default function ClientNavbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <DesktopHeader />
      {isMobile && <MobileHeader />}
    </>
  );
}
