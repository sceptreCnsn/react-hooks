import React, { useState, useReducer, useRef, useEffect, useContext, useCallback, useImperativeHandle } from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = () => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = (pageName) => {
    setPage(pageName);
  }

  const login = (value) => {
    setAuthStatus(value);
    console.log(authStatus);
  }

  return (
    <div>
      <AuthContext.Provider value={{status: authStatus, login}}>
        <Header onLoadTodos={switchPage.bind(this, 'todos')} onLoadAuth={switchPage.bind(this, 'auth')}></Header>
        <hr></hr>
        {page === 'todos' && authStatus ? <Todo /> : <Auth />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
