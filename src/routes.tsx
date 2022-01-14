import { Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login/indexLogin'
import CreateLogin from './pages/CreateLogin/indexCreateLogin'
import DeleteLogin from './pages/DeleteLogin/indexDeleteLogin'
import User from './pages/UserPage/indexUser'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact/>
            <Route component={CreateLogin} path="/create-login"/>            
            <Route component={DeleteLogin} path="/delete-login"/>            
            <Route component={User} path="/user-page"/>            
        </BrowserRouter>
    )
}

export default Routes