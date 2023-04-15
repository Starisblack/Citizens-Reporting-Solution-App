import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddIncident from './pages/Incident/AddIncident/AddIncident';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import { AuthContextProvider } from './context/AuthContext';
import SinglePageIncident from './pages/SinglePagePost/SinglePageIncident';
import Entries from './pages/Entries/Entries';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import ThankYou from './pages/ThankYou/ThankYou';


setupIonicReact();

const App: React.FC = () => {


  return (
    <AuthContextProvider>
    <IonApp>
  
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true} component={Home}/>
           
            <Route path="/page/:name" >
              <Page />
            </Route>
      
            <Route path="/create" component={AddIncident} />
            <Route path="/incident/:id"  component={SinglePageIncident}/>
            <Route path="/page/Entries" exact={true} component={Entries}/>
            <Route path="/page/Profile" exact={true} component={Profile}/>
            <Route path="/incident/thank-you" exact={true} component={ThankYou}/>
            <Route path="/login" component={SignIn}>
            </Route>
            <Route path="/forgot-password"  component={ForgotPassword}/>
            <Route path="/sign-up" component={SignUp}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
    </AuthContextProvider>
  );
};

export default App;
