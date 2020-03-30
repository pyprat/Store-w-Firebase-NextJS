export default function validarCrearProducto(valores) {
    let errores = {};

    // Validar el nombre del producto
    if(!valores.nombre) {
        errores.nombre = "El nombre del producto es obligatorio";
    } 

    // Validar empresa
    if(!valores.empresa){
        errores.empresa = "El nombre de la empresa es obligatorio";
    }

    // Validar URL
    if(!valores.url){
        errores.url = "La URL es obligatoria"
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL no válida";
    }

    // Validar descripción
    if(!valores.descripcion){
        errores.descripcion = "La descipción es obligatoria";
    }
   

    return errores;

}