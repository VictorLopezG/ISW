
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { useState } from "react";

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import { Button } from "@/components/ui/button"


const Menu = () => {

    const { productos } = useProducto();
    //console.log(productos);
    const opcionesP = productos.map(producto => ({
        value: producto.id,
        label: producto.nombre,
        categoria: producto.categoria,
        valor: producto.valor,
        stock: producto.stock,
    }));

    function filtrarDisponibles(lista) {
        return Array.prototype.filter.call(lista, (producto) => producto.stock > 0);
    }

    const prodDisp = filtrarDisponibles(opcionesP);


      /**------------------------------------------------------------------------------------------------------------- */
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(8); // Puedes ajustar la cantidad de ítems por página
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = prodDisp.slice(indexOfFirstItem, indexOfLastItem);
      const nextPage = () => {
        if (currentPage < Math.ceil(prodDisp.length / itemsPerPage)) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      };
    
      const prevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        }
      };



    return (
        <main>
            <div class="h-screen w-full flex justify-center items-center p-10">

                <div class="bg-[#efefef] bg-opacity-95 p-3 rounded-3xl flex flex-col items-center space-y-2 w-3/5 border-solid border-2 border-black">


                    <Table>
                        <TableCaption className="py-1">MENU</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="py-1 font-bold">Nombre</TableHead>
                                <TableHead className="py-1 font-bold">Stock</TableHead>
                                <TableHead className="text-right py-1 font-bold">Valor</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((invoice) => (
                                <TableRow key={invoice.label}>
                                    <TableCell className="font-medium">{invoice.label}</TableCell>
                                    <TableCell className="">{invoice.stock}</TableCell>
                                    <TableCell className="text-right ">{invoice.valor}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="outlined"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-1 text-black rounded hover:bg-gray-200"
                        >
                            Anterior
                        </Button>

                        <span>
                            Página {currentPage} de {Math.ceil(prodDisp.length / itemsPerPage)}
                        </span>

                        <Button
                            variant="outlined"
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(prodDisp.length / itemsPerPage)}
                            className="px-4 py-1 text-black rounded hover:bg-gray-200"
                        >
                            Siguiente
                        </Button>
                    </div>


                </div>

            </div >
        </main >
    )
}
//nombre valor stock
export default Menu;