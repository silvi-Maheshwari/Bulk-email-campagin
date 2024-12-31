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
                <div>
                    <AdminDashboard />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;
