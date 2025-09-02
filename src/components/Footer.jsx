import React from 'react'

function Footer() {
  return (

    <footer class="bg-blue-800 text-white py-8">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <h3 class="text-xl font-bold">Employee Portal</h3>
                    <p class="text-blue-200">Streamlining workplace efficiency</p>
                </div>
                <div>
                    <p>&copy; 2025 Employee Management System. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
