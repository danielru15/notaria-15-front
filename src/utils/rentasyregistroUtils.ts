export const getBoletaUrl = (radicado: string) => {
    return `https://mercurio.antioquia.gov.co/mercurio/servlet/ControllerMercurio?command=anexos&tipoOperacion=abrirLista&idDocumento=${radicado}&tipDocumento=R&now=${Date.now()}&ventanaEmergente=S&origen=NTR`;
  };