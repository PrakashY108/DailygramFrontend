import * as Yup from 'yup'

// for validation
const EmailSchema = Yup.object().shape({
    name: Yup.string().email().required("This field is mandatory"),
    password: Yup.number().required("This field is mandatory").min(6, "Password must contain 6 character").max(16, "Must be less than 16 characters"),
})
export default EmailSchema;