import { Navigate, useLocation} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    // formal usage 
    // let {user} = useContext(AuthContext)
    // return <Route {...rest}> {!user ? <Navigate to="/login" /> : children } </Route>

    
    
    // New Usage 
    const { user } = useContext(AuthContext); // Get the user from the context
    let location = useLocation();
    // If the user is not authenticated, redirect to the login page
    if (!user) {
        return <>
    
             <Navigate to="/login" state={{ from: location }} replace />;
        </> 
       
    } 

    // If the user is authenticated, render the children
    return children;
}
export default PrivateRoute