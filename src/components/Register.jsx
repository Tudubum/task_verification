import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"


const Register = () => {

    const RegisterSchema = Yup.object().shape({
        userName: Yup.string()
            .required('This field must be filled.'),
        email: Yup.string()
            .email('This input must be a valid email.')
            .required('This field must be filled.'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 symbols length.')
            .required('This field must be filled.'),
          passwordRepeat: Yup.mixed()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .required('This field must be filled.'),
          avatar: Yup.string()
            .url('Invalid URL')
            .required('This field must be filled.'),
      });

      const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        avatar: ''
      });

      //const [invalidUsername, setInvalidUsername] = useState(false);

      const { users, addNewUser, setLoggedInUser } = useContext(UserContext);

      const navigation = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
        if(users.find(user => user.userName === values.userName)){
          setValues(true);
        } else {
          let newUser = {
            ...values,
            id: Date.now(),
            level: 'user',
            isBanned: false
          };
          addNewUser(newUser);
          setLoggedInUser(newUser);
          navigation('/');
        }
      }

    

  return (
    <>
    <Formik
      initialValues={values}
      validationSchema={RegisterSchema}
      
    >
        {({ errors, touched, values, setValues }) => (
          <Form className="forma"
          onSubmit={handleSubmit}
          >
            <div className="title">Welcome</div>
            <div className="subtitle">Let's create your account!</div>
            <div>
              <label>UserName:
                <Field 
                  name='userName'
                  value={values.userName} 
                  onChange={(e)=>setValues({...values, userName:e.target.value})}
                />
                {
                  errors.userName && touched.userName ? 
                    <span>{errors.userName}</span>
                    : null
                }
              </label>
            </div>
            <div>
              <label>Email:
                <Field 
                  name='email'
                  value={values.email} 
                  onChange={(e)=>setValues({...values, email:e.target.value})}
                />
                {
                  errors.email && touched.email ? 
                    <span>{errors.email}</span>
                    : null
                }
              </label>
            </div>
            <div>
              <label>Password:
                <Field name='password' 
                type="password"
                value={values.password} 
                onChange={(e)=>setValues({...values, password:e.target.value})}
                />
                {
                  errors.password && touched.password ? 
                    <span>{errors.password}</span>
                    : null
                }
              </label>
            </div>
            <div>
              <label>Password Repeat:
                <Field name='passwordRepeat' 
                  value={values.passwordRepeat} 
                  onChange={(e)=>setValues({...values, passwordRepeat:e.target.value})}
                />
                {
                  errors.passwordRepeat && touched.passwordRepeat ?
                    <span>{errors.passwordRepeat}</span>
                    : null
                }
              </label>
            </div>
            <div>
              <label>Profile image:
                <Field name='avatar'    
                type="url"
                value={values.avatar} 
                onChange={(e) => setValues({...values, avatar:e.target.value})}
                />
                {
                  errors.avatar && touched.avatar ?
                    <span>{errors.avatar}</span>
                    : null
                }
              </label>
            </div>
            <button className="submit" type="submit">Submit</button>
          </Form>
          
        )}
        
      </Formik>
    
    </>
  );
};

export default Register;