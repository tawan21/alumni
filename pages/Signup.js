import React from 'react'
import Navbar from './Navbar'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Signup() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Re-enter your password')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
  }

  return (
    <>
      <Navbar />
      <div className="d-flex p-5">
        <div className="mx-auto my-auto mt-3 card px-4 py-2">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-4">
              <div className="form-row">
                <div className="form-group col">
                  <label>Name</label>
                  <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label>Email</label>
                  <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label>Password</label>
                  <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label>Confirm Password</label>
                  <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
              </div>
              <div className="form-group d-flex justify-content-evenly">
                <button type="submit" className="btn btn-primary">Signup</button>
                <button type="button" onClick={() => reset()} className="btn btn-secondary">Clear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup