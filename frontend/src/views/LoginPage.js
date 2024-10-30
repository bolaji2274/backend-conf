import React, { useContext } from 'react'
// import Navbar from './Navbar'
// import Header from './Header'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/login.css'
import chicken from '../assets/images/chicken-8.jpg'
import bg_img from '../assets/images/turkey-3.jpg'
// import Nav from '../pages/Nav.js'

function LoginPage() {
  const {loginUser, errors, clearErrors } = useContext(AuthContext)
  const handleSubmit = e => {
    e.preventDefault()
    clearErrors();
    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)
    console.log(email)
    console.log(password)
  }
  return (
    <div>
<>
<Nav/>

  <section className="vh-70 bg-img">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem"}}>
            <div className="row g-0">
              {/* <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div> */}

              
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i
                        className="fas fa-cubes fa-2x me-3"
                        style={{ color: "#ff6219" }}
                      />
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        />
                        <span className="h2 fw-bold mb-0">Welcome back 👋</span>
                      </div>
                    </div>
                    <h3
                      className="fw-normal mb-3 pb-3 sign-into"
                      style={{ letterSpacing: 1 }}
                    >
                      Login into your Account
                    </h3>
                    <div className="form-outline mb-4">
                      <label className="form-label mail" htmlFor="form2Example17">
                        Email
                      </label>
                      <input
                        type="email"
                        id="form2Example17"
                        className="form-control form-control-lg"
                        name='email'
                      />
                      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} {/* Show email error */}
                    </div>
                    <div className="form-outline mb-4 pass">
                      <label className="form-label" htmlFor="form2Example27">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        name='password'
                      />
                      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>} {/* Show password error */}
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block submit-button submit-btn"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <a className="small text-muted" href="#!">
                      Forgot password?
                    </a>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Don't have an account?{" "}
                      <Link to="/register" href="#!" style={{ color: "#393f81", marginLeft: "10px" }}>
                        Register Now
                      </Link>
                    </p>
                    <a href="#!" className="small text-muted">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="bg-light text-center text-lg-start">
    {/* Copyright */}
    <div
      className="text-center p-3"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      © 2019 - till date Copyright:
      <a className="text-dark" href="https://github.com/bolaji2274/">
        @ Bolaji Dev
      </a>
    </div>
    {/* Copyright */}
  </footer>
</>

    </div>
  )
}

export default LoginPage
