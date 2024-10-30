import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Users, LogOut, Bell } from "lucide-react"; 

const Header = ({ title }) => {
  const { user, logoutUser } = useContext(AuthContext);
  
  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        {/* Title on the left */}
        <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
        
        {/* Icons and Logout button on the right */}
        <div className="flex items-center space-x-4">
          <Bell className="text-gray-400 hover:text-white cursor-pointer" size={24} />
          <Users className="text-gray-400 hover:text-white cursor-pointer" size={24} />
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
