import React from "react";
import { View } from "react-native";
import { VideoView, useVideoPlayer } from 'expo-video';
import estilos_robot from "./css/robot_css";
import Texto from "./Texto";

const Robot = ({cambiar_tamano}: any) => {

    // ================= Funcion para reproducir las animacion en loop =================
    const player = useVideoPlayer(require('../Img/robot_ejemplo.mp4'), player => {
        player.loop = true;
        player.play();
    });

    return(
        <View>
            
            {cambiar_tamano === true ? 
            (null) : 
            (
                <View style={estilos_robot.caja_texto}>
                    <Texto style={estilos_robot.texto}>¿Qué quieres cocinar hoy?</Texto>
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