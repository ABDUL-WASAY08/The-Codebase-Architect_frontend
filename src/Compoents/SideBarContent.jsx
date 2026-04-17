import React, { useState, useEffect, useRef } from 'react';
import { Home, FolderGit2, BarChart3, Settings, Menu, X, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

const SideBarContent = ({ activeComp, setActiveComp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const sidebarItems = [
        { name: 'Dashboard', icon: Home },
        { name: 'Repositories', icon: FolderGit2 },
        { name: 'Analyze', icon: BarChart3 },
        { name: 'ChromeExtension', icon: Gift },
        { name: 'Settings', icon: Settings },
    ];

    const isMobileDevice = () => {
        return window.innerWidth < 1024;
    };

    const handleItemClick = (itemName) => {
        if (itemName === 'ChromeExtension' && isMobileDevice()) {
            toast.error("Feature not available in mobile. Please go to your laptop.");
            setIsOpen(false);
            return;
        }
        setActiveComp(itemName);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className='relative'>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='lg:hidden fixed bottom-4 right-4 z-[60] bg-gray-800 text-white p-3 rounded-full shadow-xl hover:bg-gray-700 transition-colors'
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800
                    transition-transform duration-300 ease-in-out transform
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
                `}
            >
                <div className="h-full overflow-y-auto">
                    {/* Logo/Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">CodeBase</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Analysis Platform</p>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeComp === item.name;

                            return (
                                <div
                                    key={item.name}
                                    onClick={() => handleItemClick(item.name)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                                        ${isActive
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Backdrop overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SideBarContent;