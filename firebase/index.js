/* Este archivo sirve para 
unir el archivo firebase.js y 
el FirebaseContext y exportarlos. */
import firebase from './firebase';
import FirebaseContext  from '../firebase/context';


export { FirebaseContext };
export default firebase;