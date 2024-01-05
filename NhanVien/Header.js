//rafce
import React, { useState } from "react";
import Logo from "../img/open-book.png";
import Avatar from "../img/avt.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { useStateValue } from "../context/stateprovider";
import { actionType } from "../context/reducer";

const Header = () => {
  const fireAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(fireAuth, provider);
      // console.log(user);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
    } else {

      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });

  };

  return (
    <div className="fixed z-10 w-screen top-0 bg-pink-300 p-6">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/trangchunv" className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-2xl font-bold  font-serif">
            Library Online
          </p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 text-lg">
            <Link to='/kho' className=" text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Kho
            </Link>
            {/* <Link to = '/createItem' className=" text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Thêm Sách
            </Link> */}
            <Link to='/docgia' className=" text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Độc giả
            </Link>
            <li className=" text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Hướng dẫn
            </li>
            <Link to = '/' className=" text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Đăng Nhập
            </Link>
          </ul>
          {/* giỏ hàng  có biểu tương vs số lượng*/}
          {/* <div className='relative flex items-center justify-center'>
            <MdShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer"></MdShoppingCart>
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold"> 2 </p>
            </div>
          </div> */}
          {/* <div to="/createItem" className="relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer"
              src={user ? user.photoURL : Avatar}
              alt="aVATAR"
              onClick={login}
            />
            {isMenu && (
              <div className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0'>
                <Link onClick={() => setIsMenu(false)} to='/createItem' className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'><MdAdd />New Item</Link>
                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}><MdLogout />Logout</p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
