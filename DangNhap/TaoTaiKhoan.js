import { get, getDatabase, push, ref } from 'firebase/database';
import React, { useState } from 'react'
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function TaoTaiKhoan() {
    const navigate = useNavigate();
    const [state,setState] = useState({
        taikhoan:'',
        matkhau:'',
        loaiND:''
    })
    const [errorMessage, setErrorMessage] = useState('');

    const isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState((a) => ({
            ...a,
            [name]:value
        }))
    }

    const add = async (taikhoan,matkhau,loaiND) => {
        const db = getDatabase(app);
        const database = ref(db, 'DangNhap');

        // Kiểm tra xem tài khoản đã tồn tại chưa
        const snapshot = await get(database);
        const existingAccounts = Object.values(snapshot.val() || {});
        const isAccountExist = existingAccounts.some(account => account.TaiKhoan === taikhoan);

        if (isAccountExist) {
            setErrorMessage('Tài khoản đã tồn tại');
            alert('tài khoản đã có người sử dụng')
            return;
        }

        // Nếu không tồn tại thì thêm vào database
        const item = {
            TaiKhoan: taikhoan,
            MatKhau: matkhau,
            NguoiDung: loaiND,
        };
        push(database, item);
        alert('Đăng kí thành công , mời bạn đăng nhập.');

        navigate('/');
    }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-green-200">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
              <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Thêm tài khoản</h2>
              <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Tên tài khoản
                  </label>
                  <input
                      type="text"
                      id="username"
                      name="taikhoan"
                      onChange={(event) => isChange(event)}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Nhập tên tài khoản"
                  />
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Mật khẩu
                  </label>
                  <input
                      type="password"
                      id="password"
                      name="matkhau"
                      onChange={(event) => isChange(event)}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Nhập mật khẩu"
                  />
              </div>
              <div className="mb-4">
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                      Loại người dùng
                  </label>
                  <select
                      id="userType"
                      name="loaiND"
                      onChange={(event) => isChange(event)}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  >
                      <option value="" disabled selected>
                          Chọn loại người dùng
                      </option>
                      <option value="NhanVien">Nhân viên</option>
                      <option value="Admin">Admin</option>
                  </select>
              </div>
              <button
                  type="button"
                  onClick={() => add(state.taikhoan,state.matkhau,state.loaiND)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all focus:outline-none "
              >
                  Thêm
              </button>
          </div>
      </div>
  )
}
