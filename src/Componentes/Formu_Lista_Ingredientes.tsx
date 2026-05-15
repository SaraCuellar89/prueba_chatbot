import React, { useState, useRef, useEffect, useContext } from "react";
import { TouchableOpacity, Pressable, View, TextInput } from "react-native";
import Texto from "./Texto";
import estilos_formu_lista_ingredientes from "./css/formu_lista_ingredientes";
import estilos_global from "../estilos_global";
import { AuthContext } from "../utils/Auth_Context";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";

type Item = { 
    id?: number;
    texto: string; 
    marcado: boolean;
};

const Formu_Lista_Ingredientes = ({ ingredientes_iniciales = [], id_publicacion }: { 
    ingredientes_iniciales?: any[];
    id_publicacion: number;
}) => {

    const [items, setItems] = useState<Item[]>([]);

    // ================= Funcion para renderizar los ingredientes en el editor de texto =================
    useEffect(() => {
        if (ingredientes_iniciales.length > 0) {
        setItems(ingredientes_iniciales.map(ing => ({
            id: ing.id_ingrediente,
            texto: ing.nombre,
            marcado: ing.obtenido === 1
        })));
        }
    }, [ingredientes_iniciales]);

    const [lineaActiva, setLineaActiva] = useState("");
    const [editandoIndex, setEditandoIndex] = useState<number | null>(null);
    const inputRef = useRef<TextInput>(null);
    const inputsRef = useRef<(TextInput | null)[]>([]);

    // Funcion para que al dar enter, el item (ingrediente) se vuelva un checklist
    const handleChange = (text: string) => {
        if (text.includes("\n")) {
            const partes = text.split("\n");
            const confirmada = partes[0].trim();

            if (confirmada !== "") {
                setItems(prev => [...prev, { texto: confirmada, marcado: false }]);
            }

            setLineaActiva(partes.slice(1).join("\n"));
        } else {
            setLineaActiva(text);
        }
    };

    // Funcion para borrar unicamente con el teclado los ingredientes
    const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }) => {
        if (nativeEvent.key === "Backspace" && lineaActiva === "" && items.length > 0) {
            const ultimoItem = items[items.length - 1];
            setItems(prev => prev.slice(0, -1));
            setLineaActiva(ultimoItem.texto);
        }
    };

    // Funcion para editar un item confirmado: actualiza su texto en tiempo real
    const handleChangeItem = (text: string, index: number) => {
        // Si se presiona Enter, se termina la edición
        if (text.includes("\n")) {
            setEditandoIndex(null);
            return;
        }
        setItems(prev =>
            prev.map((item, i) => i === index ? { ...item, texto: text } : item)
        );
    };

    // Funcion para borrar checklist si el item (ingrediente) que se estaba eliminando no tiene nada escrito
    const handleBlurItem = (index: number) => {
        setEditandoIndex(null);
        setItems(prev => prev.filter((item, i) => i !== index || item.texto.trim() !== ""));
    };

    // Funcion para marcar o desmarcar un item (ingrediente)
    const Toggle_Marcar = (index: number) => {
        setItems(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, marcado: !item.marcado } : item
            )
        );
    };

    // ================= Datos del usuario por un contexto difinido =================
        const authContext = useContext(AuthContext);
        if (!authContext) throw new Error("AuthContext no está disponible");
        const { usuario } = authContext;


    // ================= Funciones y estados para marcar o desmarcar un ingrediente =================
    const Marcar_Ingrediente = async (id_ingrediente: number | undefined) => {
        if (!id_ingrediente) return;
        
        const res = await fetch(`http://35.174.135.238/ingredientes/marcar/${id_ingrediente}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${usuario.token}` }
        });

        const data = await res.json();
        if (!data.success) return Mensaje_Toast.info(data.message);
    }


    // ================= Funciones y estados para guardar la lista de ingredientes =================
    const Guardar_Ingredientes = async () => {
        const todos = lineaActiva.trim() !== ""
            ? [...items, { texto: lineaActiva.trim(), marcado: false }]
            : items;

        const res = await fetch(`http://35.174.135.238/ingredientes/agregar/${id_publicacion}`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${usuario.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredientes: todos.map(i => ({ nombre: i.texto, obtenido: i.marcado ? 1 : 0 }))
            })
        });

        const data = await res.json();

        if (!data.success) return Mensaje_Toast.info(data.message);

        Mensaje_Toast.info("¡Lista guardada!");
    }


    return (
        <View style={estilos_formu_lista_ingredientes.contenedor}>

            <Pressable
                style={estilos_formu_lista_ingredientes.caja_contenedor}
                onPress={() => inputRef.current?.focus()}
            >
                

                    {/* Renderizado de ingredientes ya creados: es el nuevo estado que adquiere un item cuando se da enter */}
                    {items.map((item, i) => (
                        <View key={i} style={estilos_formu_lista_ingredientes.caja_ingrediente}>
                            <TouchableOpacity
                                style={item.marcado
                                    ? estilos_formu_lista_ingredientes.btn_check
                                    : estilos_formu_lista_ingredientes.btn_no_check}
                                onPress={() => { Toggle_Marcar(i); Marcar_Ingrediente(items[i].id) }}
                            >
                                <Texto style={estilos_formu_lista_ingredientes.btn_check_icono}>
                                    {item.marcado ? "✓" : ""}
                                </Texto>
                            </TouchableOpacity>

                            {/* ← Editar ingrediente */}
                            {editandoIndex === i ? (
                                <TextInput
                                    ref={el => { inputsRef.current[i] = el; }}
                                    value={item.texto}
                                    onChangeText={text => handleChangeItem(text, i)}
                                    onBlur={() => handleBlurItem(i)}
                                    autoFocus
                                    style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: "#000",
                                        paddingVertical: 0,
                                    }}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {setEditandoIndex(i);}}
                                >
                                    <Texto style={item.marcado
                                        ? estilos_formu_lista_ingredientes.texto_check
                                        : undefined}
                                    >
                                        {item.texto}
                                    </Texto>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}

                    {/* Input para poder escribir */}
                    <View style={estilos_formu_lista_ingredientes.caja_ingrediente}>
                        <View style={estilos_formu_lista_ingredientes.btn_no_check} />
                        <TextInput
                            ref={inputRef}
                            value={lineaActiva}
                            onChangeText={handleChange}
                            onKeyPress={handleKeyPress}
                            multiline
                            placeholder="Escribe un ingrediente..."
                            placeholderTextColor={'grey'}
                            style={{ flex: 1 }} 
                        />
                    </View>
            
            </Pressable>

            <View style={estilos_formu_lista_ingredientes.caja_btn_guardar}>
                <TouchableOpacity style={estilos_global.btn_1} onPress={Guardar_Ingredientes}>
                    <Texto style={estilos_global.texto_btn_1}>Guardar</Texto>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Formu_Lista_Ingredientes;