import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {/* main */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
