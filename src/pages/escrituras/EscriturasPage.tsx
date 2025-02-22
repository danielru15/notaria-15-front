import ListEscrituras from "../../components/escrituras/ListEscrituras"
import { BaseLayout } from "../../layout/Layout"


const EscriturasPage = () => {
  return (
    <BaseLayout breadcrumbItems={['Escrituras', 'Gestion de Escrituras']} tituloPagina="Escrituras">
        <ListEscrituras/>
    </BaseLayout>
  )
}

export default EscriturasPage