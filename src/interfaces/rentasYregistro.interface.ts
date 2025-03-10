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

export interface RentasYRegistro {
  valor_rentas: number;
  metodo_pago_rentas: "efectivo" | "pse";
  valor_registro: number;
  metodo_pago_registro: "efectivo" | "pse";
  devoluciones: number;
  excedentes: number;
  observaciones: string;

}