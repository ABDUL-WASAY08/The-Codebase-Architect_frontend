import { Code2, ExternalLink, File, GitBranch, GitBranchIcon, GitBranchPlus } from 'lucide-react'
import React from 'react'

function AuthComp() {
    const handleGithubLogin = () => {
        console.log('Login with GitHub clicked')
       
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='grid lg:grid-cols-2 min-h-screen'>
                {/* Left Column - Features Section */}
                <div className='flex flex-col justify-center items-center p-8 md:p-12'>
                    <div className='flex flex-col items-center gap-8 max-w-2xl'>
                        <div className='flex items-center gap-4'>
                            <Code2 size={150} className='text-blue-600' />
                            <h1 className='text-4xl  md:text-5xl font-bold text-blue-800 text-center'>
                                CODE BASED ARCHITECTURE
                            </h1>
                        </div>
                        
                        <div className='space-y-6 mt-8 w-full'>
                           
                            <div className='grid gap-4'>
                                <div className='flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='text-red-600 text-xl'><GitBranchPlus /></div>
                                    <div>
                                        <h3 className='font-semibold text-gray-800'>Analyze the git repos</h3>
                                        <p className='text-gray-600'>Analyze the repo code in professional way</p>
                                    </div>
                                </div>
                                
                                <div className='flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='text-blue-600 text-xl'><GitBranchIcon /></div>
                                    <div>
                                        <h3 className='font-semibold text-gray-800'>Analyze with URL</h3>
                                        <p className='text-gray-600'>Analyze the git repos using the git url adress</p>
                                    </div>
                                </div>
                                
                                <div className='flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='text-red-600 text-xl'><File /></div>
                                    <div>
                                        <h3 className='font-semibold text-gray-800'>INDEXING OF FILES</h3>
                                        <p className='text-gray-600'>Files of repo can be index via features</p>
                                    </div>
                                </div>
                                
                                <div className='flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                                    <div className='text-blue-600 text-xl'><ExternalLink /></div>
                                    <div>
                                        <h3 className='font-semibold text-gray-800'>Power of Chrome extension</h3>
                                        <p className='text-gray-600'>User can experience using chrome extension also</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Login Section */}
                <div className='flex flex-col justify-center items-center p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50'>
                    <div className='max-w-md w-full space-y-8'>
                        <div className='flex justify-center mb-8'>
                            <div className='relative'>
                                <div className='absolute inset-0 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse'></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&h=400&q=80"
                                    alt="Coding workspace"
                                    className='relative rounded-2xl shadow-2xl w-64 h-64 object-cover'
                                />
                            </div>
                        </div>
                        <div className='text-center space-y-4'>
                            <h2 className='text-3xl font-bold text-gray-800'>
                                Enhance Your Analyzing
                            </h2>
                            <p className='text-gray-600'>
                                Sign in to access your code-based to analyze git repositories
                            </p>
                        </div>

                        {/* GitHub Login Button */}
                        <button
                            onClick={handleGithubLogin}
                            className='w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg'
                        >
                            <GitBranch size={24} />
                            <span className='font-semibold'>Continue with GitHub</span>
                        </button>

                        {/* Additional Info */}
                        <div className='text-center text-sm text-gray-500 mt-6'>
                            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthComp