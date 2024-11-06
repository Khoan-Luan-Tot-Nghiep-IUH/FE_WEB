import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setCredentials } from './Redux/User/userSlice';
import AppRoutes from './components/routes/routes';
import CartItems from './components/CartItems';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import framer-motion
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: 'Vé xe Hà Nội - TP.HCM', price: 100000 },
    { name: 'Vé xe Đà Nẵng - TP.HCM', price: 120000 },
  ]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="App bg-slate-100 min-h-screen">
      <Router>
        <AppRoutes userInfo={userInfo} />
        {userInfo?.roleId === 'user' && (
          <motion.div
            className="fixed bottom-4 right-4 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
            onClick={handleCartClick}
            animate={{
              rotate: [0, 15, -15, 10, -10, 0],
              transition: { repeat: Infinity, repeatType: "loop", duration: 1.5 }
            }}
          >
            <FaShoppingCart size={24} color="#fff" />
          </motion.div>
        )}
        {isCartOpen && <CartItems items={cartItems} onClose={handleCloseCart} />}
      </Router>
    </div>
  );
};

export default App;
