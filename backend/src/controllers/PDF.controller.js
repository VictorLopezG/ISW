import{
    generatePDFDia,
} from "../services/PDFGenerator.service.js"

import {
    handleErrorClient,
    handleErrorServer,
} from "../handlers/responseHandlers.js";

export const generatorPDFDiaController = async (req,res) =>{
    try{
        const [pdfBuffer,error] = await generatePDFDia();

        if(error)
        return handleErrorClient(res,404,error);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition","attachment; filename=Reporte de ventas diario.pdf");
        res.status(200).send(pdfBuffer);
        
    }catch (error){
        console.log("El error es",error);
        handleErrorServer(res,500,error.message);
    }







};
