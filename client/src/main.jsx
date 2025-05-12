import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {AuthProvider} from './context/AuthContext.jsx'
import { BrowserRouter } from "react-router";
import {UserMethodsProvider} from './context/UserMethods.jsx';
import './main.css';
import {PostProvider} from './context/PostMethods.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider> 
        <PostProvider>
          <UserMethodsProvider>
            <App />
          </UserMethodsProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
)
