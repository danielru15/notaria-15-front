export interface CasoRentas {
  user_id: number;
  numero_escritura: string;
  fecha: string;
  radicado: string;
  observaciones?: string;
}

export interface CasoRentasResponse {
  id: number;
  radicado: string;
  observaciones: string;
  estado: string;
  pdf: boolean;
  numero_escritura: string;
  name: string;
  last_name: string;
  email: string;
  fecha?:string;
  user_id:number;
  escritura_id:number
}
