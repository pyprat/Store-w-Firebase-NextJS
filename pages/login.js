import React, {useState} from 'react';
import Layout from '../layout/Layout';
import {css} from '@emotion/core';
import { Formulario, Campo, InputSubmit, Error } from '../ui/Formulario';

// Router
import Router from 'next/router';

// Firebase
import firebase from '../firebase/firebase';

// Validación
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validacion/validarLogin';

// State Inicial
const state_Inicial = {
	email: '',
	password: ''
}


const Login = () => {
	// State para error
	const [ error, guardarError ] = useState(false); 

	const {
		valores,
    errores,
    handleChange,
		handleSubmit,
		handleBlur
	} = useValidacion(state_Inicial, validarLogin, iniciarSesion);


	// Extraigo los datos
	const {email, password} = valores;

  async function iniciarSesion() {
    try {

      await firebase.login(email, password);
      Router.push('/');

    } catch (error) {
      console.log('Hubo un error al autenticar el usuario', error.message);
      guardarError(error.message);
    }
  }


	return (
		<div>
		<Layout>
		<> 
	
		  <h1
			  css = {css`
				 text-align: center;
				 margin-top: 5rem; 
			  `}
		  >Iniciar Sesión</h1>
	
		  <Formulario
			  onSubmit = {handleSubmit}
			  noValidate
		  >
	
			  {errores.email && <Error>{errores.email}</Error>}

			  <Campo>
				  <label htmlFor="email">Email</label>
				  <input 
					  type="text" 
					  id="email" 
					  placeholder = "Tu email" 
					  name="email"
					  value = {email}
					  onChange = {handleChange}
					  onBlur = {handleBlur}
				  />
			  </Campo>


			  {errores.password && <Error>{errores.password}</Error>}

			  <Campo>
				  <label htmlFor="password">Password</label>
				  <input 
					  type="password" 
					  id="password" 
					  placeholder = "Tu Password" 
					  name="password"
					  value = {password}
					  onChange = {handleChange}
					  onBlur = {handleBlur}
				  />
			  </Campo>
	
			  <InputSubmit 
				  type="submit"
				  value = "Iniciar Sesión"
			  />

			  {error && <Error>{error}</Error>}
		  </Formulario>
		</>
		</Layout>
	  </div>
	)
}

export default Login
