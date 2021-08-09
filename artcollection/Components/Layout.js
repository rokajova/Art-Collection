import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {/* main */}
      {children}
    </div>
  );
};

export default Layout;
