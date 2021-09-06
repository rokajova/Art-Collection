import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import styles from "../styles/Home.module.css";

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
