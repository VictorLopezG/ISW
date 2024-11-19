import React from "react";
import { useForm, useFieldArray,Controller } from "react-hook-form";
import CloseIcon from '@assets/XIcon.svg';
import '@styles/form.css';

export default function DynamicForm({ show, setShow, data }) {

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        defaultValues:""
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
    });

    return (
        <div className="bg">
            <div className="popup">
                    <form onSubmit={handleSubmit(data => console.log(data))}>
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <ul>
                            {data.map((item, index) => (
                                <div key={item.id}>
                                    <check {...register(`test.${index}.id_Producto`)} />
                                    <Controller
                                        render={({ field }) => <input {...field} />}
                                        name={`test.${index}.cantidad`}
                                        control={control}
                                    />
                                    <button type="button" onClick={() => remove(index)}>Delete</button>
                                </div>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => append({ id_Producto: 0, cantidad: 0 })}
                        >
                            append
                        </button>
                        <input type="submit" />
                    </form>
            </div>
        </div>
    );
}