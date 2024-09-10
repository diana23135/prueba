import { useState } from "react";

export const useValidation = () => {
  const [errors, setErrors] = useState("");
  const validationForm = (formState) => {
    var bool_return = true;
    let fieldsError = [];
    let comparePass = "";
    for (let element in formState) {
        // if  ((element === 'contraseña' || element === 'confirm-password') ){
        //     if (comparePass){
        //         comparePass = formState[element]; 
        //     }else{
        //         if (comparePass !== formState[element]){
                    
        //             setErrors("las contraseñas digitadas no son iguales");
        //             return false;   
        //         }  
        //     }
              
        // }
        if (formState[element] === "" ) {
        fieldsError.push(element);
        bool_return = false;
      }
    } 

    if (bool_return) {
      setErrors("");
      return true;
    }

    const message = `Por favor incluir los campos: ${fieldsError.join(", ")}`;
    setErrors(message);
    // toast.error(message);
    

    return bool_return;
  };
 
  return { errors, validationForm};
};