import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";




const MainLayout = () => {
  return (
    <div className="min-h-full max-w-full ">

  
    <Navbar/>
<main className=" flex flex-col min-h-screen max-w-7xl mx-auto bg-[#E8F1FF]">
        <Outlet/>
      </main>
      <Footer />
    
      </div>
  );
};

export default MainLayout;