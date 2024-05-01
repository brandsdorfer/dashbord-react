import { Field, useField , ErrorMessage } from 'formik'
import { FcCheckmark } from "react-icons/fc";
import React from 'react'

function InputLogin({...props}) {

 const { label , name } = props;

  const [field , meta ] = useField(name);

  return (
    <div className="mb-4" aria-invalid={meta.touched && meta.error}>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className='relative'>
      <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      {...field}
      {...props} 
      // value={value}
      />
      {
        meta.value && !meta.error && <FcCheckmark className='absolute top-2.5 right-2'/>
      }
      </div>
      <ErrorMessage className='text-red-600 text-sm' name={name} component="div" />
     </div>
  )
}

export default InputLogin