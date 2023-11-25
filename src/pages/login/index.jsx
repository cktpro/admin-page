import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { LOCATIONS } from "constants/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosAdmin } from "helper/axiosAdmin/axiosAdmin";
import { message } from "antd";
function Login() {
  const loginValidate = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required!"),}),
    onSubmit:async (values)=>{
      try {
        const result = await axiosAdmin.post("auth/login",values)
      console.log('««««« result »»»»»', result);
      message.success("Login thành công")
      } catch (error) {
        message.error("Login thất bại")
        console.log('«««««  error »»»»»',  error);
      }

    }
  });

  return (
    <div class="wrapper">
      <form class="form-signin" onSubmit={(e)=>{
        e.preventDefault()
        loginValidate.submitForm()
      }}>
        <h2 class="form-signin-heading">Please login</h2>
        <input
          type="text"
          class="form-control"
          name="email"
          placeholder="Email Address"
          required=""
          autofocus=""
          value={loginValidate.values.email}
          onChange={loginValidate.handleChange} 
        />
        {loginValidate.errors.email && loginValidate.touched.email && (
            <p className="text-danger my-2">{loginValidate.errors.email}</p>
          )}
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          required=""
          value={loginValidate.values.password}
          onChange={loginValidate.handleChange} 
        />
        {loginValidate.errors.password && loginValidate.touched.password && (
            <p className="text-danger my-2">{loginValidate.errors.password}</p>
          )}
        <label class="checkbox">
          <input
            type="checkbox"
            value="remember-me"
            id="rememberMe"
            name="rememberMe"
          />{" "}
          Remember me
        </label>

        <button class="btn btn-lg btn-primary btn-block" type="submit">
           Login
        </button>

        <div class="cancel">
          <button type="button" class="cancelbtn">
            Cancel
          </button>
          <span class="psw">
            Forgot <Link href="#">password?</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
