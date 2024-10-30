import Header from "../common/Header";
import ConnectedAccounts from "../settings/ConnectedAccounts";
import DangerZone from "../settings/DangerZone";
import Notifications from "../settings/Notifications";
import Profile from "../settings/Profile";
import Security from "../settings/Security";
import Sidebar from "../common/Sidebar";
const SettingsPage = () => {
	return (
		 <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone />
			</main>
		</div>
		</div>
	);
};
export default SettingsPage;
