import React, { useContext, useEffect } from "react";
import InputLogin from "./InputLogin";
import { Formik , Form as Formtest} from "formik";
import * as Yup from 'yup';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const initialValues = {
  manager_email: "",
  manager_password: "",
};

function Form() {

 const { login , isAuth , isLoading } = useContext(AuthContext);

 const navigate = useNavigate();

 const objectSchema = Yup.object({
  manager_email:Yup.string().email("email must be valid email").required("Manager Email is Required"),
  manager_password:Yup.string().min(4,"password must be at least 4 digits").max(12,"password cant be greater than 12 digits").required("Manager password is Required"),
 })

 
 useEffect(() => {
   if(isAuth){
    navigate("/dashboard")
   }
 },[isAuth])


  return (
    <div className="w-full max-w-xs dark:bg-gray-700 rounded-lg">
      <Formik
      initialValues={initialValues}
      validationSchema={objectSchema}
        onSubmit={async(values,action) => {
          const auth = await login(values);
          auth && action.resetForm();
       }}
      >
        <Formtest
          className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
                <h1 className="dark:text-white text-center text-xl font-semibold">Login Form</h1>
          <InputLogin
            label="email"
            type="email"
            name="manager_email"
            placeHolder="Enter email..."
            // value={values.user_email}
          />
          <InputLogin
            label="Password"
            type="password"
            name="manager_password"
            placeHolder="******************"
            // value={values.user_password}
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            {isLoading ?  'inProccess...' :'Sign In'} 
            </button>
            <span
              className="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              forgot password?
            </span>
          </div>
        </Formtest>
      </Formik>
      <div className="flex justify-center items-center">
      <p className="text-center text-gray-500 p-2 text-xs mb-2 dark:text-white">
        &copy;2020 Acme Corp. All rights reserved To Eyal Yehia.
      </p>
      </div>
    </div>
  );
}

export default Form;

{
  /* <p className="text-red-500 text-xs italic">Please choose a password.</p> */
}
