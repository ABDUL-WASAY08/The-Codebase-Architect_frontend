import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { Code2, ExternalLink, File, GitBranch, GitBranchIcon, GitBranchPlus } from 'lucide-react'
import React from 'react'
import { auth, provider } from '../api/firebaseSetup.js'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../Store/userStore.js'

function AuthComp() {
    const { login } = useUserStore();
    const navigate = useNavigate();
    const handleGithubLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const credentials = GithubAuthProvider.credentialFromResult(response);
            const token = credentials.accessToken;

            const payload = {
                gitToken: token,
                user: {
                    id: response.user.uid,
                    name: response.user.displayName,
                    email: response.user.email,
                    img: response.user.photoURL
                }
            }
            const res = await login(payload);
            if (res && res.success) {
                toast.success('Login successful!');
                navigate('/DashBoard');
            } else {
                toast.error('Backend authorization failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('GitHub login failed');
        }
    }
    const handleScroll=()=>{
       const element= document.getElementById('startbtn')
        if(element){
            element.scrollIntoView({behavior:'smooth'})
        }

    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='grid lg:grid-cols-2 min-h-screen'>
                {/* Left Column - Features Section */}
                <div className='flex flex-col justify-center items-center p-8 md:p-12'>
                    <div className='flex flex-col items-center gap-8 max-w-2xl'>
                        <div className='flex flex-col gap-5 items-center '>
                            <div className='flex items-center gap-4'>
                                <Code2 size={150} className='text-blue-600' />
                                <h1 className='text-4xl  md:text-5xl font-bold text-blue-800 text-center'>
                                    CODE BASED ARCHITECTURE
                                </h1>
                            </div>
                            <button className='bg-blue-600 text-white px-4 py-3 rounded rounded-2xl w-full'
                            onClick={handleScroll}
                            >
                                GetStarted
                            </button>

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
                            id='startbtn'
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
            
            {/* Detailed Features Section */}
            <div className='bg-white py-16 px-4 md:px-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                            Powerful Features for Code Analysis
                        </h2>
                        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                            Discover how our platform helps you analyze and understand your code repositories better
                        </p>
                    </div>
                    
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        <div className='bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <div className='text-red-600 mb-4'>
                                <GitBranchPlus size={40} />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-800 mb-2'>Repository Analysis</h3>
                            <p className='text-gray-600'>
                                Deep dive into your Git repositories with professional code analysis tools. Get insights about code quality, structure, and potential improvements.
                            </p>
                        </div>
                        
                        <div className='bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <div className='text-blue-600 mb-4'>
                                <GitBranchIcon size={40} />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-800 mb-2'>URL-Based Analysis</h3>
                            <p className='text-gray-600'>
                                Simply paste any Git repository URL and get instant analysis. No need to clone repositories locally - we handle everything for you.
                            </p>
                        </div>
                        
                        <div className='bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <div className='text-red-600 mb-4'>
                                <File size={40} />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-800 mb-2'>File Indexing</h3>
                            <p className='text-gray-600'>
                                Advanced file indexing system that organizes and categorizes your repository files for quick access and comprehensive analysis.
                            </p>
                        </div>
                        
                        <div className='bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <div className='text-blue-600 mb-4'>
                                <ExternalLink size={40} />
                            </div>
                            <h3 className='text-xl font-semibold text-gray-800 mb-2'>Chrome Extension</h3>
                            <p className='text-gray-600'>
                                Seamless integration with our Chrome extension. Analyze GitHub repositories directly from your browser with one click.
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AuthComp