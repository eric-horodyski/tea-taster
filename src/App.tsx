import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './tea/TeaPage';

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
import { SplashScreen } from '@capacitor/splash-screen';
import { useEffect } from 'react';
import LoginPage from './login/LoginPage';
import TeaPage from './tea/TeaPage';
import './theme/global.css';
import { AuthInterceptorProvider, PrivateRoute, SessionProvider } from './core/session';
import { TeaProvider } from './tea/TeaProvider';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => { if (isPlatform('capacitor')) SplashScreen.hide(); }, []);

  return (
    <IonApp>
      <SessionProvider>
        <AuthInterceptorProvider>
          <TeaProvider>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route exact path="/tea">
                  <PrivateRoute>
                    <TeaPage />
                  </PrivateRoute>
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Route exact path="/">
                  <Redirect to="/tea" />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </TeaProvider>
        </AuthInterceptorProvider>
      </SessionProvider>
    </IonApp>
  );
}

export default App;
