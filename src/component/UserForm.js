import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ values, errors, touched, isSubmitting }) {

    const [userInfo, setUserInfo] = useState({ name: "", email: "" });

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
                        <h3>Name: {user.name}</h3>
                        <h3>email: {user.email}</h3>

                    </div>
                ))}
            </div>
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
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
    handleSubmit(values, { resetForm, setSubmitting }) {
        console.log(values);
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res); // Data was created successfully and logs to console
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