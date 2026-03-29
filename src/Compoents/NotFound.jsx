import React from 'react';
import { useNavigate } from 'react-router-dom';


function NotFound() {
    const navigate=useNavigate();
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4'>
            <div className="w-full max-w-2xl flex flex-col justify-center items-center">
                <video
                    src='/NotFound.mp4' 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className='mt-8 flex flex-col items-center gap-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>Oops! Page Not Found</h2>
                        <button className='px-5 py-1 text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-pointer'
                        onClick={()=>navigate('/')}
                        >
                            BACK TO HOME PAGE
                        </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;