import PDFDocument from "pdfkit-table";
import { 
    getPDFanoService,
    getPDFDiaService, 
    getPDFmesService,
    getPDFSemanaService,
} from "./PDFConsultas.service.js"



export async function generatePDFDia() {
    try {
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        let consultdata,consultdata2,consultdata3,consultdata4;
        let total1 = 0;
        let total2 = 0;
        let total3 = 0;
        let total4 = 0;

        consultdata = await getPDFDiaService();
        consultdata2 = await getPDFSemanaService();
        consultdata3 = await getPDFmesService();
        consultdata4 = await getPDFanoService();

        const pdfBuffer = await new Promise((resolve, reject) => {
            const buffers = [];
            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => resolve(Buffer.concat(buffers)));
            doc.on("error", reject);

            const table1 = {
                title: { label: "Informe de ventas del dia",color: "black" },
                headers: ["Producto","Valor","Cantidad"],
                rows: consultdata.map(consult => 
                    [   
                        consult.producto, 
                        consult.valor,
                        consult.cantidad,
                    ],
                ),
            };

            consultdata.map(consult=> total1+=consult.valor*consult.cantidad)

            const table2 = {
                title: { label: "Informe de ventas de la semana",color: "black" },
                headers: ["Producto","Valor","Cantidad"],
                rows: consultdata2.map(consult => 
                    [   
                        consult.producto, 
                        consult.valor,
                        consult.cantidad,
                    ],
                ),
            };

            consultdata2.map(consult=> total2+=consult.valor*consult.cantidad)

            const table3 = {
                title: { label: "Informe de ventas del mes",color: "black" },
                headers: ["Producto","Valor","Cantidad"],
                rows: consultdata3.map(consult => 
                    [   
                        consult.producto, 
                        consult.valor,
                        consult.cantidad,
                    ],
                ),
            };

            consultdata3.map(consult=> total3+=consult.valor*consult.cantidad)

            const table4 = {
                title: { label: "Informe de ventas del año",color: "black" },
                headers: ["Producto","Valor","Cantidad","Mes"],
                rows: consultdata4.map(consult => 
                    [   
                        consult.producto, 
                        consult.valor,
                        consult.cantidad,
                        consult.mes,
                    ],
                ),
            };

            consultdata4.map(consult=> total4+=consult.valor*consult.cantidad)

            doc.table(table1, { startY:50 });
            doc.text(`El total del dia es: $${total1}
                `);
            doc.table(table2, { startY:50 });
            doc.text(`El total de la semana es: $${total2}
                `);
            doc.table(table3, { startY:50 });
            doc.text(`El total del mes es: $${total3}
                `);
            doc.table(table4, { startY:50 });
            doc.text(`El total del año es: $${total4}
                `);
            doc.end();
        });
        return[pdfBuffer,null];
    }catch (error){
        return [null,error.message || "Error al generar el PDF"];
    }
}
