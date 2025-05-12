import { Link } from "react-router";

const Nav = ({ user, logout }) => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        <ul className="flex space-x-6 text-lg font-medium">
          {user ? (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  className="hover:text-gray-300 transition-colors"
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-gray-300 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li
                onClick={logout}
                className="cursor-pointer hover:text-gray-300 transition-colors"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-300 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-gray-300 transition-colors"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
