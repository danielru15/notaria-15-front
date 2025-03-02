import App from "../../components/rentasyregistro/FacturasTable"
import ListRyR from "../../components/rentasyregistro/ListRyR"
import { BaseLayout } from "../../layout/Layout"


const RentasyRegistro = () => {
  return (
    <BaseLayout tituloPagina="RENTAS Y REGISTRo">
        <ListRyR/>
    </BaseLayout>
  )
}

export default RentasyRegistro