import React, { useEffect, useState } from 'react';

import { getVentasTotal, getVentasAnual, getVentasProductos, getPeriodoService  } from '@/services/cocinaConsulta.service.js';

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"

const RankingPage = () => {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [rankingProductos, setRankingProductos] = useState([]);
  const [productoEstrella, setProductoEstrella] = useState(null);
  const [horarioPeack, setHorarioPeack] = useState([]);

  useEffect(() => {
    const fetchVentasTotal = async () => {
      try {
        const hola = await getVentasTotal();
        const total_pedidos = hola[0].total_pedidos;
        const total_recaudado = hola[0].total_recaudado;

        setTotalPedidos(total_pedidos);
        setTotalRecaudado(total_recaudado);
      } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
      }
    };

    const fetchVentasPorAnual = async () => {
      try {
        const ventas = await getVentasAnual(2024);
        setVentasPorMes(ventas);
      } catch (error) {
        console.error('Error al obtener los datos de ventas por mes:', error);
      }
    };

    const fetchRankingProductos = async () => {
      try {
        const ranking = await getVentasProductos();
        setRankingProductos(ranking || []);
        if (ranking.length > 0) {
          setProductoEstrella(ranking[0]);
        }
      } catch (error) {
        console.error('Error al obtener el ranking de productos más vendidos:', error);
      }
    };

    const fetchHorarioPeack = async () => {
      try {
        const horario = await getPeriodoService();
        setHorarioPeack(horario || []);
        console.log(horario);
      } catch (error) {
        console.error('Error al obtener el horario peack:', error);
      }
    };


    fetchVentasTotal();
    fetchVentasPorAnual();
    fetchRankingProductos();
    fetchHorarioPeack();
  }, []);

  const chartConfig = {
    total_recaudado: {
      label: "total_recaudado",
      color: "hsl(var(--chart-1))",
    },
  };

  const opcionesP = rankingProductos.map(producto => ({
    label: producto.producto,
    stock: producto.total_vendido,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = opcionesP.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(opcionesP.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <main className="items-center flex flex-col">
      <div className="w-11/12 h-screen bg-white bg-opacity-95 flex flex-col items-start space-y-8 px-16 py-14">
        <div className='flex flex-row space-x-8 '>
          <Card className="max-w-sm bg-white w-72 ">
            <CardHeader>
              <h3 className="text-sm text-muted-foreground text-black">Ventas del Mes</h3>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-3xl font-bold text-black">${totalRecaudado}</p>
              <p className="text-sm text-green-500">Total ventas: </p>
            </CardContent>
          </Card>



          <Card className="max-w-sm bg-white w-72">
            <CardHeader>
              <h3 className="text-sm text-muted-foreground text-black">Total Pedidos del Mes</h3>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-3xl font-bold text-black">{totalPedidos}</p>
              <p className="text-sm text-green-500">Total Pedidos: </p>
            </CardContent>
          </Card>



          <Card className="max-w-sm bg-white w-72">
            <CardHeader>
              <h3 className="text-sm text-muted-foreground text-black">Producto Estrella</h3>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-3xl font-bold text-black">{productoEstrella?.producto || "null"}</p>
              <p className="text-sm text-green-500">Cant. vendidas: {productoEstrella?.total_vendido || "null"}</p>
            </CardContent>
          </Card>

          <Card className="max-w-sm bg-white w-72">
            <CardHeader>
              <h3 className="text-sm text-muted-foreground text-black">horario peack</h3>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-3xl font-bold text-black">{horarioPeack[0]?.horario|| "null"}</p>
              <p className="text-sm text-green-500">Cant. vendidas: {horarioPeack[0]?.cantidad || "null"}</p>
            </CardContent>
          </Card>


        </div>

        <div className='flex flex-row space-x-8'>
          <Card>
            <CardHeader>
              <CardTitle>Ventas desde hace un año</CardTitle>
              <CardDescription>2023-2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart accessibilityLayer data={ventasPorMes}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="total_recaudado" fill="goldenrod" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="bg-white bg-opacity-100 border-2 border-[#e3e8ef]  rounded-2xl p-4 w-96">
            <Table>
              <TableCaption className="py-1">Ranking historico de Productos</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-1 font-bold">Nombre</TableHead>
                  <TableHead className="py-1 font-bold">cant. vendidas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((invoice) => (
                  <TableRow key={invoice.label}>
                    <TableCell className="font-medium">{invoice.label}</TableCell>
                    <TableCell className="">{invoice.stock}</TableCell>
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
                Página {currentPage} de {Math.ceil(opcionesP.length / itemsPerPage)}
              </span>

              <Button
                variant="outlined"
                onClick={nextPage}
                disabled={currentPage === Math.ceil(opcionesP.length / itemsPerPage)}
                className="px-4 py-1 text-black rounded hover:bg-gray-200"
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RankingPage;
