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
