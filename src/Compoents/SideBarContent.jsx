import React, { useState, useEffect, useRef } from 'react';
import { Home, FolderGit2, BarChart3, Settings, Menu, X ,Gift} from 'lucide-react';

const SideBarContent = ({ activeComp, setActiveComp }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const sidebarItems = [
        { name: 'Dashboard', icon: Home },
        { name: 'Repositories', icon: FolderGit2 },
        { name: 'Analyze', icon: BarChart3 },
        { name: 'Settings', icon: Settings },
        { name: 'GetChrome Extension', icon: Gift }
    ];

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
        <>
            {/* Mobile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='lg:hidden fixed bottom-4 right-4 z-[60] bg-blue-600 text-white p-3 rounded-full shadow-xl'
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div
                ref={sidebarRef}
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black 
                    transition-transform duration-300 ease-in-out transform
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:static lg:block
                `}
            >
                <nav className="p-4 space-y-1 mt-16 lg:mt-0">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;

                        // FIX: Check if this specific item is the active one
                        const isActive = activeComp === item.name;

                        return (
                            <div
                                key={item.name}
                                onClick={() => {
                                    setIsOpen(false);
                                    setActiveComp(item.name);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
            )}
        </>
    );
};

export default SideBarContent;