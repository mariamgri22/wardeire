import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "@/lib/hook";
import {  registerAsync, registerSuccess } from "@/lib/redux/authSlice";


interface RegisterProps {
  onRegisterSuccess: () => void;
}
const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      repeatPassword: yup
        .string()
        .required("Repeat Password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(registerAsync({
          username: values.username,
          email: values.email,
          password: values.password,
        }));

        dispatch(
          registerSuccess({ username: values.username, email: values.email })
        );

        onRegisterSuccess();
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  return (
    <div>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.username && formik.errors.username && (
            <div>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Repeat Password"
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <div>{formik.errors.repeatPassword}</div>
          )}
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">Register</button>
      
      </form>
    </div>
  );
};

export default Register;
