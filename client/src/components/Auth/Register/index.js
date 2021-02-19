import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuthentication from "../../../lib/hooks/useAuthentication";
import { useFormValidation } from "../../../lib/hooks/useFormValidation";
import * as Input from "../Input";

const Alert = ({ isVisible }) =>
  isVisible && (
    <div className="alert alert-info mt-3">
      <p className="icontext">
        <i className="icon text-primary fa fa-thumbs-up"></i>User successfully
        created
      </p>
    </div>
  );
const ErrorMessage = ({ isVisible, error }) =>
  isVisible && (
    <div className="alert alert-danger mt-3">
      <p className="icontext]" style={{ color: "crimson" }}>
        <i className="icon text-danger fas fa-exclamation-circle"></i>{" "}
        {error?.error}
      </p>
    </div>
  );

const defaultValues = {
  first: "Arnaud",
  last: "Adon",
  email: "adon@marketplace.com",
  gender: "Male",
  city: "city",
  password: "test12345",
  confirm_password: "test12345",
};
const options = [
  "Uzbekistan",
  "Russia",
  "United States",
  "India",
  "Afganistan",
];
const Register = ({ history }) => {
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const {
    formValues,
    register,
    validate,
    handleOnChange,
    isValid,
  } = useFormValidation({ formName: "register", defaultValues: defaultValues });

  const { handleUserRegistration } = useAuthentication();

  const { first, last, email, city, gender, password, confirm_password } =
    formValues["register"] ?? {};

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      first,
      last,
      email,
      city,
      gender,
      password,
      confirm_password,
    };
    handleUserRegistration(newUser).then((user) => {
      user && setTimeout(() => history.push("/"), 2000);
    });
  };

  React.useEffect(() => {
    register(defaultValues);
  }, []);

  React.useEffect(() => {
    validate(formValues["register"] ?? {});
  }, [formValues]);

  return (
    <>
      <div
        className="card mx-auto"
        style={{ maxWidth: "520px", marginTop: "140px" }}
      >
        <article className="card-body">
          <header className="mb-4">
            <h4 className="card-title">Sign up</h4>
          </header>
          <ErrorMessage isVisible={error} error={error} />
          <Alert isVisible={!!user} />
          <form name="register" onSubmit={handleOnSubmit}>
            <div className="form-row">
              <Input.Text
                label="First Name"
                name="first"
                onChange={handleOnChange}
                value={first}
              />
              <Input.Text
                label="Label Name"
                name="last"
                onChange={handleOnChange}
                value={last}
              />
            </div>
            <div className="form-group">
              <Input.Email
                label="Email"
                style={{ padding: 0 }}
                onChange={handleOnChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <Input.Radio
                name="gender"
                label="Male"
                onChange={handleOnChange}
                value={gender}
              />
              <Input.Radio
                name="gender"
                label="Female"
                onChange={handleOnChange}
                value={gender}
              />
            </div>
            <div className="form-row">
              <Input.Text
                name="city"
                label="City"
                onChange={handleOnChange}
                col="6"
                value={city}
              />
              <Input.Select
                name="country"
                options={options}
                label="Country"
                col="6"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-row">
              <Input.Password
                label="Create password"
                style={{ padding: 0 }}
                col="6"
                onChange={handleOnChange}
                value={password}
              />
              <Input.ConfirmPassword
                label="Repeat password"
                style={{ padding: 0 }}
                col="6"
                onChange={handleOnChange}
                value={confirm_password}
              />
            </div>
            <div className="form-group">
              <Input.Submit
                classNames="btn-primary btn-block"
                title="Register"
                disabled={!isValid}
              />
            </div>
          </form>
        </article>
      </div>
      <p className="text-center mt-4">
        Have an account? <Link to="/login">Log In</Link>
      </p>
      <br />
      <br />
      <br />
    </>
  );
};
export default Register;
