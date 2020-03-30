import React, { useState, useEffect, useContext } from 'react';
import Layout from '../layout/Layout';
import DetallesProducto from '../layout/DetallesProducto';

import {FirebaseContext} from '../firebase';



const Home = () => {


  const [productos, guardarProduto] = useState([]);
  const {firebase} = useContext(FirebaseContext);

  useEffect(
    () => {
      const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy('date', 'desc').onSnapshot(manejarSnapshot)
      }
      obtenerProductos()
    }, []);

  function manejarSnapshot(snapshot){
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    guardarProduto(productos);
  }
  


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
