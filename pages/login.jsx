import React from 'react'

function Login() {
  return (
    <div className='container min-h-screen min-w-full flex justify-center text-center bg-cover bg-no-repeat' style={{backgroundImage: "url(https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)"}}>
      <div className='container min-h-screen min-w-full flex justify-center text-center bg-[#f0f0f0] bg-opacity-30'>
        <div className='w-[600px] h-[600px] bg-white bg-opacity-50 backdrop-blur-[10px] my-auto flex justify-center items-center'>
          <div>
            <h1 className='font-bold text-[44px] text-primary'>Login</h1>

            <form className="mt-8 w-[528px] mx-auto space-y-6" action="#" method="POST">
              <div>
                <label for="email-address" className="sr-only">Email</label>
                <input id="email-address" name="email" type="email" autocomplete="off" required className="h-[50px] bg-transparent appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black text-[18px] rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Email" />
              </div>

              <div>
                <label for="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="off" required className="h-[50px] bg-transparent appearance-none relative block w-full px-3 py-2 border-2 border-primary placeholder-gray-700 text-black text-[18px] rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Password" />
              </div>

              <div className='flex justify-center'>
                <button type="submit" className="w-[250px] h-[50px] mt-10 text-center text-[18px] items-center group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-transparent hover:border-primary hover:border-2 hover:text-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Sign in
                </button>
              </div>

              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login