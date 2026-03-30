import React from 'react';

const SettingsContent = ({ user,theme,setTheme }) => {
    
  const handleThemeChange = (e) => {
    const selected = e.target.value;
    setTheme(selected.toLowerCase());
  };

  return (
    <div className="min-h-[93vh] bg-white dark:bg-black  p-6 transition-colors">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
      <div className="space-y-6">
        <div className='flex flex-col justify-center items-center'>
          <img className='rounded-full w-[100px] h-auto border-2 border-black dark:border-blue-500' src={user.avatar} alt="User avatar" />
          <p className="text-gray-900 dark:text-white font-medium mt-2">{user.name}</p>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Preference</label>
          <select 
            onChange={handleThemeChange} 
            defaultValue={localStorage.getItem('theme') === 'dark' ? 'Dark' : 'Light'}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key Management</label>
          <button className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Regenerate API Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;