import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);

      // const userId = mutationResponse.data.login.user._id;
      // Auth.user(userId);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="mb-3 w-25">
          <Link className="navbar-brand mb-3" to="/signup">
            ← Go to Signup
          </Link>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <h2 className=" label-text">Login</h2>
            </div>

            <div className="mb-3">
              <label for="email" className="form-label label-text">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                placeholder="name@example.com"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label label-text">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                placeholder="*******"
              />
            </div>
            {error ? (
              <div>
                <p className="text-danger">
                  The provided credentials are incorrect.
                </p>
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
