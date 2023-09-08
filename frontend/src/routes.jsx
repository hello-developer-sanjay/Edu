import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import UserProfilePage from './pages/UserProfilePage';
import ModuleDetails from "./components/ModuleDetails";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import CourseDetails from './components/CourseDetails';
import SubModuleDetails from './components/SubModuleDetails'; // Import SubModuleDetails component

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses/:title" element={<CourseDetails />} />
        <Route path="/profile/:id" component={UserProfilePage} />
        <Route path="/courses/:title/:module" element={<ModuleDetails />} />
        {/* Add SubModuleDetails route */}
        <Route path="/courses/:title/:module/submodules/:submodule" element={<SubModuleDetails />} /> 
        <Route path="/signup" component={Signup} /> {/* Add Signup route */}
        <Route path="/signin" component={Signin} /> {/* Add Signin route */}
       
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default Routes;
