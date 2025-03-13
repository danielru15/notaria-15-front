import TotalRegistro from "../../components/rentasyregistro/TotalRegistro"
import { BaseLayout } from "../../layout/Layout"


const InformeNotario = () => {
  return (
    <BaseLayout tituloPagina="Informe Notario">
    <div style={{ display: "flex", gap: "16px" }}>
        <div style={{width:'60%'}}>
        
        </div>
        <div style={{width:'40%'}}>     
         <TotalRegistro/>
        </div>
    </div>
    </BaseLayout>
  )
}

export default InformeNotario