import * as XLSX from "xlsx";

 export const descargarInforme = (fechaFiltro:string , datosTabla:any) => {
        const ws = XLSX.utils.json_to_sheet(datosTabla);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Informe Registro");
        XLSX.writeFile(wb, `informe_registro_${fechaFiltro}.xlsx`);
    };