import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { CommentsContextProvider } from './context/CommentsContext';
import { UserCoursesContextProvider } from './context/UserCoursesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CommentsContextProvider>
        <UserCoursesContextProvider>
          <App />
        </UserCoursesContextProvider>
      </CommentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
