import CreateCaseRents from "../../components/CaseRents/CreateCaseRents"
import ListCasoRentas from "../../components/CaseRents/ListCasoRentas"
import ProtectedRoutes from "../../components/protectRoutes/ProtectRoutes"
import { BaseLayout } from "../../layout/Layout"


const CaseRentesPage = () => {
  return (
    <BaseLayout breadcrumbItems={['Rentas','gestion de Rentas']} tituloPagina="Radicación de rentas"> 
    <ProtectedRoutes roles={["ADMIN", "EDITOR"]}>
        <CreateCaseRents/>
    </ProtectedRoutes>
        <ListCasoRentas/>
    </BaseLayout>

  )
}

export default CaseRentesPage