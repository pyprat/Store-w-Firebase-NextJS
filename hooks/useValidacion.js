import React, {useState, useEffect} from 'react';


const useValidacion = (initialState, validar, fn) => {
    
    const [valores, guardarValores] = useState(initialState);
    const [errores, guardarErrores] = useState({});
    const [enviarForm, guardarEnviarForm] = useState(false);

    useEffect( () => {
        if(enviarForm){
            const noError = Object.keys(errores).length === 0;

            if(noError){
                fn(); // Fn = Función que se ejectura en el componente
            }

            guardarEnviarForm(false);
        }
    }, []);

    // Función que se ejecuta conforme el usuario escribe algo
    const handleChange = (e) => {
       guardarValores({
           ...valores,
            [e.target.name] : e.target.value
        });

    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarEnviarForm(true);
    }

    
    return {
        valores,
        errores,
        enviarForm,
        handleChange,
        handleSubmit
    }
}

export default useValidacion;

