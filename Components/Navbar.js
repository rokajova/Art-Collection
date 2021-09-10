import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/nukednations">
        <a>Nuked Nations</a>
      </Link>
      <Link href="/pirate-soul-island">
        <a>Pirate Soul Island</a>
      </Link>
    </nav>
  );
};

export default Navbar;
