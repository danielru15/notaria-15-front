import CreateRentasyRegistro from "../../components/rentasyregistro/CreateRentasyRegistro"
import ListRyR from "../../components/rentasyregistro/ListRyR"
import { BaseLayout } from "../../layout/Layout"


const RentasyRegistro = () => {
  return (
    <BaseLayout tituloPagina="RENTAS Y REGISTRO">
        <CreateRentasyRegistro/>
        <ListRyR/>
    </BaseLayout>
  )
}

export default RentasyRegistro