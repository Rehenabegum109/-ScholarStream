import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      <Navbar />

      <main className="min-h-screen w-full bg-[#E8F1FF]">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;