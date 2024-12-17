import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { createSolicitud ,getSolicitud, updateSolicitud} from '../services/solicitud.service';

export default function PopupSolicitud({ show, setShow, data,id_Pedido }) {
    const productData = data && data.length > 0 ? data[0] : {};

    function filtrarCategoria(lista, categoria) {
        return Array.prototype.filter.call(lista, (producto) => producto.categoria.includes(categoria));
    }

    const platosFondo = filtrarCategoria(data, 'plato de fondo');
    const postres = filtrarCategoria(data, "postre");
    const bebestibles = filtrarCategoria(data, "bebestible");
    const entradas = filtrarCategoria(data, "entrada");
    const ensaladas = filtrarCategoria(data, "ensalada");

    const handleSubmit = async(formData) => {
        console.log(formData);
        const{id_Producto,cantidad}=formData;
        try{
            const response= await getSolicitud({id_Producto,id_Pedido});
            if(response.status!=='Client error'){
                const cant =response.data.cantidad;
                try{
                    const resp= await updateSolicitud({id_Pedido,id_Producto,cantidad:cantidad+cant,estado:'pendiente'});
                
                }catch(error){
                    console.log(error);
                }
            }
        }catch(error){
            console.log(error);
        }
        try {
            response = await createSolicitud({id_Pedido,id_Producto,cantidad,estado:"pendiente"});
   
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title='Añadir producto al pedido'
                        fields={[
                            {
                                label: "seleccione",
                                name: "id_Producto",
                                fieldType: 'select',
                                type: "input",
                                required: true,
                                options: data
                            },
                            {
                                label: "Cantidad",
                                name: "cantidad",

                                min:0,  
                                placeholder: 1,
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                max: data.stock,
                            }
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Agregar al pedido"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}