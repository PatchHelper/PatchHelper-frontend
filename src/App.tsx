import React from 'react';
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainApp from './pages/MainApp';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={LandingPage}/>
                <Route path="/posts" Component={MainApp}/>
            </Routes>
        </Router>
    );
};

export default App;