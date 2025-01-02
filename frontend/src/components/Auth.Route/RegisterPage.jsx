import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.js';
import Nav from '../Nav.jsx';
import '../../styles/register.css';
import Loading from '../../context/Loading.jsx';
import { Eye, EyeOff } from 'lucide-react'; // Lucide React Icons

function RegisterPage() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [farm_branch_name, setFarmBranchName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Show password toggle state
  // const [showPassword2, setShowPassword2] = useState(false); // Show confirm password toggle state

  const { registerUser, errors, clearErrors } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearErrors(); // Clear errors before attempting a new registration

    try {
      await registerUser(first_name, last_name, farm_branch_name, email, phone_number, password, password2);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false); // Stop loading whether registration succeeds or fails
    }
  };

  // Helper to format phone number with country code prefix
  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    if (phoneValue.startsWith('0')) {
      setPhoneNumber('234' + phoneValue.slice(1)); // Automatically replace starting '0' with '234'
    } else {
      setPhoneNumber('234' + phoneValue); // Append country code
    }
  };

  return (
    <div>
      <div className='h-full pb-4'><Nav /></div>
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
                      <label className="form-label" htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        id="first_name"
                        className="form-control form-control-lg"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        id="last_name"
                        className="form-control form-control-lg"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="farm_branch_name">Address</label>
                      <input
                        type="text"
                        id="farm_branch_name"
                        className="form-control form-control-lg"
                        onChange={(e) => setFarmBranchName(e.target.value)}
                      />
                      {errors.farm_branch_name && <p style={{ color: 'red' }}>{errors.farm_branch_name}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="phone_number">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">+234</span>
                        <input
                          type="text"
                          id="phone_number"
                          className="form-control form-control-lg"
                          onChange={handlePhoneChange}
                          value={phone_number.slice(3)} // Display without the '234' country code
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.phone_number && <p style={{ color: 'red' }}>{errors.phone_number}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            padding: "0.5rem",
                          }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="me-2" />
                          ) : (
                            <Eye size={20} className="me-2" />
                          )}
                        </button>
                      </div>
                      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password2">Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password2"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassword2(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            padding: "0.5rem",
                          }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} className="me-2" />
                          ) : (
                            <Eye size={20} className="me-2" />
                          )}
                        </button>
                      </div>
                      {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
                    </div>

                    <div className='d-flex justify-content-center mt-4 mb-4'>
                      {loading && <Loading />}
                    </div>

                    <div className="pt-1 mb-4 d-flex justify-content-center">
                      <button className="btn btn-dark btn-lg btn-block" type="submit">
                        Register
                      </button>
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
          <a className="text-dark" href="https://github.com/bolaji2274/">@ Bolaji Dev</a>
        </div>
      </footer>
    </div>
  );
}

export default RegisterPage;
