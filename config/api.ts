/**
 * Normaliza la URL base del backend para que todos los fetch del proyecto
 * usen una direccion consistente, con protocolo y sin slash final.
 */
import { Platform } from 'react-native';

const DEPLOYED_API_URL = 'pruebas-o8gn.vercel.app';

const withProtocol = (url: string) => (
  /^https?:\/\//i.test(url) ? url : `https://${url}`
);

const normalizeBaseUrl = (url: string) => withProtocol(url).replace(/\/+$/, '');

// Punto central para cambiar el backend sin tocar los componentes.
export const API_BASE_URL = normalizeBaseUrl(DEPLOYED_API_URL);
