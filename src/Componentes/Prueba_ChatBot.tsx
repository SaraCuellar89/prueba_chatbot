import React, { useRef, useState } from "react";
import { TextInput, View, Image, ScrollView, Dimensions, useWindowDimensions, TouchableOpacity } from "react-native";
import Texto from "./Texto";
import estilos_prueba_chatbot from "./css/prueba_chatbot_css";
import LottieView from 'lottie-react-native';

const Prueba_ChatBot = ({setCambiar_tamano, onIntencion }: any) => {

    // ================= Configuracion para el tamaño y scroll de la caja de conversacion =================
    const { height } = useWindowDimensions();
    const scrollRef = useRef<ScrollView>(null);


    // ================= Array de simulacion de animacion =================
    const intenciones: Record<string, string> = {
        "feliz":        "¡Me alegra que estés de buen humor! 😄 ¿Cocinamos algo especial hoy?",
        "triste":       "Lo siento 😢 Te recomiendo un chocolate caliente para animarte.",
        "hambre":       "¡Vamos a cocinar algo rico! ¿Qué tienes en la nevera?",
        "receta":       "¡Claro! ¿Qué ingredientes tienes disponibles?",
        "rapido":       "Tengo recetas listas en menos de 15 minutos ⚡ ¿Te interesa?",
        "saludable":    "¡Buena decisión! Te recomiendo una ensalada de quinoa con aguacate 🥗",
        "dulce":        "¿Qué tal unas galletas de avena o un brownie? 🍪",
        "salado":       "Tengo recetas de snacks salados muy fáciles. ¿Quieres verlas?",
        "hola":         "¡Hola! ¿En qué te puedo ayudar hoy? 👋",
        "gracias":      "¡Con gusto! Si necesitas algo más, aquí estoy 😊",
    };

    // ================= Funciones y estado para hablar con el chatbot por texto =================
    const [mostrar, setMostrar] = useState(false);

    const [texto, setTexto] = useState("");
    const [conversacion, setConversacion] = useState<{id: string, tipo: string, texto: string}[]>([]);

    const enviar = () => {
        if (texto.trim() !== "") {
            const intencion_key = texto.trim().toLowerCase(); 
            const intencion = intenciones[intencion_key];
            const respuesta = intencion ?? "No entendí muy bien, ¿puedes intentar con otra palabra?";

            if (onIntencion) onIntencion(intencion_key); 

            setConversacion(prev => [
                ...prev,
                { id: Date.now().toString(),        tipo: "usuario", texto: texto.trim() },
                { id: Date.now().toString() + "b",  tipo: "bot",     texto: respuesta },
            ]);

            setMostrar(true);
            setCambiar_tamano(true);
            setTexto("");
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
   
            {mostrar_opcion_hablar ? 
            (
                <View style={estilos_prueba_chatbot.contenedor_input}>
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

                    <TouchableOpacity onPress={enviar}>
                        <Image source={require("../Img/icono-enviado.png")} resizeMode="contain" style={estilos_prueba_chatbot.icono_enviar}/>
                    </TouchableOpacity>
                </View>
            ) : 
            (
                <View style={estilos_prueba_chatbot.contenedor_input}>
                    <View style={estilos_prueba_chatbot.caja_input}>
                        <TextInput 
                            style={estilos_prueba_chatbot.input}
                            value={texto}           
                            onChangeText={setTexto} 
                            placeholder="Escribe algo..." 
                            placeholderTextColor={"grey"} 
                        />

                        <TouchableOpacity onPress={hablar}>
                            <Image source={require("../Img/icono-micro.png")} resizeMode="contain" style={estilos_prueba_chatbot.icono_hablar}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={enviar}>
                        <Image source={require("../Img/icono-enviado.png")} resizeMode="contain" style={estilos_prueba_chatbot.icono_enviar}/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default Prueba_ChatBot;