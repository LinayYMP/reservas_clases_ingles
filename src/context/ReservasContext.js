import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS  =  '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservaProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState (true);

    //cargar las reaervas que tengo guardadas, si no tengo nada me devuelve un arreglo vacio 

    useEffect (()=>{
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if(guardado !== null) {
                    setReservas(JSON.parse(guardado))
                }
            }catch (error) {
                console.log ('error leyendo  reservas:' , error);
            }finally{
                setCargando(false)
            }
        };
        cargar();
    },[])
}
