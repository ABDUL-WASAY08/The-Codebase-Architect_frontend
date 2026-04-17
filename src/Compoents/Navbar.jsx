import React, { useEffect, useRef, useState } from 'react';
import { Code2, User, ChevronDown, Settings, LogOut, GitBranchIcon } from 'lucide-react';
import useUserStore from '../Store/userStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = ({activeComp,setActiveComp}) => {
    const [toggle, setToggle] = useState(false)
    const dropDownRef=useRef(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const handleOutSideEvent=(event)=>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setToggle(false)
            }
        };
        document.addEventListener('mousedown',handleOutSideEvent);
        return()=>{
            document.removeEventListener('mousedown',handleOutSideEvent)
        }

    },[])
    const {logout}=useUserStore();
    const handleLogout=async ()=>{
        const response=await logout();
        if(response.success){
            toast.success('logout successfull');
            navigate('/')
        }
        
    }
    return (
        <nav className='bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 sticky top-0 z-50 transition-colors'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Code2 className="w-8 h-8 text-gray-600" />
                        <span className="text-md md:text-xl font-bold text-gray-900 dark:text-white">
                            The Codebase Architect
                        </span>
                    </div>

                    <div className="relative" ref={dropDownRef}>
                        <button
                            onClick={() => setToggle(!toggle)}
                            className="flex items-center gap-2 focus:outline-none  cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shadow-md">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        {toggle && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                                onClick={()=>{setActiveComp('Settings'),
                                    setToggle(!toggle)
                                }}

                                >
                                    <User size={16} />
                                    Profile
                                </button>
                                <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                                onClick={()=>{
                                    setActiveComp('Analyze');
                                    setToggle(!toggle)
                                }}
                                >
                                    <GitBranchIcon size={16} />
                                    Analyzer
                                </button>
                                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                <button
                                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                                onClick={handleLogout}
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                           
                        )}
                    </div>
                </div>

            </div>
        </nav>

    );
};
export default Navbar;