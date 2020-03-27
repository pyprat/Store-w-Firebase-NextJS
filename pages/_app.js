import App from 'next/app';
import firebase, {FirebaseContext} from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';


/* Este archivo es el componente App.js de Firebase,
donde están todos los datos */


const MyApp = (props) => {

    const usuario = useAutenticacion();
    console.log(usuario);
    
    const { Component, pageProps } = props;

    return (
        <FirebaseContext.Provider
            value = {{
                firebase,
                usuario
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}


export default MyApp;
