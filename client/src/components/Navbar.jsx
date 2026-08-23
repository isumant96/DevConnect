import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center border-b border-gray-800">
      
      <h1 className="text-2xl font-bold">
        DevConnect
      </h1>

      <div className="space-x-6">

        <Link to="/">
          Home
        </Link>

        {token ? (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <Link to="/create-post">
              Create Post
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;