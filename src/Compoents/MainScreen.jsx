import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';
import DashboardContent from './Dashboard';
import SettingsContent from './Setting';
import useUserStore from '../Store/userStore';
import RepositoriesContent from './RepositoriesContent';
import AnalyzeContent from './AnalyzeContent';

function MainScreen() {
  const [activeComp, setActiveComp] = useState('Dashboard');
  const { user } = useUserStore();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Navbar activeComp={activeComp} setActiveComp={setActiveComp} />
      <div className='flex'>
        <SideBar activeComp={activeComp} setActiveComp={setActiveComp} />
        <div className='w-full'>
          {activeComp === 'Dashboard' && <DashboardContent />}
           {activeComp === 'Repositories' && <RepositoriesContent />}
          {activeComp === 'Analyze' && <AnalyzeContent />}
          
          {activeComp === 'Settings' && (
            <SettingsContent 
              user={user} 
              theme={theme} 
              setTheme={setTheme} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;