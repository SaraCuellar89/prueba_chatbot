import { useContext, useEffect, useState } from "react";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import { AuthContext } from "../utils/Auth_Context";

export function useReaccionar ({corazon_inicial, total_reacciones, SetNotificacion_reaccion}: any) {
    
    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;



    // ================= Funciones y estados para reaccionar a un plato =================
    // Estados
    const [corazon, setCorazon] = useState(corazon_inicial);
    const [total_reacciones_local, setTotal_reacciones_local] = useState(total_reacciones);


    // Actualizar la imagen del corazon
    useEffect(() => {
        setCorazon(corazon_inicial);
    }, [corazon_inicial]);


    // Actualizar el contador de reacciones
    useEffect(() => {
        setTotal_reacciones_local(total_reacciones);
    }, [total_reacciones]);

    
    // Enviar datos a la bbdd
    const Reaccionar = async (id_publicacion:number) => {
        const res = await fetch(`http://35.174.135.238/reacciones/reaccionar/${id_publicacion}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${usuario.token}`
        }
        })

        const data = await res.json();

        if(!data.success) return Mensaje_Toast.info(data.message);

        const nuevo_corazon = corazon === 1 ? 0 : 1;
        setCorazon(nuevo_corazon);
        setTotal_reacciones_local((prev: number) => nuevo_corazon === 1 ? prev + 1 : prev - 1);
        
        if (nuevo_corazon === 1) SetNotificacion_reaccion();
    }



    return { corazon, total_reacciones_local, Reaccionar };
}