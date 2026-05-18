import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Componentes/Header";
import { colores } from "../estilos_global";
import estilos_publicaciones from "./css/publicaciones_css";
import Formu_Descripcion_Pasos from "../Componentes/Formu_Descripcion_Pasos";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import ModalConfirmacion from "../Componentes/ModalConfirmacion";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

type Props = NativeStackScreenProps<RootStackParamList, 'Descripcion'>;

const Descripcion = ({route, navigation}: Props) => {

    // ================= Datos del usuario por un contexto difinido =================
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext no está disponible");
    const { usuario } = authContext;



    // ================= Datos recibidos de la vista de subir_receta =================
    const {titulo, archivo, ingredientes, tiempo_preparacion, tipo_tiempo, dificultad, plato} = route.params;
    const es_edicion = !!plato;



    // ================= Estados para mostrar el modal de confirmacion =================
    const [modal_visible, setModal_visible] = useState(false);
    const [tipo_modal, setTipo_modal] = useState<'eliminar' | 'guardar' | null>(null);



    // ================= Estados y Funciones para subir un plato =================
    // Estado del formulario 
    const [form, setForm] = useState({
        descripcion: plato?.descripcion ?? "",
        preparacion: plato?.preparacion ?? "",
    });


    // Handle Change genérico 
    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
    };


    // Enviar formulario a la bbdd
    const Subir_Plato = async () => {
        try {
            // ----- Validaciones -----
            const campos = [
                { nombre: "Título", valor: form.descripcion },
                { nombre: "Tiempo aprox. de preparación",valor: form.preparacion }
            ];
        
            // Campos obligatorios
            for (const campo of campos) {
                if (!campo.valor.trim()) {
                    Mensaje_Toast.error(`"${campo.nombre}" es un campo obligatorio`);
                    return;
                }
            };

            // ----- Construir FormData -----
            const formData = new FormData();

            const ahora = new Date();
            const fecha_creacion = ahora.toISOString().slice(0, 19).replace("T", " ");

            // Datos de texto
            formData.append("titulo", titulo);
            formData.append("ingredientes", ingredientes);
            formData.append("tiempo_preparacion", tiempo_preparacion);
            formData.append("tipo_tiempo", tipo_tiempo);
            formData.append("dificultad", dificultad);
            formData.append("descripcion", form.descripcion);
            formData.append("preparacion", form.preparacion);
            formData.append("fecha_creacion", fecha_creacion);

            // Archivo de imagen (si existe)
            if (archivo) {
                const uri = archivo;
                const nombre = uri.split("/").pop() ?? "foto.jpg";
                const extension = nombre.split(".").pop();
                const tipo = `image/${extension === "jpg" ? "jpeg" : extension}`;

                formData.append("archivo", {
                    uri,
                    name: nombre,
                    type: tipo,
                } as any);
            }

            // ----- Enviar datos a la bbdd-----
            const url = es_edicion
            ? `http://35.174.135.238/publicaciones/editar/${plato.id_publicacion}`
            : `http://35.174.135.238/publicaciones/subir`;

            const res = await fetch(url, {
                method: es_edicion ? "PUT" : "POST",
                headers: { 'Authorization': `Bearer ${usuario.token}`},
                body: formData
            });

            const datos = await res.json();

            if(!datos.success) return Mensaje_Toast.info(datos.message);

            if (es_edicion) {
                navigation.pop(2);
                navigation.navigate("Perfil", { plato_editado: true });
            } else {
                navigation.pop(2);
                navigation.navigate("Foro", { plato_subido: true });
            }
        } catch (error) {
            console.error('Error subiendo el plato:', error);
            Mensaje_Toast.error('No se pudo subir el plato');
        }
    }



    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        
            <View style={{backgroundColor: colores.color_2}}>
            <Header 
                title={es_edicion ? "Edita tu plato" : "¡Sube un plato!"} 
                onBack={() => navigation.goBack()} 
            /> 
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
    
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#000000' }} 
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={estilos_publicaciones.container}>
                        
                        <Formu_Descripcion_Pasos
                            plato={plato}
                            Cancelar_Cambios={() => setModal_visible(true)}
                            handleChange={handleChange}
                            Subir_Plato={Subir_Plato}
                        />

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Descripcion;