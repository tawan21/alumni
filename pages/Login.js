import React from 'react'
import Navbar from './Navbar'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
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
        <div className="mx-auto my-auto mt-5 card px-4 py-2">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-4">
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
              <div className="form-group d-flex justify-content-evenly">
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" onClick={() => reset()} className="btn btn-secondary">Clear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login