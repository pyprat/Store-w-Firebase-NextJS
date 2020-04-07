import React from 'react';
import Layout from '../layout/Layout';
import DetallesProducto from '../layout/DetallesProducto';

import useProductos from '../hooks/useProductos';



const Home = () => {

  const { productos } = useProductos('date');


  return (
    <div>
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
              {productos.map(producto => (
                <DetallesProducto 
                  key = {producto.id}
                  producto = {producto}
                />
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  </div>

  )
}


export default Home;
