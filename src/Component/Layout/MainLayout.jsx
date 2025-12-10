import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";




const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow bg-[#E8F1FF]">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;