import React from 'react';

//import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Globalstyle from './styles/global';

import ToastContainer from './components/ToastContainer/index';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
      <AuthProvider>
      <SignIn />
      </AuthProvider>

      <ToastContainer />

      <Globalstyle />
  </>
);
export default App;
