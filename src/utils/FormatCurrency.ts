 export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  export const formatNumber = (number: number) => {
    return number.toLocaleString('es-CO');
  }