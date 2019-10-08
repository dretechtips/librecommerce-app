import React, { Component } from 'react'
import { LoginProps, LoginState } from '../../interface/routes/User.interface'

export class Login extends Component<LoginProps, LoginState> {
  render() {
    return(
      <div>
        <section className="m-5 p-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="card px-5 py-3">
                  <div className="card-body text-center">
                    <img width="128" src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.onlinelabels.com%2Fimages%2Fclip-art%2Fmicrougly%2FTiger%2520Face-176055.png&f=1&nofb=1" alt="Logo" className="mb-3"/>
                    <h4>Admin Login</h4>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Username"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-key"></i>
                          </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Password"/>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name="keepLogin"/>
                        <label htmlFor="keepLogin" className="custom-control-label">Keep Me Login</label>
                      </div>
                      <a href="#">Forgot Password</a>
                    </div>
                    <p className="small text-secondary">By clicking the login button you are accepting Ruff Tiger Admin Policies and Terms of Use</p>
                    <input value="Sign In" type="submit" className="btn btn-primary btn-block mt-3" onClick={() => this.props.login()}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Login
