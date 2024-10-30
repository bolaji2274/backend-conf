import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext.js';
import Nav from '../../pages/Nav.js';
import '../../styles/register.css'
import Loading from '../../context/Loading.jsx';

function RegisterPage() {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [farm_branch_name, setFarmBranchName] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [loading, setLoading] = useState(false);

  const { registerUser, errors, clearErrors } = useContext(AuthContext)

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    clearErrors();  // Clear errors before attempting a new registration
    registerUser(first_name, last_name, farm_branch_name, email, phone_number, password, password2)
  }

  return (
    <div>
      <Nav />
      <section className="vh-70 bg-img">
        <div className="container py-5 h-100 d-flex justify-content-center align-items-center">
          <div className="card register-card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-12 d-flex align-items-center">
                <div className="card-body p-4 text-black">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }} />
                      <span className="h2 fw-bold mb-0">Welcome to <b>Nasfarm 👋</b></span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Sign Up</h5>
                    <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
                      {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
                      {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name}</p>}
                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" className="form-control form-control-lg" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" placeholder="Address" onChange={e => setFarmBranchName(e.target.value)} />
                      {errors.farm_branch_name && <p style={{ color: 'red' }}>{errors.farm_branch_name}</p>}
                    </div>
                    <div className="form-outline mb-4">
                      <input type="number" className="form-control form-control-lg" placeholder="Phone Number" onChange={e => setPhoneNumber(e.target.value)} />
                      {errors.phone_number && <p style={{ color: 'red' }}>{errors.phone_number}</p>}
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)} />
                      {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
                    </div>
                     {loading && <Loading/>}
                    <div className="pt-1 mb-4">
                      <button className="btn btn-dark btn-lg btn-block" type="submit">Register</button>
                    </div>
                    <p className="small text-muted mb-5">
                      Already have an account? <Link to="/login" style={{ color: "#393f81", marginLeft: "10px" }}>Sign in here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            © 2024 - till date Copyright:
            <a className="text-dark" href="https://github.com/bolaji2274/">
              @ Bolaji Dev
            </a>
          </div>
        </footer>
    </div>
  )
}

export default RegisterPage
