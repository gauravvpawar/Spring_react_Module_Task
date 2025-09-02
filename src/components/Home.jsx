import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Home() {
  return (
    <>
        <Navbar/>

        <section class="bg-white rounded-xl shadow-md p-6 mb-8">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-blue-700 mb-4">Employee Management System</h1>
                <p class="text-gray-600 text-lg mb-6">Streamline your work activities, track attendance, and manage tasks efficiently</p>
                <div class="flex justify-center space-x-4">
                    <button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                       <a href='/signup'>Punch In</a> 
                    </button>
                    <button class="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition duration-300">
                         <a href='/signup'>Punch Out</a>
                    </button>
                </div>
            </div>
        </section>



        <section id="tasks" class="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold mb-6">Task Management</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-xl font-semibold mb-4">Current Tasks</h3>
                    <ul class="space-y-4">
                        <li class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 class="font-medium">Update website content</h4>
                            <p class="text-sm text-gray-600">Due: 2023-07-20</p>
                        </li>
                        <li class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                            <h4 class="font-medium">Prepare monthly report</h4>
                            <p class="text-sm text-gray-600">Due: 2023-07-18</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">Completed Tasks</h3>
                    <ul class="space-y-4">
                        <li class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 class="font-medium">Fix login issue</h4>
                            <p class="text-sm text-gray-600">Completed: 2023-07-15</p>
                        </li>
                        <li class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 class="font-medium">Team meeting</h4>
                            <p class="text-sm text-gray-600">Completed: 2023-07-14</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
  
    <Footer/>
   
    </>
  )
}

export default Home
