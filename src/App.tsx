import React from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainApp from './pages/MainApp';
import PatchDetail from './pages/PatchDetail';

import { Navbar, Footer } from './components';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col w-full overflow-x-hidden gap-y-16">
            <Navbar/>
                <Routes>
                    <Route path="/" Component={LandingPage}/>
                    <Route path="/patches" Component={MainApp}/>
                    <Route path="/patches/:title" Component={PatchDetail}/>
                </Routes>
            <Footer />
            </div>
        </Router>
    );
};

export default App;