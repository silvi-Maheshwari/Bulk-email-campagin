import { useState } from "react";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./pages/login";
// import AdminDashboard from "./pages/AdminDashboard";
// import Login from "./pages/Login";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") ? true : false);

    const handleLoginSuccess = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <div>
            {loggedIn ? (
                <div  >
                    <div style={{textAlign:"right"}}>
                     <button style={{textAlign:"right", padding:"10px", backgroundColor:"rgb(76, 175, 80)",color:"white"}} onClick={handleLogout}>Logout</button>
                     </div>
                    <AdminDashboard />
                   
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;
