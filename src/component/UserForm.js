import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ values, errors, touched, isSubmitting, status }) {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        // status sometimes comes through as undefined
        if (status) {
            setUserInfo([...userInfo, status])
        }
    }, [status]);



    return (
        <div>
            <Form>
                <div>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field type="name" name="name" placeholder="Name" />
                </div>

                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="email" name="email" placeholder="Email" />
                </div>

                <Field component="select" className="role-select" name="role">
                    <option>Please Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </Field>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password" />
                </div>
                <label>
                    {touched.tos && errors.tos && <p>{errors.tos}</p>}
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    Accept TOS
            </label> {<br />}

                <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>

            <div>
                {userInfo.map((user, index) => (
                    <div key={index}>
                        <h2>User Information</h2>
                        <h4>Name: {user.name}</h4>
                        <h4>Email: {user.email}</h4>
                        <h4>Role: {user.role}</h4>

                    </div>
                ))}
            </div>
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, role, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            role: role || "",
            password: password || "",
            tos: tos || false,

        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required(),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required"),
        tos: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        console.log(values);
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res); // Data was created successfully and logs to console
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
                setSubmitting(false);
            });
        //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    }
})(UserForm);

export default FormikLoginForm;