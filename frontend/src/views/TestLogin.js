import React from 'react'
import './TestLogin.css'

function TestLogin() {
  return (
    <div>
      <section className="login-section py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4">Login</h2>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <a href="#">Forgot your password?</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default TestLogin
