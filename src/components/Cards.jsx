import React from 'react'

function Cards() {
  return (
       <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-md p-6 flex items-center">
                <div class="bg-blue-100 p-4 rounded-full mr-4">
                    <i class="fas fa-clock text-blue-600 text-2xl"></i>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Attendance</h3>
                    <p class="text-gray-600">Track your working hours</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 flex items-center">
                <div class="bg-green-100 p-4 rounded-full mr-4">
                    <i class="fas fa-tasks text-green-600 text-2xl"></i>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Tasks</h3>
                    <p class="text-gray-600">Manage your daily tasks</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 flex items-center">
                <div class="bg-purple-100 p-4 rounded-full mr-4">
                    <i class="fas fa-user-circle text-purple-600 text-2xl"></i>
                </div>
                <div>
                    <h3 class="text-lg font-semibold">Profile</h3>
                    <p class="text-gray-600">Update your information</p>
                </div>
            </div>
        </section>

  )
}

export default Cards
