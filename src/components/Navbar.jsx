import React from 'react'

const Navbar = () => {
  return (
    <nav class="bg-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-users text-2xl"></i>
                    <span class="text-xl font-bold">Employee Portal</span>
                </div>
                <div class="hidden md:flex space-x-6">
                    <a href="/" class="hover:text-blue-200 transition duration-300">Home</a>
                    <a href="/about" class="hover:text-blue-200 transition duration-300">About</a>
                    
                </div>
                <div>
                    <button id="signupBtn" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition duration-300">
                        <a href="/signup " class="hover:text-blue-200 transition duration-300">SignUp</a>
                    </button>
                     <button id="signupBtn" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition duration-300">
                        <a href="/login " class="hover:text-blue-200 transition duration-300">Login</a>
                    </button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
