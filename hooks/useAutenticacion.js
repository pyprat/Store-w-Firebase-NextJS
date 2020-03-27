import React, {useState, useEffect} from 'react';
import firebase from '../firebase';

function useAutenticacion() {
    const [usuarioAutenticado, guardarUsuario] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged( user => {
            if( user ){
                guardarUsuario(user);
            }else {
                guardarUsuario(null);
            }
        });
        return () => unsubscribe();  
    }, []);
    
    return usuarioAutenticado;
}


export default useAutenticacion;