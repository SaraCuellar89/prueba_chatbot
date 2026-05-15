import React, { useEffect, useState } from "react";
/**
 * Formulario para capturar titulo, descripcion e informacion de una receta antes de publicarla.
 */

import { View,TextInput,TouchableOpacity, Image, Alert, StyleSheet, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Mensaje_Toast } from "../utils/Mensaje_Toast";
import DropDownPicker from 'react-native-dropdown-picker';
import { estilos_formu_subir_receta } from "./css/formu_subir_receta_css";
import Texto from "./Texto";
import estilos_global from "../estilos_global";

export default function FormSubirReceta({ navigation, plato }: any) {

  // ================= Estados y Funciones para subir imagenes desde el dispositivo =================
  const [imagen, setImagen] = useState<ImagePicker.ImagePickerAsset | null>(null);



  // =================== Abrir la Galería ===================
  const seleccionarImagen = async () => {
    // Esperar a que el Alert se cierre completamente
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
        if (!canAskAgain) {
            Alert.alert(
                "Permiso requerido",
                "Activa el permiso de galería en los ajustes de tu dispositivo.",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Ir a Ajustes", onPress: () => Linking.openSettings() }
                ]
            );
        } else {
            Mensaje_Toast.info('Se necesita permiso para acceder a la galería');
        }
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
    });
    if (!result.canceled){
      setImagen(result.assets[0]);
      handleChange("archivo", result.assets[0].uri);
    };
  };



  // =================== Abrir la camara ===================
  const tomarFoto = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Mensaje_Toast.info('Se necesita permiso para acceder a la cámara');
        return;
    }
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled) setImagen(result.assets[0]);
  };



  // =================== Elegir opciones para la imagen (Galeria, Camara o Cancelar) ===================
  const elegirFuente = () => {
      Alert.alert("Agregar imagen", "¿De dónde quieres subir la foto?", [
      { text: "Galería", onPress: seleccionarImagen },
      { text: "Cámara",  onPress: tomarFoto },
      { text: "Cancelar", style: "cancel" },
      ]);
  };



  // ================= Estados y funciones para agregar o eliminar ingredientes =================
  const [ingredientes, setIngredientes] = useState<string[]>(() => {
    if (plato?.ingredientes) {
      try {
          let parsed = JSON.parse(plato.ingredientes);
          
          // Doble parse porque viene doblemente serializado desde la bbdd
          if (typeof parsed === "string") {
              parsed = JSON.parse(parsed);
          }
          
          if (Array.isArray(parsed)) {
              return parsed.map((i: string) => i.replace(/^\d+\.\s/, ""));
          }
      } catch (e) {
          return [""];
      }
    }
    return [""];
  });


  useEffect(() => {
      const ingredientes_validos = ingredientes.filter(i => i.trim() !== "");
      handleChange("ingredientes", JSON.stringify(
          ingredientes_validos.map((i, index) => `${index + 1}. ${i}`)
      ));
  }, [ingredientes]);

  
  // Crear un nuevo input para escribir un ingrediente
  const agregar_ingredientes = () => {
    setIngredientes([...ingredientes, ""]);
  };


  // Poder reescribir en un ingrediente
  const actualizar_ingrediente = (texto: string, index: number) => {
    const nuevo = [...ingredientes];
    nuevo[index] = texto;
    setIngredientes(nuevo);
  };


  // Eliminar ingrediente de las lista
  const eliminar_ingrediente = (index: number) => {
    const nuevo = [...ingredientes];  
    nuevo.splice(index, 1);           
    setIngredientes(nuevo);           
  };



  // ================= Estados para el dropdown de tiempo =================
  const [abrir_tipo_tiempo, setAbrir_tipo_tiempo] = useState(false);
  const [tipo_tiempo_value, setTipo_tiempo_value] = useState(plato?.tipo_tiempo ?? null);

  const [tipo_tiempo, setTipo_tiempo] = useState([
    { label: 'hr', value: 'h' },
    { label: 'min', value: 'min' }
  ]);



  // ================= Estados para el dropdown de dificultad =================
  const [abrir_dificultad, setAbrir_dificultad] = useState(false);
  const [dificultad_value, setDificultad_value] = useState(plato?.dificultad ?? null);

  const [dificultad, setDificultad] = useState([
    { label: 'Fácil', value: 'facil' },
    { label: 'Media', value: 'media' },
    { label: 'Difícil', value: 'dificil' }
  ]);



  // ================= Estados y Funciones para enviar el formulario a la otra vista =================
  // Estado del formulario 
  const [imagen_url, setImagen_url] = useState<string | null>(
      plato?.archivo && plato.archivo !== "" ? plato.archivo : null  
  );


  const [form, setForm] = useState({
      titulo: plato?.titulo ?? "",
      archivo: plato?.archivo ?? "",
      ingredientes: plato?.ingredientes ?? "",
      tiempo_preparacion: plato?.tiempo_preparacion?.toString() ?? "",
      tipo_tiempo: plato?.tipo_tiempo ?? "",
      dificultad: plato?.dificultad ?? "",
  });


  // Handle Change genérico 
  const handleChange = (campo: string, valor: string) => {
      setForm(prev => ({ ...prev, [campo]: valor }));
  };
  

  const Enviar_Siguiente = async () => {

    // ----- Validaciones -----
    const campos = [
        { nombre: "Título", valor: form.titulo },
        { nombre: "Tiempo aprox. de preparación",valor: form.tiempo_preparacion },
        { nombre: "Tipo de tiempo", valor: form.tipo_tiempo },
        { nombre: "Dificultad", valor: form.dificultad },
    ];

    // Campos obligatorios
    for (const campo of campos) {
        if (!campo.valor.trim()) {
            Mensaje_Toast.error(`"${campo.nombre}" es un campo obligatorio`);
            return;
        }
    };

    const ingredientes_validos = ingredientes.filter(i => i.trim() !== "");
    if (ingredientes_validos.length === 0) {
        Mensaje_Toast.error(`"Ingredientes" es un campo obligatorio`);
        return;
    };

    // Tiempo de preparacion es un numero
    const tiempo = Number(form.tiempo_preparacion);
    if (isNaN(tiempo) || tiempo <= 0 || !Number.isInteger(tiempo)) {
        Mensaje_Toast.error(`"Tiempo de preparación" no es valido`);
        return;
    }


    // ----- Enviar datos al formulario de descripcion y pasos -----
    const form_final = {
        ...form,
        // Convertir ingredientes en string y les agrega un indice
        ingredientes: JSON.stringify(
            ingredientes
                .filter(i => i.trim() !== "")
                .map((i, index) => `${index + 1}. ${i}`)
        ),
        plato: plato ?? undefined,
    };

    navigation.navigate("Descripcion", form_final);
  }

  

  return (
    <View style={estilos_formu_subir_receta.contenedor}>

      {/* --- Input de titulo plato --- */}
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Titulo Plato</Texto>
        <TextInput 
          style={estilos_formu_subir_receta.input}
          placeholder="Ej: Arroz Paisa"
          placeholderTextColor={"grey"}
          value={form.titulo}
          onChangeText={(valor) => handleChange("titulo", valor)}
        />
      </View> 
      
      {/* --- Subir imagen desde el dispositivo --- */}
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Imagen</Texto>
        <TouchableOpacity style={estilos_formu_subir_receta.imagePicker} onPress={elegirFuente}>
          {imagen ? (
              // Imagen nueva seleccionada del dispositivo
              <Image source={{ uri: imagen.uri }} style={estilos_formu_subir_receta.preview} />
          ) : imagen_url ? (
              // Imagen existente del servidor
              <Image source={{ uri: imagen_url }} style={estilos_formu_subir_receta.preview} />
          ) : (
              // Sin imagen
              <Texto style={estilos_formu_subir_receta.imagePlaceholder}>Toca para subir una foto</Texto>
          )}
      </TouchableOpacity>
      </View> 

      {/* --- Seccion de ingredientes --- */}
      <View style={estilos_formu_subir_receta.caja_input}>
        <Texto style={estilos_formu_subir_receta.label}>Ingredientes</Texto>
        
        {ingredientes.map((ingrediente, index) => (
          <View key={index} style={estilos_formu_subir_receta.caja_ingredientes}>
            <TextInput
              style={estilos_formu_subir_receta.input_ingrediente}
              placeholder="Ej: 2 tazas de arroz"
              placeholderTextColor={"grey"}
              value={ingrediente}
              onChangeText={(texto) => actualizar_ingrediente(texto, index)} 
            />

            <TouchableOpacity 
              onPress={() => eliminar_ingrediente(index)}
              disabled={index === 0} 
              style={{ opacity: index === 0 ? 0.3 : 1 }}
            >
              <Image
                source={require("../Img/icono-x.png")}
                style={estilos_formu_subir_receta.icono_mas}
                resizeMode="contain"
              />
            </TouchableOpacity>

          </View>
        ))}

        <TouchableOpacity onPress={agregar_ingredientes}>
          <Image
            source={require("../Img/icono-mas.png")}
            style={estilos_formu_subir_receta.icono_mas}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View> 
      
      {/* --- Seccion de tiempo de preparacion --- */}
      <View style={[estilos_formu_subir_receta.caja_input, { zIndex: 2 }]}>
        <Texto style={estilos_formu_subir_receta.label}>Tiempo aprox. de preparación</Texto>
        <View style={estilos_formu_subir_receta.caja_tiempo}>
          <TextInput 
            style={estilos_formu_subir_receta.input_ingrediente}
            placeholder="Ej: 90"
            placeholderTextColor={"grey"}
            value={form.tiempo_preparacion}
            onChangeText={(valor) => handleChange("tiempo_preparacion", valor)}
          />
          <DropDownPicker
            containerStyle={{ width: 100 }}
            style={{ 
              ...estilos_formu_subir_receta.input_tipo_tiempo, 
              minHeight: 45,
              height: 45,
            }}
            dropDownContainerStyle={{ width: 100 }}
            open={abrir_tipo_tiempo}
            value={tipo_tiempo_value}
            items={tipo_tiempo}
            setOpen={setAbrir_tipo_tiempo}
            setValue={setTipo_tiempo_value}
            setItems={setTipo_tiempo}
            placeholder="Ej: min"
            placeholderStyle={{ color: 'grey' }}
            listMode="SCROLLVIEW"
            onChangeValue={(valor) => handleChange("tipo_tiempo", valor ?? "")}
          />
        </View>
      </View> 

      {/* --- Input de dificultad --- */}
      <View style={[estilos_formu_subir_receta.caja_input, { zIndex: 1 }]}>
        <Texto style={estilos_formu_subir_receta.label}>Dificultad</Texto>
         <DropDownPicker
          open={abrir_dificultad}
          value={dificultad_value}
          items={dificultad}
          setOpen={setAbrir_dificultad}
          setValue={setDificultad_value}
          setItems={setDificultad}
          placeholder="Ej: Media"
          placeholderStyle={{ color: 'grey' }}
          listMode="SCROLLVIEW"
          onChangeValue={(valor) => handleChange("dificultad", valor ?? "")}
        />
      </View>

      {/* --- Boton para continuar con la descripcion --- */}
      <View style={estilos_formu_subir_receta.caja_boton}>
        <TouchableOpacity style={[estilos_global.btn_1, estilos_formu_subir_receta.boton]} onPress={Enviar_Siguiente}>
          <Texto style={estilos_global.texto_btn_1}>Siguiente</Texto>
        </TouchableOpacity>
      </View>

    </View>
  );
}

