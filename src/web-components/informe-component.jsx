import React, { useState, useEffect } from "react"; // Importacion de React y las funciones nativas de React
import { getData, getDataAll } from "../api-services/api-service"; // Importacionde las funciones para manejo de datos de la API
import {Home} from "./home-component"; // Importacionde de Home

export const InformeComponent = () => {
    const [data, setData] = useState(null); // Estado para almacenar la data del lote seleccionado
    const [lotes, setLotes] = useState([]); // Estado para almacenar la lista a seleccionar de lotes
    const [LoteId, setLoteId] = useState(''); // Estado para almacenar eñ ID del lote seleccionado
    const [back, setBack] = useState(false); // Estado para gestionar el boton hacia atras

    // useEffect para obtener la lista de lotes cuadno el componente se monta
    useEffect(() => {
        const fetchLotes = async () => {
            try {
                const baseUrl = 'https://665637279f970b3b36c4a8f5.mockapi.io'; // Url base de la API
                const endpoint = 'Lotes'; // Endpoint para obtener los lotes
                const lotesData = await getDataAll(baseUrl, endpoint); // Obtener los datos de todos los lotes almacenados en la API
                setLotes(lotesData); // Alturaliza el estado con la lista de lotes
            } catch (error) {
                console.error('Error al obtener los lotes:', error); // Manejo de errores
            }
        };

        fetchLotes();
    }, []);

    // useEffect para obtener los detalles del lote seleccionado
    useEffect(() => {
        if (LoteId) {
            const fetchLotDetails = async () => {
                try {
                    const baseUrl = 'https://665637279f970b3b36c4a8f5.mockapi.io'; // URL base de la API
                    const endpoint = 'Lotes'; // Endpoint para obtener los lotes
                    const id = LoteId; // ID del lote seleccionado
                    const loteData = await getData(baseUrl, endpoint, id); // Obtener los datos del lote seleccionado
                    setData(loteData); // Actualiza el estado con la data del lote seleccionado
                } catch (error) {
                    console.error('Error al obtener los detalles del lote:', error); // Manejo de errores
                }
            };

            fetchLotDetails();
        }
    }, [LoteId]);

    // Funcion para manejar el cambio de la seleccion del lote
    const handleLotChange = (e) => {
        setLoteId(e.target.value); // Actuliza el ID del lote seleccionado
    };

    // Funcion para manejar el boton hacia atras
    const btnBack = () => {
        setBack(true); // Actualiza el estado para volver hacia atras
    };

    // Renderiza el componente si el estado de back es true
    if (back) {
        return <Home />;
    }

    // Renderiza el html con sus respectivos eventos y variables configuradas anteriormente
    return (
        <>
            <div className="container-infoLote">
                <button className="button" onClick={btnBack}>
                    ← Volver
                </button>
                <img src="public/imgs/flores.png" alt="" className="lila" />
                <div className="infoLote">
                    <h2>Costos Lote</h2>
                    <div>
                        <span>Seleccionar Lote:</span>
                        <select id="lot-selector" value={LoteId} onChange={handleLotChange}>
                            <option value="">Selecciona</option>
                            {lotes.map((lot) => (
                                <option key={lot.id} value={lot.id}>
                                    Lote {lot.id}
                                </option>
                            ))}
                        </select>
                    </div>
                    {data ? (
                        <ul>
                            <li>Prenda: {data.prenda}</li>
                            <li>Cantidad: {data.cantidad}</li>
                            <li>Tiempo: {data.tiempo}</li>
                            <li>Empleados: {data.empleados}</li>
                            <li>Tela Usada: {data.TelaUsada}</li>
                            <li>Botón Usado: {data.BotonUsado}</li>
                            <li>Cierre Usado: {data.CierreUsado}</li>
                            <li>Hilo Usado: {data.HiloUsado}</li>
                            <li>Costo de Mano de Obra: {data.costMano}</li>
                            <li>Costo de Materiales: {data.costMateria}</li>
                            <li>Total del Lote: {data.totalLote}</li>
                        </ul>
                    ) : (
                        <span>Selecciona un lote para ver los detalles</span>
                    )}
                </div>
            </div>
        </>
    );
};
