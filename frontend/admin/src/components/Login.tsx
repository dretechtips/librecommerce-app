import React from "react";
import { LoginUIProps } from "../interface/Login.interface";
import Alert from "../components/Alert";

export default (props: LoginUIProps) => {
  const rUsername = React.createRef<HTMLInputElement>();
  const rPassword = React.createRef<HTMLInputElement>();
  function login() {
    if (!rUsername.current || !rPassword.current) {
      props.login("", "");
    } else {
      props.login(rUsername.current.value, rPassword.current.value);
    }
  }
  return (
    <div>
      <section className="m-md-5 p-md-5 p-">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card px-5 py-3">
                <div className="card-body text-center">
                  <img
                    width="128"
                    src={props.logoURL}
                    alt="Logo"
                    className="mb-3"
                  />
                  {props.failed ? (
                    <Alert
                      theme="danger"
                      message="Your username or password is incorrect!"
                      dismissable={false}
                    ></Alert>
                  ) : (
                    ""
                  )}
                  <h4>Login</h4>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        ref={rUsername}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        ref={rPassword}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="keepLogin"
                      />
                      <label
                        htmlFor="keepLogin"
                        className="custom-control-label"
                      >
                        Keep Me Login
                      </label>
                    </div>
                    <a href="#">Forgot Password</a>
                  </div>
                  <p className="small text-secondary">
                    By clicking the login button you are accepting our Policies
                    and Terms of Use
                  </p>
                  <input
                    value="Sign In"
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                    onClick={() => login()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
