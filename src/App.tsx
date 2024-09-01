import React, { useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import LandingPage from './pages/LandingPage';
import MainApp from './pages/MainApp';
import PatchDetail from './pages/PatchDetail';
import Register from './pages/Register';
import Login from './components/Login';
import Logout from './pages/Logout';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';
import Patches from './pages/Patches';
import UserPatchesEdit from './pages/UserPatchesEdit';
import UserPatchesList from './pages/UserPatchesList';

import { Navbar, Footer, PatchCreate } from './components';

const App: React.FC = () => {

    useEffect(() => {
        AOS.init({duration: 2000, mirror: true});
    });

    return (
        <Router>
            <div className="flex flex-col justify-start w-full min-h-[100vh] overflow-x-hidden gap-y-16">
                <Navbar/>
                <AnimatedTransition />
                <Footer />
            </div>
        </Router>
    );
};

const AnimatedTransition: React.FC = () => {
    const location = useLocation();

    return (
        <TransitionGroup>
        <CSSTransition key={location.key} timeout={300} classNames="fade">
            <Routes location={location}>
                <Route path="/" Component={LandingPage}/>
                <Route path="/patches" Component={MainApp}/>
                <Route path="/patches/new" Component={PatchCreate}/>
                <Route path="/patches/:uuid" Component={PatchDetail}/>
                <Route path="/files" Component={Patches}/>

                <Route path="/register" Component={Register}/>
                <Route path="/login" element={ <Login nextPage='/patches'/> }/>
                <Route path="/logout" Component={Logout}/>
                <Route path="/profile/me" Component={ProfileEdit}/>
                <Route path="/profile/:id" Component={ProfileView}/>
                <Route path="/profile/me/patches" Component={UserPatchesEdit}/>
                <Route path="/profile/:id/patches" Component={UserPatchesList}/>
            </Routes>
        </CSSTransition>
    </TransitionGroup>
    )
};

export default App;