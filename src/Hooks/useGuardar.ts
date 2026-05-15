import { useContext, useState } from "react";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

export function useGuardar ({guardado_inicial, antes_desguardar, Setnotificacion_guardado}: any) {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;



    // ================= Funciones y estados para gurdar un plato =================
    // Estados
    const [guardado, setGuardado] = useState(guardado_inicial);


    // Funciones para guardar el plato
    const Guardar = async (id_publicacion:number) => {
        if (guardado === 1 && antes_desguardar) {
        antes_desguardar(() => Ejecutar_Desguardado(id_publicacion));
        return;
        }

        await Ejecutar_Desguardado(id_publicacion);
    }


    const Ejecutar_Desguardado = async (id_publicacion: number) => {
        const res = await fetch(`http://35.174.135.238/guardados/guardar/${id_publicacion}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${usuario.token}` }
        });

        const data = await res.json();

        if (!data.success) return Mensaje_Toast.info(data.message);

        const nuevo_guardado = guardado === 1 ? 0 : 1;
        setGuardado(nuevo_guardado);

        if (nuevo_guardado === 1) Setnotificacion_guardado?.();
    }


    return { Guardar, guardado };
}