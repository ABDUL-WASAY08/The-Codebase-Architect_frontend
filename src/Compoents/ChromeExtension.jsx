import React from 'react'
function ChromeExtension() {
  return (
    <div className='bg-white dark:bg-black min-h-screen'>
      <div className='min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-4xl mx-auto'>
          <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
            Boost productivity, save time, and unlock powerful features with our Chrome extension. Used by 10,000+ happy users.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-1'>Lightning Fast</h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Optimized for speed and performance</p>
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-1'>Privacy First</h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Your data never leaves your device</p>
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-1'>Auto Updates</h3>
              <p className='text-sm text-gray-600 dark:text-gray-400'>Always get the latest features</p>
            </div>
          </div>
        
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
            <button 
              className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
            >
               Add to Chrome
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChromeExtension