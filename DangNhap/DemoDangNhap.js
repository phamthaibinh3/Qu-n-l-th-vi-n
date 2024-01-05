import React, { useEffect, useState } from 'react';
import { ref, get, child, getDatabase, onValue } from 'firebase/database';
import { app } from '../firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function DemoDangNhap() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [state, setState] = useState({
        taiKhoan: '',
        matKhau: '',
        nguoiDung: ''
    })

    useEffect(() => {
        const arrData = [];
        const db = getDatabase(app);
        const database = ref(db, 'DangNhap');
        onValue(database, (snapshot) => {
            snapshot.forEach(function (childSnapShot) {
                var key = childSnapShot.key;
                var TaiKhoan = childSnapShot.val().TaiKhoan;
                var MatKhau = childSnapShot.val().MatKhau;
                var NguoiDung = childSnapShot.val().NguoiDung;
                // console.log(TaiKhoan);
                arrData.push({
                    id: key,
                    MatKhau: MatKhau,
                    NguoiDung: NguoiDung,
                    TaiKhoan: TaiKhoan,
                })
                setData(arrData);
            })
        })
    }, []);

    const isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log('name: ', name);
        // console.log('value: ', value);
        setState((a) => ({
            ...a,
            [name]: value
        }))
    }
    // console.log(data);
    const login = () => {

        const { taiKhoan, matKhau, nguoiDung } = state;

        console.log('Dữ liệu từ Firebase:', data); // Log dữ liệu từ Firebase
        console.log('State:', state); // Log dữ liệu từ State

        // Chuyển đổi matKhau sang kiểu số nếu cần thiết
        const matKhauNumber = parseInt(matKhau, 10);

        // Kiểm tra xem có user nào khớp với thông tin đăng nhập không
        const user = data.find((user) => user.TaiKhoan === taiKhoan && user.MatKhau === matKhauNumber && user.NguoiDung === nguoiDung);
        console.log(user);

        if (user) {
            console.log('Đăng nhập thành công');
            if (nguoiDung === "NhanVien") {
                navigate('/trangchunv');
            } else {
                navigate('/trangchuad');
            }
            // alert('1');
        } else {
            // Đăng nhập thất bại
            console.log('Đăng nhập thất bại');
            // alert('2')
        }
    }

    return (
        <div className='bg-gray-100 h-screen flex items-center justify-center'>
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Đăng Nhập</h1>
                {/* Form đăng nhập */}
                <form>
                    {/* Lựa chọn loại người dùng */}
                    <div className="mb-4">
                        <label htmlFor="userType" className="block text-sm font-medium text-gray-600">Loại người dùng</label>
                        <select
                            id="nguoiDung"
                            name="nguoiDung"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            onChange={(event) => isChange(event)}
                        >

                            <option value="Admin">Admin</option>
                            <option value="NhanVien">Nhân Viên</option>
                        </select>
                    </div>
                    {/* Ô nhập tên đăng nhập */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="taiKhoan"
                            name="taiKhoan"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            onChange={(event) => isChange(event)}
                        />
                    </div>
                    {/* Ô nhập mật khẩu */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            id="matKhau"
                            name="matKhau"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            onChange={(event) => isChange(event)}
                        />
                    </div>
                    {/* Nút đăng nhập */}
                    <div className='flex'>
                        <button onClick={() => login()} type="button" className="bg-blue-500 text-white p-2 rounded w-full" >
                            Đăng Nhập
                        </button>
                        {/* <Link to='/admin/taotaikhoan'  type="button" className= "bg-green-600 text-white text-center p-2 rounded w-full" >
                            Đăng kí
                        </Link> */}
                    </div>
                </form>
            </div>
        </div>
    );
}
