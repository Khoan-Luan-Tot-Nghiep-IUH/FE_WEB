import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setCredentials } from './Redux/User/userSlice';
import AppRoutes from './components/routes/routes';
import CartItems from './components/CartItems';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Badge } from 'antd';
import { useGetBookingDraftsQuery } from './Redux/Booking/bookingApiSlice';
import { SocketProvider } from './SocketContext';
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
  const { data: cartItems = [] } = useGetBookingDraftsQuery();

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const itemCount = cartItems?.data?.length || 0;

  return (
    <SocketProvider>
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
              <Badge count={itemCount} overflowCount={9} offset={[-5, 5]}>
                <FaShoppingCart size={30} color="#fff" />
              </Badge>
            </motion.div>
          )}
          {isCartOpen && <CartItems items={cartItems?.data || []} onClose={handleCloseCart} />}
        </Router>
      </div>
    </SocketProvider>
  );
};

export default App;
