import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { async } from '@firebase/util';
import Nav from './Nav';

export default function SuaNhanVien() {
    const { id } = useParams();

    const [tennv, setTenNV] = useState('');
    const [chucvu, setChucVu] = useState(null);
    const [sdt, setSDT] = useState('');
    const [CMND, setCMND] = useState('');
    const [email, setEmail] = useState('');
    const [diaChi, setDiaChi] = useState('');

    const update = async () => {
        const docRef = doc(firestore, 'NguoiDung', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const nDungData = docSnap.data();

            const updateData = {
                ...nDungData,
                nguoiDung: tennv,
                chucVu: chucvu,
                SDT: sdt,
                CMND: CMND,
                email: email,
                diaChi: diaChi
            };
            await setDoc(docRef, updateData);
            alert('Cập nhập thành công');
        } else {
            console.log('Người dùng không tồn tại');
            alert('Cập nhập thất bại');
        }
    }

    const fetchData = async () => {
        try {
            const docRef = doc(firestore, 'NguoiDung', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const nDungData = docSnap.data();
                setTenNV(nDungData.nguoiDung || ''); // Sử dụng setTenNV cho tên nhân viên
                setChucVu(nDungData.chucVu || ''); // Sử dụng setChucVu cho chức vụ
                setSDT(nDungData.SDT || '');
                setCMND(nDungData.CMND || '');
                setEmail(nDungData.email || '');
                setDiaChi(nDungData.diaChi || '');
            } else {
                console.log('Nhân viên không tồn tại');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div>
            <Nav/>
            <div className='mt-24'>
                <form className="bg-cover bg-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8 rounded shadow-md max-w-md mx-auto">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Sửa nhân viên</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="tennv" className="block text-sm font-medium text-white mb-2">
                                Tên nhân viên
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={tennv}
                                onChange={(e) => setTenNV(e.target.value)}
                                className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="position" className="block text-sm font-medium text-white mb-2">
                                Chức vụ
                            </label>
                            <select
                                onChange={(e) => setChucVu(e.target.value)}
                                id="position"
                                name="position"
                                className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Chọn chức vụ
                                </option>
                                <option value={chucvu} className="text-black" >
                                    Nhân viên
                                </option>
                                <option value={chucvu} className="text-black" >
                                    Admin
                                </option>
                                {/* Thêm các chức vụ khác nếu cần */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-2">
                                Số điện thoại
                            </label>
                            <input
                                value={sdt}
                                onChange={(e) => setSDT(e.target.value)}
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="idCard" className="block text-sm font-medium text-white mb-2">
                                Số CMND
                            </label>
                            <input
                                value={CMND}
                                onChange={(e) => setCMND(e.target.value)}
                                type="number"
                                id="idCard"
                                name="idCard"
                                className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-white mb-2">
                                Địa chỉ
                            </label>
                            <input
                                value={diaChi}
                                onChange={(e) => setDiaChi(e.target.value)}
                                type="text"
                                id="address"
                                name="address"
                                className="text-black mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <Link to='/admin/nguoidung'
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all focus:outline-none"
                        >
                            Quay lại
                        </Link>
                        <button
                            type="button"
                            onClick={() => update()}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all focus:outline-none"
                        >
                            Sửa nhân viên
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
