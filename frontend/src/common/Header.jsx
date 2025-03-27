// const Header = ({ title }) => {
// 	return (
// 		<header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
// 			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
// 				<h1 className='text-2xl font-semibold text-gray-100 text-center'>{title}</h1>
// 			</div>
// 		</header>
// 	);
// };
// export default Header;

// const Header = ({ title }) => {
//   return (
//     <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
//       <div className='max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8'>
//         <h1 className='text-xl sm:text-2xl font-semibold text-gray-100 text-center'>{title}</h1>
//       </div>
//     </header>
//   );
// };
// export default Header;

const Header = ({ title, toggleMobileMenu }) => {
  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className='text-xl sm:text-2xl font-semibold text-gray-100 text-center flex-1'>
          {title}
        </h1>
      </div>
    </header>
  );
};
export default Header;