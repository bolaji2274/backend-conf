// import React from 'react'
// // import Header from '../views/Header'
// import naslogo from '../assets/images/nasfarm-logo.jpg'
// function Contact() {
//   return (
//     <div>
//       <>
//       {/* <Header/> */}
//   {/* contact section */}
//   <section className="contact_section ">
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-6 px-0">
//           <div className="img-box">
//             <img
//               src={naslogo}
//               className="box_img"
//               alt="about img"
//             />
//           </div>
//         </div>
//         <div className="col-md-5 mx-auto">
//           <div className="form_container">
//             <div className="heading_container heading_center">
//               <h2>Get In Touch</h2>
//             </div>
//             <form action="">
//               <div className="form-row">
//                 <div className="form-group col">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Your Name"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col-lg-6">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Phone Number"
//                   />
//                 </div>
//                 <div className="form-group col-lg-6">
//                   <select name="" id="" className="form-control wide">
//                     <option value="">Select Service</option>
//                     <option value="">Partnership</option>
//                     <option value="">Customer Application</option>
//                     <option value="">Rendering Support</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email"
//                   />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group col">
//                   <input
//                     type="text"
//                     className="message-box form-control"
//                     placeholder="Message"
//                   />
//                 </div>
//               </div>
//               <div className="btn_box">
//                 <button>SEND</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* end contact section */}
// </>

//     </div>
//   )
// }

// export default Contact

import React, { useState } from 'react';
import naslogo from '../assets/images/nasfarm-logo.jpg';

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
        alert('Message sent successfully!');
        setFormData({ name: '', phone: '', service: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <section className="contact_section">
        <div className="container-fluid layout_padding">
          <div className="row">
            <div className="col-md-6 px-0">
              <div className="img-box">
                <img src={naslogo} className="box_img" alt="about img" />
              </div>
            </div>
            <div className="col-md-5 mx-auto">
              <div className="form_container">
                <div className="heading_container heading_center">
                  <h2>Get In Touch</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <select
                        name="service"
                        className="form-control wide"
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
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <input
                        type="text"
                        className="message-box form-control"
                        placeholder="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="btn_box">
                    <button type="submit">SEND</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;

