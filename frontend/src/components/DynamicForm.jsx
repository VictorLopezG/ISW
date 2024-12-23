import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useProducto from '@hooks/productos/useGetProductos.jsx';

export default function DynamicForm() {

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        defaultValues: ""
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "producto"
    });

    const { productos } = useProducto();

    const opcionesP = productos.map(producto => ({
        value: producto[0].id,
        label: producto[0].nombre
    }));

    return (
        <div className="bg-[#fcecee] p-10 rounded-3xl flex flex-col items-center space-y-2">
            <form onSubmit={handleSubmit(data => console.log(data,opcionesP))}>
                {fields.map((item, index) => (
                    <div key={item.id}>
                        <label>Producto</label>
                        <select>
                            <option value="">Seleccionar opción</option>
                            {opcionesP.map((option) => (
                                <option className="options-class" key={option.id} value={option.value} >
                                    {option.label}{option.value}
                                </option>
                            ))}
                        </select>
                        <label>Cantidad</label>
                        <Controller
                            render={({ field }) => <input type="number" min={1} {...field} />}
                            name={`producto.${index}.cantidad`}
                            control={control}
                        />
                        <button type="button" onClick={() => remove(index)}>Quitar</button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ id_Producto: 0, cantidad: 0 })}
                >
                    Añadir
                </button>
                <input type="submit" />
            </form>
        </div>
    );
}