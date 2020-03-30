import React, {useState, useContext} from 'react';
import Layout from '../layout/Layout';
import FileUploader from 'react-firebase-file-uploader';
import {css} from '@emotion/core';
import { Formulario, Campo, InputSubmit, Error } from '../ui/Formulario';

// Router
import Router from 'next/router';

// Context
import FirebaseContext from '../firebase/context';

// Validación
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';


// State Inicial
const state_Inicial = {
  nombre: '',
  empresa: '',
  url: '',
  descripcion: ''

}

const NuevoProducto = () => {
	
  // State de las imagenes
  const [nombreimagen, guardarNombre] = useState('');
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState('');

	// State para error
	const [ error, guardarError ] = useState(false); 

	const {
		valores,
    errores,
    handleChange,
		handleSubmit,
		handleBlur
	} = useValidacion(state_Inicial, validarCrearProducto, crearProducto);


	// Extraigo los datos
	const {nombre, empresa, url, descripcion} = valores;

  const {usuario, firebase} = useContext(FirebaseContext);

	async function crearProducto() {
    if(!usuario){
      Router.push('/login');
    }
    
    // Crear el objeto de producto
    const producto = {
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      date: Date.now()
    }

    // Insertarlo en la base de datos
    await firebase.db.collection('productos').add(producto);


    return Router.push('/');
  }
  
  const handleUploadStart = () => {
      guardarProgreso(0);
      guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre)
    firebase
        .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          guardarUrlImagen(url);
        } );
  };
		
	return (
		<div>
		<Layout>
		<> 
	
		  <h1
			  css = {css`
				 text-align: center;
				 margin-top: 5rem; 
			  `}
		  >Nuevo Producto</h1>
	
		  <Formulario
			  onSubmit = {handleSubmit}
			  noValidate
		  >
        
        <fieldset>
        <legend> Información General </legend>
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

        {errores.empresa && <Error>{errores.empresa}</Error>}
        <Campo>
				  <label htmlFor="empresa">Empresa</label>
				  <input 
					  type="text" 
					  id="empresa" 
					  placeholder = "Nombre de la empresa" 
					  name="empresa"
					  value = {empresa}
					  onChange = {handleChange}
					  onBlur = {handleBlur}
				  />
			  </Campo>

        {errores.imagen && <Error>{errores.imagen}</Error>}
        <Campo>
				  <label htmlFor="imagen">Imagen</label>
          <FileUploader 
            accept = "image/*"
					  id="imagen" 
            name="imagen"
            randomizeFilename
            storageRef = {firebase.storage.ref("productos")}
            onUploadStart = {handleUploadStart}
            onUploadError = {handleUploadError}
            onUploadSuccess = {handleUploadSuccess}
            onProgress = {handleProgress}

				  />
        </Campo>

        {errores.url && <Error>{errores.url}</Error>}
        <Campo>
				  <label htmlFor="url">URL</label>
				  <input 
					  type="url" 
					  id="url" 
					  placeholder = "URL del producto" 
					  name="url"
					  value = {url}
					  onChange = {handleChange}
					  onBlur = {handleBlur}
				  />
			  </Campo>
        </fieldset>


        <fieldset>
          <legend> Sobre el producto </legend>

        {errores.descripcion && <Error>{errores.descripcion}</Error>}
        <Campo>
				  <label htmlFor="descripcion">Descripcion</label>
				  <textarea
					  id="descripcion" 
					  name="descripcion"
					  value = {descripcion}
					  onChange = {handleChange}
					  onBlur = {handleBlur}
				  />
			  </Campo>
        </fieldset>
			 
	
			  <InputSubmit 
				  type="submit"
				  value = "Subir Producto"
			  />

			  {error && <Error>{error}</Error>}
		  </Formulario>
		</>
		</Layout>
	  </div>
	)
}

export default NuevoProducto;
