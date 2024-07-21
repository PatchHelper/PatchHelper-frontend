import React from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainApp from './pages/MainApp';
import PatchDetail from './pages/PatchDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';

import { Navbar, Footer } from './components';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col justify-start w-full min-h-[100vh] overflow-x-hidden gap-y-16">
                <Navbar/>
                    <Routes>
                        <Route path="/" Component={LandingPage}/>
                        <Route path="/patches" Component={MainApp}/>
                        <Route path="/patches/:title" Component={PatchDetail}/>

                        <Route path="/register" Component={Register}/>
                        <Route path="/login" Component={Login}/>
                        <Route path="/logout" Component={Logout}/>
                        <Route path="/profile/me" Component={ProfileEdit}/>
                        <Route path="/profile/:id" Component={ProfileView}/>
                    </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;