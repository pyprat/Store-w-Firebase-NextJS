import React from 'react';
import Layout from '../layout/Layout';
import {css} from '@emotion/core';
import { Formulario, Campo, InputSubmit } from '../ui/Formulario';

const CrearCuenta = () => (
  
  
  
  <div>
    <Layout>
    <> 

      <h1
		  css = {css`
			 text-align: center;
			 margin-top: 5rem; 
		  `}
	  >Crear Cuenta</h1>

      <Formulario>
      	<Campo>
      		<label htmlFor="nombre">Nombre</label>
      		<input 
      			type="text" 
      			id="nombre" 
      			placeholder = "Tu Nombre" 
      			name="nombre"
      		/>
      	</Campo>

      	<Campo>
      		<label htmlFor="email">Email</label>
      		<input 
      			type="text" 
      			id="email" 
      			placeholder = "Tu email" 
      			name="email"
      		/>
      	</Campo>

      	<Campo>
      		<label htmlFor="password">Password</label>
      		<input 
      			type="password" 
      			id="password" 
      			placeholder = "Tu Password" 
      			name="password"
      		/>
      	</Campo>

      	<InputSubmit 
      		type="submit"
      		value = "Crear Cuenta"
      	/>
      </Formulario>
    </>
    </Layout>
  </div>
)

export default CrearCuenta;
