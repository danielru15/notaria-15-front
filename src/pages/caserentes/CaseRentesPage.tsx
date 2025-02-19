import CreateCaseRents from "../../components/CaseRents/CreateCaseRents"
import ListCasoRentas from "../../components/CaseRents/ListCasoRentas"
import { BaseLayout } from "../../layout/Layout"


const CaseRentesPage = () => {
  return (
    <BaseLayout breadcrumbItems={['Rentas','gestion de Rentas' ,'Casos Activos']}> 
        <CreateCaseRents/>
        <ListCasoRentas/>
    </BaseLayout>

  )
}

export default CaseRentesPage