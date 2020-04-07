import React, {useContext} from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';



// Context
import FirebaseContext from '../firebase/context';

const Nav = styled.nav`
	padding-left: 2rem;

	a{
		font-size: 1.8rem;
		margin-left: 2rem;
		color: var(--gris2);
		font-family: 'PT Sans', sans-serif;

		&:last-oftype {
			margin-right: 0;
		}
	}
`;
const Navegacion = () => {

	const { usuario } = useContext(FirebaseContext);

	return (
		<Nav>
			<Link href = "/">
				<a>Inicio</a>
			</Link>
			<Link href = "/populares">
				<a>Populares</a>
			</Link>

			{/* Usando ternario*/}
			{usuario && (
				<Link href = "/nuevo-producto">
					<a>Nuevo Producto</a>
				</Link>
			)}
			
		</Nav>
	)
}

export default  Navegacion;