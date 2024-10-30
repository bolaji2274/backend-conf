import React from 'react'
// import Header from '../views/Header'
import naslogo from '../assets/images/nasfarm-logo.jpg'
function Contact() {
  return (
    <div>
      <>
      {/* <Header/> */}
  {/* contact section */}
  <section className="contact_section ">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 px-0">
          <div className="img-box">
            <img
              src={naslogo}
              className="box_img"
              alt="about img"
            />
          </div>
        </div>
        <div className="col-md-5 mx-auto">
          <div className="form_container">
            <div className="heading_container heading_center">
              <h2>Get In Touch</h2>
            </div>
            <form action="">
              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group col-lg-6">
                  <select name="" id="" className="form-control wide">
                    <option value="">Select Service</option>
                    <option value="">Partnership</option>
                    <option value="">Customer Application</option>
                    <option value="">Rendering Support</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <input
                    type="text"
                    className="message-box form-control"
                    placeholder="Message"
                  />
                </div>
              </div>
              <div className="btn_box">
                <button>SEND</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* end contact section */}
</>

    </div>
  )
}

export default Contact
