import CreateCaseRents from "../../components/CaseRents/CreateCaseRents"
import { BaseLayout } from "../../layout/Layout"


const CaseRentesPage = () => {
  return (
    <BaseLayout breadcrumbItems={['rentas', 'casos activos']}> 
        <CreateCaseRents/>
    </BaseLayout>

  )
}

export default CaseRentesPage