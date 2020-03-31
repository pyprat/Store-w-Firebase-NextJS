import React, {useEffect, useState, useContext} from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import Error404 from '../../layout/404';
import Layout from '../../layout/Layout';

import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {Campo, InputSubmit} from '../../ui/Formulario';
import Boton from '../../ui/Boton';

// Context
import {FirebaseContext} from '../../firebase';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;


const Producto = () => {
    //State
    const [producto, guardarProducto] = useState({});
    const [ error, guardarError] = useState(false);

    const router = useRouter();
    const {query : {id}} = router;

    const {firebase, usuario} = useContext(FirebaseContext);

    useEffect(
        () => {
            if(id) {
                const obtenerProducto = async () => {
                    const productoQuery = await firebase.db.collection('productos').doc(id);
                    const producto = await productoQuery.get();

                    if(producto.exists){
                        guardarProducto( producto.data() );
                    } else {
                        guardarError(true);
                    }
                }

                obtenerProducto();
            }
        }, [id]);

        if(Object.keys(producto).length === 0 && !error) return 'Cargando...';

        const { comentarios, date, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado } = producto; 

        console.log(creador);
    return (

        <Layout>
            <>
            {
                error ? 
                    <Error404 />
                :(
                   <div className="contenedor">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                            `}
                            >{nombre}
                        </h1>
                        
                        <ContenedorProducto>
                            <div>
                                <p>Publicado hace: {formatDistanceToNow( new Date(date), {locale: es} )}</p>
                                <p>Por: {creador.nombre} de {empresa}</p>
                                <img src = {urlimagen} />
                                <p>{descripcion}</p>

                                {usuario && (
                                    <>
                                    <h2>Agrega tu comentario</h2>
                                    <form>
                                        <Campo>
                                            <input 
                                                type="text"
                                                name="mensaje"
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                    </>
                                )}
                                </div>
                                <aside>
                                <Boton
                                        target = "_blank"
                                        bgColor="true"
                                        href={url}
                                > Visitar URL
                                </Boton>

                                <div css = {css`
                                    margin-top: 5rem;   
                                    `}>
                                        <p css ={css`
                                            text-align: auto;
                                        `}>{votos} Votos</p>

                                        {usuario && (
                                            <Boton>
                                                Votar
                                            </Boton>
                                        )}
                                    </div> 
                                </aside>
                            </ContenedorProducto>
                    </div>
                 )
            }
            </>
        </Layout>
        
    )
}



export default Producto;
