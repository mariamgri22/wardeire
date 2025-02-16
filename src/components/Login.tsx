import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "@/lib/hook";
import { loginAsync, loginSuccess } from "@/lib/redux/authSlice";


interface LoginProps {
  onLoginSuccess:  () => void;
}
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response : any= await dispatch(
          loginAsync({ email: values.email, password: values.password })
        );
    
        if (response?.error?.message?.includes("401")) {
          setError("Invalid email or password");
          return;
        }
    
        dispatch(loginSuccess({ email: values.email }));
    
        await Promise.resolve(onLoginSuccess());
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });

  return (
    <div>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
            <div className="text-red-900">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-900">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit" className="w-full p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition">Login</button>
        {error && <div className="text-red-900">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
