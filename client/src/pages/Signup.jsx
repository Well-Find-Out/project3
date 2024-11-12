import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        userName: formState.userName,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
          <Link className="navbar-brand mb-3" to="/login">
            ← Go to Login
          </Link>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <h2 className=" label-text">Signup</h2>
            </div>

            <div className="mb-3">
              <label for="firstName" className="form-label label-text">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                id="firstName"
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-3">
              <label for="lastName" className="form-label label-text">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                id="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-3">
              <label for="userName" className="form-label label-text">
                Username
              </label>
              <input
                name="userName"
                type="text"
                className="form-control"
                id="userName"
                onChange={handleChange}
                placeholder="Username"
                required
              />
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
                required
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
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
