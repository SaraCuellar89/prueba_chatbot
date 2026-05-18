import React, { useEffect, useRef, useState } from "react";
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

const videos_por_intencion: Record<string, any[]> = {
    "feliz":      [require('../Videos/feliz_1.mp4')],
    "triste":     [require('../Videos/triste_1.mp4')],
    "hambre":     [require('../Videos/hablar_1.mp4')],
    "receta":     [require('../Videos/cambio_1.mp4')],
    "rapido":     [require('../Videos/hablar_2.mp4')],
    "saludable":  [require('../Videos/hablar_3.mp4')],
    "dulce":      [require('../Videos/hablar_1.mp4')],
    "salado":     [require('../Videos/hablar_2.mp4')],
    "hola":       [require('../Videos/saludar_1.mp4'), require('../Videos/saludar_2.mp4')],        
    "gracias":    [require('../Videos/victoria_1.mp4')],
    "default":    [require('../Videos/esperar_1.mp4'), require('../Videos/esperar_3.mp4'), require('../Videos/esperar_4.mp4')], 
};


const elegir_video_aleatorio = (intencion: string | null) => {
    const opciones = videos_por_intencion[intencion ?? "default"] ?? videos_por_intencion["default"];
    return opciones[Math.floor(Math.random() * opciones.length)];
};

const Robot = ({cambiar_tamano, intencion }: any) => {

    // ================= Funciones y estados para que poner una frase aleatoria cada que se recarga la aplicacion =================
    const [frase, setFrase] = useState(frases[0]);

    const montado = useRef(true);
    const timeout_retorno = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalo_default = useRef<ReturnType<typeof setInterval> | null>(null);

    const player = useVideoPlayer(require('../Videos/esperar_1.mp4'), p => {
        p.loop = true;
        p.play();
    });

    useEffect(() => {
        montado.current = true;
        return () => { montado.current = false; };
    }, []);

    // Frase aleatoria al montar
    useEffect(() => {
        if (!cambiar_tamano) {
            setFrase(frases[Math.floor(Math.random() * frases.length)]);
        }
    }, [cambiar_tamano]);



    const TIEMPO_VOLVER_DEFAULT = 8000;

    useEffect(() => {
        if (!montado.current) return;

        // Limpiar timers anteriores
        if (timeout_retorno.current) clearTimeout(timeout_retorno.current);
        if (intervalo_default.current) clearInterval(intervalo_default.current);

        if (intencion) {
            // 1. Reproducir video de la intención
            try {
                player.replace(elegir_video_aleatorio(intencion));
                player.loop = true;
                player.play();
            } catch (e) {}

            // 2. Volver a default después de X ms
            timeout_retorno.current = setTimeout(() => {
                if (!montado.current) return;
                try {
                    player.replace(elegir_video_aleatorio(null));
                    player.loop = true;
                    player.play();
                } catch (e) {}

                // 3. Reanudar rotación de videos default
                iniciar_rotacion_default();
            }, TIEMPO_VOLVER_DEFAULT);

        } else {
            // Sin intención → rotar videos default cada 10s
            iniciar_rotacion_default();
        }

        return () => {
            if (timeout_retorno.current) clearTimeout(timeout_retorno.current);
            if (intervalo_default.current) clearInterval(intervalo_default.current);
        };
    }, [intencion]);


    const iniciar_rotacion_default = () => {
        if (intervalo_default.current) clearInterval(intervalo_default.current);

        intervalo_default.current = setInterval(() => {
            if (!montado.current) return;
            try {
                player.replace(elegir_video_aleatorio(null));
                player.play();
            } catch (e) {}
        }, 10000);
    };

    
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