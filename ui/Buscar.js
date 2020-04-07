import React, {useState} from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';
import {css} from '@emotion/core';


const InputText = styled.input`
	border: 1px solid var(--gris3);
	padding: 1rem;
	min-width: 300px;
`;

const BotonSubmit = styled.button`
	height: 3rem;
	width: 3rem;
	display: block;
	background-size: 4rem;
	background-image: url('/static/img/buscar.png');
	background-repeat: no-repeat;
	position: absolute;
	right: 1rem;
	top: 1px;
	background-color: white;
	border: none;
	text-indent: -9999px;

	&:hover{
		cursor: pointer;
	}
`;

const Buscar = () => {

	const [busqueda, guardarBusqueda] = useState('');


	const buscarProducto = e => {
		e.preventDefault();

		if(busqueda.trim === '') return;

		// redireccionar a /buscar
		Router.push({
			pathname: '/buscar',
			query: { q : busqueda}
		})	
	}
	return (
		<form
			css = {css`
					position: relative;
			`}
			onSubmit = {buscarProducto}
		>
			<InputText 
				type="text"
				placeholder = 'Busca tu producto'
				onChange = { e => guardarBusqueda(e.target.value)}
			/>
			<BotonSubmit type="submit">Buscar</BotonSubmit>
		</form>
)};

export default Buscar;