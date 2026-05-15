import React, { useRef, useState } from "react";
import { TextInput, View, Image, ScrollView, Dimensions, useWindowDimensions, TouchableOpacity } from "react-native";
import Texto from "./Texto";
import estilos_prueba_chatbot from "./css/prueba_chatbot_css";
import LottieView from 'lottie-react-native';

const Prueba_ChatBot = ({setCambiar_tamano}: any) => {

    // ================= Configuracion para el tamaño y scroll de la caja de conversacion =================
    const { height } = useWindowDimensions();
    const scrollRef = useRef<ScrollView>(null);


    // ================= Array de simulacion de animacion =================
    const conversacion = [
        { id: "1", tipo: "bot", texto: "Hola, ¿En qué te puedo ayudar?" },
        { id: "2", tipo: "usuario", texto: "Hola, me gustaría que me recomiendes un plato típico de Colombia" },
        { id: "3", tipo: "bot", texto: "¡Claro! Te recomiendo el Ajiaco, una sopa tradicional bogotana hecha con pollo, tres tipos de papa y guascas. ¿Te gustaría saber cómo prepararlo?" },
        { id: "4", tipo: "usuario", texto: "Sí, ¿cuáles son los ingredientes?" },
        { id: "5", tipo: "bot", texto: "Los ingredientes principales son: pollo, papa criolla, papa pastusa, papa nevada, mazorca, guascas, crema de leche y alcaparras." }
    ];

    // ================= Funciones y estado para hablar con el chatbot por texto =================
    const [mostrar, setMostrar] = useState(false);

    const [texto, setTexto] = useState("");

    const enviar = () => {
        if (texto.trim() !== "") {  
            setMostrar(true)
            setCambiar_tamano(true);
            setTexto("")
        }
    }


    // ================= Funciones y estado para hablar con el chatbot por voz =================
    const [mostrar_opcion_hablar, setMostrar_opcion_hablar] = useState(false);

    const hablar = () => {
        if (mostrar_opcion_hablar) {
            setMostrar_opcion_hablar(false);
        } else {
            setCambiar_tamano(false);
            setMostrar(false);
            setMostrar_opcion_hablar(true);
        }
    }

    return(
        <View style={estilos_prueba_chatbot.contenedor}>

            {/* Caja conversacion */}
            {mostrar === false ? 
            (
                null
            ) : 
            (
                <ScrollView
                    ref={scrollRef}
                    style={[estilos_prueba_chatbot.caja_chat, { height: height * 0.3 }]} 
                    contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
                    onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                    nestedScrollEnabled={true}
                >
                    {conversacion.map((mensaje) => (
                        <Texto
                            key={mensaje.id}
                             style={[
                                estilos_prueba_chatbot.texto_mensaje,
                                mensaje.tipo === "bot"
                                    ? estilos_prueba_chatbot.mensaje_bot
                                    : estilos_prueba_chatbot.mensaje_usuario
                            ]}
                        >
                            {mensaje.texto}
                        </Texto>
                    ))}
                </ScrollView>
            )}

            {/* Input */}
            <View style={estilos_prueba_chatbot.contenedor_input}>
                <View style={estilos_prueba_chatbot.caja_input}>
                    {mostrar_opcion_hablar ? 
                    (
                        <>
                            <View style={estilos_prueba_chatbot.caja_hablar}>
                                <LottieView
                                    source={require("../Img/voice.json")}
                                    autoPlay
                                    loop
                                    style={estilos_prueba_chatbot.animacion_hablar} 
                                />
                            </View>

                            <TouchableOpacity onPress={hablar}>
                                <Image source={require("../Img/icono-escuchar.png")} resizeMode="contain" style={estilos_prueba_chatbot.icono_hablar}/>
                            </TouchableOpacity>
                        </>
                    ) : 
                    (
                        <>
                            <TextInput 
                                style={estilos_prueba_chatbot.input}
                                value={texto}           
                                onChangeText={setTexto} 
                            />

                            <TouchableOpacity onPress={hablar}>
                                <Image source={require("../Img/icono-micro.png")} resizeMode="contain" style={estilos_prueba_chatbot.icono_hablar}/>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                
                <TouchableOpacity onPress={enviar}>
                    <Image source={require("../Img/icono-enviado.png")} resizeMode="contain" style={estilos_prueba_chatbot.icono_enviar}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Prueba_ChatBot;