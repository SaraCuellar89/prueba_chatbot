import React, { useRef, useState, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { estilos_formu_subir_receta } from "./css/formu_subir_receta_css";
import estilos_global, { colores } from "../estilos_global";
import Texto from "./Texto";

const Formu_Descripcion_Pasos = ({plato, Cancelar_Cambios, handleChange, Subir_Plato}: any) => {
    const es_edicion = !!plato;

    // ================= Funciones para lo editores de texto =================
    const editorRef = useRef<any>(null);
    const pasosRef = useRef<any>(null); 

    const [activar_opciones, setActivar_opciones] = useState([]);


    return(
        <View style={estilos_formu_subir_receta.contenedor}>
            <View style={estilos_formu_subir_receta.caja_input}>

                {/* --- Input de la descripcion --- */}
                <Texto style={estilos_formu_subir_receta.label}>Descripción</Texto>

                <View style={estilos_formu_subir_receta.caja_editor}>
                    <RichToolbar
                        style={estilos_formu_subir_receta.editor}
                        editor={editorRef}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                        ]}
                        iconTint="grey"
                        selectedIconTint="black"
                    />
                </View>

                <View style={estilos_formu_subir_receta.input_grande}>
                    <RichEditor
                        ref={editorRef}
                        initialContentHTML={plato?.descripcion ?? ""} 
                        placeholder="Ej: El arroz paisa es de Antioquia"
                        onChange={(valor) => handleChange("descripcion", valor)}
                        style={estilos_formu_subir_receta.estilos_rich_editor}
                        editorStyle={{
                            backgroundColor: colores.color_3, 
                            color: colores.color_4,             
                            placeholderColor: 'grey',
                        }}
                        onCursorPosition={() => {}}
                        {...{
                            registerToolbar: (items: any) => {
                                setActivar_opciones(items);
                            }
                        }}
                    />
                </View>
            </View>

            {/* --- Input de los pasos de preparacion --- */}
            <View style={estilos_formu_subir_receta.caja_input}>
                <Texto style={estilos_formu_subir_receta.label}>Pasos Preparación</Texto>

                <View style={estilos_formu_subir_receta.caja_editor}>
                    <RichToolbar
                        style={estilos_formu_subir_receta.editor}
                        editor={pasosRef}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                        ]}
                        iconTint="grey"
                        selectedIconTint="black"
                    />
                </View>

                <View style={estilos_formu_subir_receta.input_grande}>
                    <RichEditor
                        ref={pasosRef}
                        initialContentHTML={plato?.preparacion ?? `<ol><li></li></ol>`} 
                        placeholder="Ej: 1. Poner los frijoles en agua"
                        onChange={(valor) => handleChange("preparacion", valor)}
                        style={estilos_formu_subir_receta.estilos_rich_editor}
                        editorStyle={{
                            backgroundColor: colores.color_3, 
                            color: colores.color_4,             
                            placeholderColor: 'grey',
                        }}
                        onCursorPosition={() => {}}
                        {...{
                            registerToolbar: (items: any) => {
                                setActivar_opciones(items);
                            }
                        }}
                    />
                </View>
            </View>

            {/* --- Boton para enviar el formulario --- */}
            <View style={estilos_formu_subir_receta.caja_boton}>
                <TouchableOpacity style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]} onPress={Subir_Plato}>
                    <Texto style={estilos_global.texto_btn_1}>
                        {es_edicion ? "Guardar cambios" : "Subir"}
                    </Texto>
                </TouchableOpacity>

                {es_edicion && (
                    <TouchableOpacity
                        style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]}
                        onPress={Cancelar_Cambios}
                    >
                        <Texto style={estilos_global.texto_btn_1}>Cancelar</Texto>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Formu_Descripcion_Pasos;