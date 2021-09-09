import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {/* main */}
      <Footer />
      {children}
    </div>
  );
};

export default Layout;
