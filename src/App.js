import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setCredentials } from './Redux/User/userSlice';
import AppRoutes from './components/routes/routes';
import './reset.css';
import './globalScrollbar.css';
const useRestoreUser = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !userInfo) {
      const user = JSON.parse(storedUser);
      dispatch(setCredentials(user));
      console.log('User info restored from localStorage');
    }
  }, [dispatch, userInfo]);

  return userInfo;
};

const App = () => {
  const userInfo = useRestoreUser(); 

  return (
    <div className="App">
    <Router>
      <AppRoutes userInfo={userInfo} />
    </Router>
    </div>
  );
};

export default App;
