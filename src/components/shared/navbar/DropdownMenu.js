import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-white"
      >
        <UserIcon className="h-8 w-8" />
        <span>Dropdown</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Thông tin tài khoản
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Đơn hàng của tôi
          </Link>
          <button
            onClick={() => console.log('Logout')}
            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
