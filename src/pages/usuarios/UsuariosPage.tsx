import ProtectedRoutes from '../../components/protectRoutes/ProtectRoutes'
import CreateUser from '../../components/usuarios/CreateUser'
import ListUsers from '../../components/usuarios/ListUsers'
import { BaseLayout } from '../../layout/Layout'


const UsuariosPage = () => {
  return (
    <BaseLayout breadcrumbItems={['Usuarios', 'Gestion de Usuarios']} tituloPagina='Gestion de usuarios'>
      <ProtectedRoutes roles={["ADMIN", "EDITOR"]}>
        <CreateUser/>
      </ProtectedRoutes>
      <ListUsers/>
    </BaseLayout>
  )
}

export default UsuariosPage