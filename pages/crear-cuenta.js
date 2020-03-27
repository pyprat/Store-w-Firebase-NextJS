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
import validarCrearCuenta from '../validacion/validarCrearCuenta';

// State Inicial
const state_Inicial = {
	nombre: '',
	email: '',
	password: ''
}

const CrearCuenta = () => {
	

	// State para error
	const [ error, guardarError ] = useState(false); 

	const {
		valores,
        errores,
        handleChange,
		handleSubmit,
		handleBlur
	} = useValidacion(state_Inicial, validarCrearCuenta, crearCuenta);


	// Extraigo los datos
	const {nombre, email, password} = valores;

	async function crearCuenta() {
		try {
			await firebase.registrar(nombre, email, password);
			Router.push('/');
		}catch (error){
			console.log('Hubo un error al crear el usuario', error.message);
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
		  >Crear Cuenta</h1>
	
		  <Formulario
			  onSubmit = {handleSubmit}
			  noValidate
		  >

			  {errores.nombre && <Error>{errores.nombre}</Error>}
			  <Campo>
				  <label htmlFor="nombre">Nombre</label>
				  <input 
					  type="text" 
					  id="nombre" 
					  placeholder = "Tu Nombre" 
					  name="nombre"
					  value = {nombre}
					  onChange = {handleChange}
					  onBlur = {handleBlur}
				  />
			  </Campo>
	
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
				  value = "Crear Cuenta"
			  />

			  {error && <Error>{error}</Error>}
		  </Formulario>
		</>
		</Layout>
	  </div>
	)
}

export default CrearCuenta;
