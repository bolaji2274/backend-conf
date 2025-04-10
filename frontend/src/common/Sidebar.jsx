import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, HomeIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

const SIDEBAR_ITEMS = [
	{ name: "Go Home", icon: HomeIcon, color: "#1B3A4B", href: "/" },
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/customer/dashboard",
	},
	{ name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Sales", icon: TbCurrencyNaira, color: "#10B981", href: "/sales" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <motion.div
      className={`fixed sm:relative z-50 h-full ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      } transition-transform duration-300 ease-in-out`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className='h-full bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
          >
            <Menu size={24} />
          </motion.button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="sm:hidden p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className='mt-8 flex-grow'>
          {SIDEBAR_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className="block w-full"
            >
              <motion.div 
                className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 w-full'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className='ml-4 whitespace-nowrap'
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
