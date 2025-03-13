export interface RentasYRegistroResponse {
    id: number;
    nombre_completo: string;
    numero_escritura: string;
    fecha: string; 
    valor_rentas: number;
    metodo_pago_rentas: string;
    valor_registro: number;
    metodo_pago_registro: string;
    total_facturas_canceladas: number;
    total_facturas_sin_cancelar: number;
    total_ryr: number;
    devoluciones: number;
    excedentes: number;
    observaciones: string | null;
    total_rentasyregistro: number;
}




export interface Factura {
  numero_factura: string;
  valor: number;
  estado: "cancelado" | "sin cancelar";
}

export interface RentasYRegistro {
  escritura_id?: number;
  valor_rentas: number;
  metodo_pago_rentas: "pse" | "efectivo";
  valor_registro: number;
  metodo_pago_registro: "pse" | "efectivo";
  fecha?: string;
  devoluciones?: number;
  excedentes?: number;
  facturas?: Factura[];
}
