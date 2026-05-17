import React, { useEffect, useState } from "react";
import { AppState, View } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "./css/robot_css";
import Texto from "./Texto";

const frases = [
    "¿Qué quieres cocinar hoy?",
    "¿Tienes hambre? ¡Te ayudo!",
    "¿Qué hay en tu nevera?",
    "¿Algo rico para hoy?",
    "¿Qué se te antoja?",
];

const Robot = ({cambiar_tamano}: any) => {

    // ================= Funciones y estados para que poner una frase aleatoria cada que se recarga la aplicacion =================
    const [frase, setFrase] = useState(frases[0]);

    useEffect(() => {
        if (!cambiar_tamano) {
            const aleatoria = frases[Math.floor(Math.random() * frases.length)];
            setFrase(aleatoria);
        }
    }, [cambiar_tamano]);



    // ================= Funciones para reproducir las animacion en loop =================
    const player = useVideoPlayer(require('../Img/robot_ejemplo.mp4'), player => {
        player.loop = true;
        player.play();
    });

    // Detecta cuando la app vuelve a primer plano y reanuda el video
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                player.play();
            }
        });

        return () => subscription.remove();
    }, [player]);


    // Detecta si el video se detiene inesperadamente y lo reinicia
    useEffect(() => {
        const subscription = player.addListener('statusChange', (status) => {
            if (status.status === 'idle' || status.status === 'error') {
                player.play();
            }
        });

        return () => subscription.remove();
    }, [player]);


    
    return(
        <View>
            
            {cambiar_tamano === true ? 
            (null) : 
            (
                <View style={estilos_robot.caja_texto}>
                    <Texto style={estilos_robot.texto}>{frase}</Texto>
                </View>
            )}

            <View style={cambiar_tamano === true ? estilos_robot.caja_robot_pequeno : estilos_robot.caja_robot}>
                <VideoView
                    player={player}
                    nativeControls={false}
                    style={cambiar_tamano ? estilos_robot.robot_pequeno : estilos_robot.robot}
                />
            </View>
        </View>
    )
}

export default Robot;