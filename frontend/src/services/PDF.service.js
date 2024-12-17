import axios from './root.service.js';

export async function PDFDelDia() {
    try {
        const response = await axios.get(
            '/PDF/Dia',
            { responseType: 'blob' }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a'); 
        link.href = url;
        link.setAttribute(
            'download', 
            'informe de ventas.pdf'
        );
        document.body.appendChild(link); 
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error descargando el PDF:', error);
        return error.response.data;
    }
}