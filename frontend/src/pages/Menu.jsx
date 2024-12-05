import Table from "../components/Table";
import useProducto from '@hooks/productos/useGetProductos.jsx';

const Menu = () => {
    const columns = [
        { title: "Nombre", field: "nombre", width: 400, responsive: 3 },
        { title: "Valor", field: "valor", width: 200, responsive: 2 },
        { title: "Stock", field: "stock", width: 100, responsive: 2 }
    ];
    const { productos } = useProducto();
    console.log(productos)
    const opcionesP = productos.map(producto => ({
        value: producto.id,
        label: producto.nombre,
        categoria: producto.categoria,
        valor: producto.valor,
        stock: producto.stock,
    }));

    return (
        <main>
            <div class="h-screen w-full bg-gradient-to-r from-rose-100 to-[#212121] flex justify-center items-center p-10">
                <div class="flex flex-col items-center space-y-4">
                    <div class="bg-[#212121] p-10 rounded-3xl flex flex-col items-center space-y-2">
                        <h1 class="text-5xl font-bold text-[#FFC107]">Menú del día</h1>
                        <Table
                            data={opcionesP}
                            columns={columns}
                            initialSortName="id"
                        />
                    </div>
                </div>
            </div >
        </main >
    )
}

export default Menu;