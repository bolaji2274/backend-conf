import React from 'react'
import { motion } from 'framer-motion';
import teamImage from '../assets/tabs/2.png'
const Team = () => {
  return (
    <div>

       {/* Team Section */}
            <section className="py-16 px-8 bg-gray-100 text-center">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
                <motion.div className="flex flex-col md:flex-row justify-center gap-8 mt-8 max-w-4xl mx-auto">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                        <img src={teamImage} alt="Team Member" className="rounded-full h-32 w-32 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-700">Bala Rasheed</h3>
                        <p className="text-gray-600">CEO & Founder</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-lg shadow-lg">
                        <img src={teamImage} alt="Team Member" className="rounded-full h-32 w-32 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-700">Bala Rasheed</h3>
                        <p className="text-gray-600">Agriculture Specialist</p>
                    </motion.div>
                </motion.div>
            </section>
    </div>
  )
}

export default Team