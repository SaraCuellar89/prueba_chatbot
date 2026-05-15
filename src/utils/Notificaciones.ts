import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { Mensaje_Toast } from './Mensaje_Toast';

// Pedir permisos y obtener token
export const obtener_token_fcm = async (): Promise<string | null> => {
  try {
    // Pedir permiso (necesario en iOS, recomendado en Android 13+)
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      Mensaje_Toast.error('Permiso denegado para notificaciones');
      return null;
    }

    const token = await messaging().getToken();
    return token;

  } catch (error) {
    console.log('Error obteniendo token FCM:', error);
    return null;
  }
};

// Escuchar notificaciones en primer plano
export const escuchar_notificaciones = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Mensaje_Toast.info(
      `${remoteMessage.notification?.title}: ${remoteMessage.notification?.body}`
    );
  });

  return unsubscribe; // llama esto para detener el listener
};