import { createPedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import  useMesas from '@hooks/mesas/useGetMesas.jsx';
import { useEffect,useState } from 'react';

const Pedidos = () => {

    const { mesas, fetchMesas, setMesas }=useMesas();
    const crearSubmit = async (data) => {
        try {
            const response = await createPedido(data);
            if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="container">
            <Form
                title="Crear un pedido"
                fields={[
                    {
                        label: "Id de la mesa",
                        name: "IDmesa",
                        placeholder: "",
                        fieldType: 'select',
                        type: "int",
                        required: true,
                        minLength: 25,
                        maxLength: 30,
                        
                    },
                    {
                        label: "Descripcion",
                        name: "descripcion",
                        placeholder: "Inserte descripcion del pedido",
                        fieldType: 'input',
                        type: "string",
                        required: false,
                        minLength: 0,
                        maxLength: 255,
                        pattern: /^[a-zA-Z0-9]+$/,
                        patternMessage: "Debe contener solo letras y números",
                        onChange: (e) => handleInputChange('descripcion', e.target.value)
                    },
                    {
                        label: "Total",
                        name: "total",
                        placeholder: "suma de los productos solicitados",
                        disabled: true,
                        type: "int",
                        required: false,
                        minLength: 0,   
                        maxLength: 255,
                    },
                ]}
                buttonText="Crear Pedido"
                onSubmit={crearSubmit}
            />
            <div class="w-64">
  <label for="selectExample" class="block text-sm font-medium text-gray-700">Selecciona una opción:</label>
  <select id="selectExample" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
    {
        mesas.map(mesa=>(
            <option key={mesa[0].id}>{mesa[0].descripcion}</option>
        ))
    }
  </select> 
</div>
        </main>
        
    );
};

export default Pedidos;