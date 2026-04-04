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

          <div className='bg-blue-700 inline text-white p-2 rounded flex flex-col sm:flex-row gap-4 justify-center mb-12'>
            <a
              href="./extension/Code_based_Extension.zip"
              download="codebase-architect.zip"
              className="..."
            >
              Download Extension
            </a>
          </div>
          <div className='mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 max-w-lg mx-auto'>
            <h4 className='text-gray-900 dark:text-white font-bold mb-3'>Installation Steps:</h4>
            <ol className='text-left text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal ml-4'>
              <li>Download Zip folder By Clicking above button <b>Extract files</b> from it</li>
              <li>
                Open Chrome Browser and paste
                <code className='bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded mx-1 text-blue-600'>
                  chrome://extensions/
                </code>
                in the address bar.
              </li>
              <li>On Top-right click <b>Developer Mode</b> to on Developer Mode</li>
              <li><b>clcik on Load Unpacked on top left usually </b>a pop appears and select the extracted folder name my-extension inside the Code Based extension </li>
               <li className='text-red-800'>you must add folder name <b className='text-black dark:text-white'>my-extension in side the code based extension</b></li>
              <li>Now go check your<b>Github</b></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChromeExtension