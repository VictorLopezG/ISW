import { useState,useEffect } from "react";

const useProducto = () =>{
    const [errorNombre, setErrorNombre] = useState('');
    const [errorValor, setErrorValor] = useState('');
    const [errorStock, setErrorStock] = useState('');
    const [errorCategoria, setErrorCategoria] = useState('');
    const [inputData, setInputData] = useState({nombre:'',valor:'',stock:'',categoria:''})
    
        useEffect(() => {
            if (inputData.nombre) setErrorNombre('');
            if (inputData.valor) setErrorValor('');
            if (inputData.stock) setErrorStock('');
            if (inputData.categoria) setErrorCategoria 
        }, [inputData.nombre, inputData.valor,inputData.stock,inputData.categoria]);
    
        const errorData = (dataMessage) => {
            if(dataMessage.dataInfo === 'Nombre'){
                setErrorNombre(dataMessage.message);
            } else if (dataMessage.dataInfo === 'Valor'){
                setErrorValor(dataMessage.message);
            } else if (dataMessage.dataInfo === 'Stock'){
                setErrorStock(dataMessage.message);
            } else if (dataMessage.dataInfo=== 'Categoria'){
                setErrorCategoria(dataMessage.message);
            }
        };
        
        const handleInputChange = (field,value) => {
            setInputData(prevState => ({
                ...prevState,
                [field]:value
            }));
        };
    return{
        errorNombre,
        errorValor,
        errorStock,
        errorCategoria,
        errorData,
        handleInputChange,
    };
};
export default useProducto;