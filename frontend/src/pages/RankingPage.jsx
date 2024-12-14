import React, { useEffect, useState } from 'react';

import { getVentasTotal, getVentasAnual } from '@/services/cocinaConsulta.service.js';

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"



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





const RankingPage = () => {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [ventasPorMes, setVentasPorMes] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de ventas del mes actual
    const fetchVentasTotal = async () => {
      try {
        const hola = await getVentasTotal();
        const total_pedidos = hola[0].total_pedidos;
        const total_recaudado = hola[0].total_recaudado;

        setTotalPedidos(total_pedidos);
        setTotalRecaudado(total_recaudado);
        console.log(total_pedidos, total_recaudado);
      } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
      }
    };

    // Función para obtener los datos de ventas por mes en el último año
    const fetchVentasPorAnual = async () => {
      try {
        const ventas = await getVentasAnual();
        setVentasPorMes(ventas);
        console.log(ventas);
      } catch (error) {
        console.error('Error al obtener los datos de ventas por mes:', error);
      }
    };

    fetchVentasTotal();
    fetchVentasPorAnual();
  }, []);









  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]



  const chartConfig = {
    total_recaudado: {
      label: "total_recaudado",
      color: "hsl(var(--chart-1))",
    },
  };

  console.log(chartConfig);





  return (
    <main className="items-center flex flex-col">
      <div className="w-11/12 h-screen bg-white bg-opacity-95 flex flex-col items-start  space-y-8 px-16 py-14">
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
        </div>


        <div className='flex flex-row'>
          <Card>
            <CardHeader>
              <CardTitle>Ventas desde hace un año</CardTitle>
              <CardDescription>2023-2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig } className="h-96" >
                <BarChart accessibilityLayer data={ventasPorMes}  >
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
                  <Bar dataKey="total_recaudado" fill="goldenrod" radius={8}  />
                </BarChart>
              </ChartContainer>
            </CardContent>

          </Card>
        </div>
      </div>
    </main>
  );
};

export default RankingPage;
