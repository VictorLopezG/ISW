

const Admin_local = () => {
    return (
<main className="container flex justify-center items-center h-screen bg-gradient-to-r from-yellow-500 to-gray-900 p-4">
    <form className="bg-red-100 p-7 flex flex-col rounded-2xl items-center w-11/12 max-w-md md:w-full">
        <h1 className="text-gray-900 text-xl md:text-3xl font-bold mb-4 md:mb-8">Crear un pedido</h1>
        
        <div className="w-full flex flex-col mb-2">
            <label className="text-gray-900 font-bold mb-1">Mesa del pedido</label>
            <select
                name="IDmesa"
                className="p-2 border-3 border-gray-900 rounded-lg mb-2 text-blue-900 bg-blue-50 focus:bg-blue-100
                           appearance-none bg-[url('../assets/ChevronDownIcon.svg')] bg-no-repeat bg-[calc(100%-12px)_center]"
                required
            >
                {/* Opciones del select */}
            </select>
        </div>

        <div className="w-full flex flex-col mb-2">
            <label className="text-gray-900 font-bold mb-1">Descripción</label>
            <input
                type="text"
                name="descripcion"
                placeholder="Inserte descripción del pedido"
                className="p-2 border-3 border-gray-900 rounded-lg mb-2 text-gray-900 bg-red-100 focus:bg-blue-100"
                pattern="^[a-zA-Z0-9 ]+$"
                title="Debe contener solo letras y números"
            />
        </div>

        <div className="w-full flex flex-col mb-2">
            <label className="text-gray-900 font-bold mb-1">Total</label>
            <input
                type="text"
                name="total"
                placeholder="Suma de los productos solicitados"
                className="p-2 border-3 border-gray-900 rounded-lg mb-2 text-gray-900 bg-red-100"
                disabled
            />
        </div>

        <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gray-900 text-red-100 font-bold mt-2 border-3 border-yellow-500
                        hover:border-gray-900 hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
        >
            Crear Pedido
        </button>

        <div className="error-message text-xs text-red-500 h-5 mt-2 hidden"> {/* Mensaje de error */}
            {/* Mensaje de error aquí */}
        </div>
    </form>
</main>







    );
};

export default Admin_local