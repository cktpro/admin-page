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
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required!"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await axiosAdmin.post("auth/login", values);
        // console.log("««««« result »»»»»", result);
        message.success("Login thành công");
      } catch (error) {
        message.error("Login thất bại");
        // console.log("«««««  error »»»»»", error);
      }
    },
  });

//   const input = document.querySelector(".input");
//   const eyeOpen = document.querySelector(".eye-open");
//   const eyeClose = document.querySelector(".eye-close");

//   eyeOpen.addEventListener("click", function () {
//   eyeOpen.classList.add("hidden");
//   eyeClose.classList.remove("hidden");
//   input.setAttribute("type" , "password");
// });

// eyeClose.addEventListener("click", function(){
//   eyeOpen.classList.remove("hidden");
//   eyeClose.classList.add("hidden");
//   input.setAttribute("type", "text");
// });


  return (
    <div class="wrapper">
      <form
        class="form-signin"
        onSubmit={(e) => {
          e.preventDefault();
          loginValidate.submitForm();
        }}
      >
        <h2 class="form-signin-heading">Please login</h2>
        <input
          type="text"
          class="form-control"
          name="email"
          placeholder="Email address"
          required=""
          autofocus=""
          value={loginValidate.values.email}
          onChange={loginValidate.handleChange}
        />
        {loginValidate.errors.email && loginValidate.touched.email && (
          <p className="text-danger my-2">{loginValidate.errors.email}</p>
        )}
       <br/>
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          required=""
          value={loginValidate.values.password}
          onChange={loginValidate.handleChange}
          
        />

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="eye eye-close"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="eye eye-open"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg> */}

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
