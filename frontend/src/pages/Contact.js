// // import React from 'react'
// // // import Header from '../views/Header'
// // import naslogo from '../assets/images/nasfarm-logo.jpg'
// // function Contact() {
// //   return (
// //     <div>
// //       <>
// //       {/* <Header/> */}
// //   {/* contact section */}
// //   <section className="contact_section ">
// //     <div className="container-fluid">
// //       <div className="row">
// //         <div className="col-md-6 px-0">
// //           <div className="img-box">
// //             <img
// //               src={naslogo}
// //               className="box_img"
// //               alt="about img"
// //             />
// //           </div>
// //         </div>
// //         <div className="col-md-5 mx-auto">
// //           <div className="form_container">
// //             <div className="heading_container heading_center">
// //               <h2>Get In Touch</h2>
// //             </div>
// //             <form action="">
// //               <div className="form-row">
// //                 <div className="form-group col">
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     placeholder="Your Name"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group col-lg-6">
// //                   <input
// //                     type="text"
// //                     className="form-control"
// //                     placeholder="Phone Number"
// //                   />
// //                 </div>
// //                 <div className="form-group col-lg-6">
// //                   <select name="" id="" className="form-control wide">
// //                     <option value="">Select Service</option>
// //                     <option value="">Partnership</option>
// //                     <option value="">Customer Application</option>
// //                     <option value="">Rendering Support</option>
// //                   </select>
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group col">
// //                   <input
// //                     type="email"
// //                     className="form-control"
// //                     placeholder="Email"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="form-row">
// //                 <div className="form-group col">
// //                   <input
// //                     type="text"
// //                     className="message-box form-control"
// //                     placeholder="Message"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="btn_box">
// //                 <button>SEND</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </section>
// //   {/* end contact section */}
// // </>

// //     </div>
// //   )
// // }

// // export default Contact



import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import naslogo from '../assets/images/nasfarm-logo.jpg';
import broiler from '../assets/nasImages/broilers_bg.jpg'

const swal = require('sweetalert2')

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api-bkrt.onrender.com/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // alert('Message sent successfully!');
        swal.fire({
                    title: "Your message has been sent successfully, You will soon get a feed back from us",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
        setFormData({ name: '', phone: '', service: '', email: '', message: '' });
      } else {
        // alert('Failed to send message. Please try again.');
        swal.fire({
                    title: "Failed to send message. Please try again.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      swal.fire({
                    title: "An error occurred. Please try again.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={broiler} className="rounded-lg shadow-md" alt="NasFarm Logo" />
          </motion.div>
          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-600">Get In Touch</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <select
                  name="service"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Customer Application">Customer Application</option>
                  <option value="Rendering Support">Rendering Support</option>
                </select>
              </div>
              <div>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <textarea
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                SEND
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;


