import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-black text-white border-b border-gray-800">

      {/* Logo */}
      <h1 className="text-2xl font-bold">
        DevConnect
      </h1>

      {/* Buttons */}
      <div className="flex gap-4">

        <Link to="/login">
          <button className="px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
            Register
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;