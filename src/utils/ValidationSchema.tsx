import * as yup from 'yup'

// for creating account
 export const validationSchemaCreateAcc = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNo: yup.number().required('Phone number is required').min(10,"Should be atleast 10 characters").typeError("It must be a number of 10 digits"),
    DOB: yup.string().required('Date of birth is required'),//.matches(/^\d{4}\/\d{2}\/\d{2}$/, 'Date of birth must be in YYYY/MM/DD format'),//
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6,"Password must be 6 charcters"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match')  // updated by vikash ( removed null and added "")
});

 export const validationSchemaLoginacc = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6,"Password must be 6 charcters"),
})

export const validationSchemaEditprofile = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    DOB: yup.string().required('Date of birth is required').matches(/^\d{4}\/\d{2}\/\d{2}$/, 'Date of birth must be in YYYY/MM/DD format'),
    username: yup.string().required('Username is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match') // updated by vikash ( removed null and added "")
  });
export const validationSchemaUpload = yup.object().shape({
    Title: yup.string().required('Title is required').min(5,"Title length must be 5 characters").max(50,"Title length should not exceed 50 characters"),
    Description: yup.string().required('Description is required').min(10,"Title length must be 10 characters").max(200,"Title length should not exceed 200 characters"),
  });
