import * as yup from 'yup'

// for creating account
export const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),

    phoneNo: yup.number().required('Phone number is required').min(5,"Should be atleast 5 characters").typeError("It must be a number"),
    DOB: yup.number().required('Date of birth is required').typeError("YYYY/MM/DD"),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

