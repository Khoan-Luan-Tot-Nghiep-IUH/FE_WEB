import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setCredentials } from './Redux/User/userSlice';
import AppRoutes from './components/routes/routes';
import CartItems from './components/CartItems';
import FAQModal from './components/FAQModal'; // Import FAQ component
import { FaShoppingCart, FaCommentDots } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Badge } from 'antd';
import { useGetBookingDraftsQuery } from './Redux/Booking/bookingApiSlice';
import { SocketProvider } from './SocketContext';
import './reset.css';
import './globalScrollbar.css';

const useRestoreUser = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

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
  const [isFAQOpen, setIsFAQOpen] = useState(false); // Trạng thái mở modal FAQ
  const { data: cartItems = [] } = useGetBookingDraftsQuery();

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleFAQClick = () => {
    setIsFAQOpen(true);
  };

  const handleCloseFAQ = () => {
    setIsFAQOpen(false);
  };

  const itemCount = cartItems?.data?.length || 0;

  return (
    <SocketProvider>
      <div className="App bg-slate-100 min-h-screen">
        <Router>
          <AppRoutes userInfo={userInfo} />
          {userInfo?.roleId === 'user' && (
            <>
              {/* Biểu tượng Giỏ hàng */}
              <motion.div
                className="fixed bottom-4 right-16 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
                onClick={handleCartClick}
                animate={{
                  rotate: [0, 15, -15, 10, -10, 0],
                  transition: { repeat: Infinity, repeatType: 'loop', duration: 1.5 },
                }}
              >
                <Badge count={itemCount} overflowCount={9} offset={[-5, 5]}>
                  <FaShoppingCart size={30} color="#fff" />
                </Badge>
              </motion.div>
              <motion.div
                className="fixed bottom-4 right-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer"
                onClick={handleFAQClick}
                whileHover={{ scale: 1.2 }}
              >
                <FaCommentDots size={30} color="#fff" />
              </motion.div>
            </>
          )}
          {isCartOpen && <CartItems items={cartItems?.data || []} onClose={handleCloseCart} />}
          <FAQModal isOpen={isFAQOpen} onClose={handleCloseFAQ} />
        </Router>
      </div>
    </SocketProvider>
  );
};

export default App;
