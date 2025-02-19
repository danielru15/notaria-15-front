export interface Escritura {
    id?:number,
    numero_escritura: string;
    user_id: number;
    fecha: string; // 'YYYY-MM-DD'
}

export interface EscrituraResponse {
    escritura_id: number;
    numero_de_escritura: string;
    fecha_de_escritura: string; 
    usuario_id: number;
    nombre_usuario: string;
    apellido_usuario: string;
    email:string
}