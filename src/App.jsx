import './App.css'
import Header from './components/Header'
import UserProfile from './components/UserProfile';

import AuthProvider from './store/auth-details';

import { Outlet } from 'react-router';
import DietProvider from './store/diet-details';


function App() {
  return (
    <AuthProvider>
      <DietProvider>
      <Content />
      </DietProvider>
    </AuthProvider>
  );
}

function Content() {

  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );

}

export default App
