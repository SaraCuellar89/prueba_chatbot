// Funcion para retornar al inicio si no hay usuario en sesion (evita bugs raros)

import { useContext, useEffect } from "react";
import { AuthContext } from "./Auth_Context";

export function Usuario_Sesion(Componente: any) {
    return function ({ navigation, ...props }: any) {
        const authContext = useContext(AuthContext);
        if (!authContext) throw new Error("AuthContext no está disponible");
        const { usuario } = authContext;

        useEffect(() => {
            if (!usuario) {
                navigation.replace("Inicio");
            }
        }, [usuario]);

        if (!usuario) return null; 

        return <Componente navigation={navigation} {...props} />;
    };
}