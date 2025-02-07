
import CreateUser from '../../components/usuarios/CreateUser'
import ListUsers from '../../components/usuarios/ListUsers'
import { BaseLayout } from '../../layout/Layout'


const UsuariosPage = () => {
  return (
    <BaseLayout breadcrumbItems={['Usuarios', 'Gestion de Usuarios']}>
      <CreateUser/>
      <ListUsers/>
    </BaseLayout>
  )
}

export default UsuariosPage