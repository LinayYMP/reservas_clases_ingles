import React, {createContext, useContext, useState} from "react";
import { CLASES } from "../data/clases";

//Guarda los cupos de cada clase para que no se reinicien al salir de la pantalla de detalle

const ReservasContext = createContext(null);

const cuposIniciales = Object.fromEntries(CLASES.map((clase) => [clase.id, clase.cupos]));

export function ReservasProvider ({children}) {
    const [cuposPorClase, setCuposPorClase] = useState(cuposIniciales);

    const reservarCupo = (id) => {
        setCuposPorClase((actual) => ({...actual, [id]: Math.max(actual[id] - 1, 0)}));
    };

    return (
        <ReservasContext.Provider value={{cuposPorClase, reservarCupo}}>
            {children}
        </ReservasContext.Provider>
    );
}

export function useReservas () {
    return useContext(ReservasContext);
}
