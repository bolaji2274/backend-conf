import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../../../store/notificationSlice";
import AuthContext from "../../../context/AuthContext";
import { Users, LogOut, Bell } from "lucide-react"; 
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  const { logoutUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  // const { unreadCount } = useSelector((state) => state.notifications || { unreadCount: 0 });

  const handleBellClick = () => {
    dispatch(clearNotifications()); // Clear notifications on click
  };

  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        {/* Title on the left */}
        <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>

        {/* Icons in the middle */}
        <div className="flex items-center space-x-4">
          <Link
            to={'/contact/messages'}
            className="relative text-gray-400 hover:text-white cursor-pointer"
            onClick={handleBellClick}
          >
            <Bell className="text-gray-400 hover:text-white cursor-pointer" size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link to={'/users'} className="text-gray-400 hover:text-white cursor-pointer">
            <Users className="text-gray-400 hover:text-white cursor-pointer" size={24} />
          </Link>
        </div>

        {/* Logout button on the right */}
        <div className="flex items-center space-x-4">
          <button
            onClick={logoutUser}
            className="flex items-center text-gray-400 hover:text-white cursor-pointer"
          >
            <LogOut size={24} />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
