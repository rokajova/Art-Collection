import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/pirate-soul-island">
        <a>/ pirate soul island /</a>
      </Link>
    </nav>
  );
};

export default Navbar;
