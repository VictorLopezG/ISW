import { useState,useEffect } from "react";

const useMesa = () =>{
    const  [errorDescripcion,setErrorDescripcion] = useState('');
    const  [errorCapacidad, setErrorCapacidad] = useState('');
    const [inputData, setInputData] = useState({descripcion:'', capacidad:''})

    useEffect(() => {
        if(inputData.descripcion) setErrorDescripcion('');
        if(inputData.capacidad) setErrorCapacidad('');
    },[inputData.descripcion,inputData.capacidad]);

    const errorData = (dataMessage) => {
        if(dataMessage.dataInfo === 'Descripcion'){
            setErrorDescripcion(dataMessage.message);
        }else if (dataMessage.dataInfo === 'Capacidad'){
            setErrorCapacidad(dataMessage.message);
        }
    };

    const handleInputChange = (field,value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]:value
        }));
    };
    
    return{
        errorDescripcion,
        errorCapacidad,
        errorData,
        handleInputChange
    };
};

export default useMesa;