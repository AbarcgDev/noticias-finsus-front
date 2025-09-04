import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { PublicScreen } from './screens/Public'
import { Admin } from './screens/Admin'
import api from "./api.json"

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicScreen />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

async function authenticateWithApi() {
  // OBTENER EL JWT DE CLOUDFLARE ACCESS
  // Cloudflare Access agrega el JWT como una cookie llamada `CF_Authorization`.
  const getCookie = (nombre: string) => {
    const nombreCookie = nombre + "=";
    const cookiesDecodificadas = decodeURIComponent(document.cookie);
    const arrayCookies = cookiesDecodificadas.split(';');

    for (let i = 0; i < arrayCookies.length; i++) {
      let cookie = arrayCookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nombreCookie) === 0) {
        return cookie.substring(nombreCookie.length, cookie.length);
      }
    }
    return "";
  };

  const cfJwt = getCookie('CF_Authorization');
  if (!cfJwt) {
    console.error('No se encontró el JWT de Cloudflare Access. El usuario no está autenticado.');
    return;
  }

  //ENVIAR EL JWT A UN ENDPOINT DE TU API PARA INICIAR EL PROCESO
  try {
    const response = await fetch(`${api.url}${api.endpoints.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cfJwt: cfJwt }),
    });

    if (!response.ok) {
      throw new Error('La autenticación con la API falló.');
    }

    const data = await response.json();
    const apiAccessToken = data.token;

    // 3. ALMACENAR Y USAR EL TOKEN DE LA API
    console.log('Autenticación con la API exitosa. Token recibido.');
    // Guarda el token en memoria (ej. una variable) para su uso posterior.
    sessionStorage.setItem('apiAccessToken', apiAccessToken);

    // Ejemplo: hacer una petición a un recurso protegido con el nuevo token
    const protectedResource = await fetch('/api/recurso-protegido', {
      headers: {
        'Authorization': `Bearer ${apiAccessToken}`
      }
    });

    const protectedData = await protectedResource.json();
    console.log('Datos del recurso protegido:', protectedData);

  } catch (error) {
    console.error('Error durante el proceso de autenticación de la API:', error);
  }
}

window.addEventListener('DOMContentLoaded', authenticateWithApi);

export default App