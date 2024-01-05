import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { firestore } from '../firebase';

export default function SuaDocGia(props) {
    const { id } = useParams();
    const [hoTen, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSDT] = useState('');
    const [ngaysinh, setNgaySinh] = useState('');
    console.log("ID", id);

    const handleUpdate = async () => {
        // Thêm logic cập nhật độc giả ở đây
        try {
            // Lấy dữ liệu độc giả từ Firestore
            const docRef = doc(firestore, 'docgia', id);
            const docSnap = await getDoc(docRef);

            // Kiểm tra xem có dữ liệu hay không trước khi cập nhật
            if (docSnap.exists()) {
                // Lấy thông tin độc giả
                const docGiaData = docSnap.data();

                // Cập nhật thông tin mới
                const updatedData = {
                    ...docGiaData,
                    hoTen: hoTen,
                    email: email,
                    sdt: sdt,
                    ngaySinh: ngaysinh,
                };

                // Thực hiện cập nhật dữ liệu trên Firestore
                await setDoc(docRef, updatedData);

                // Thông báo cập nhật thành công hoặc chuyển hướng đến trang danh sách độc giả
                alert('Cập nhật độc giả thành công');
                // Nếu muốn chuyển hướng, sử dụng history.push hoặc Link từ react-router-dom
            } else {
                console.log('Độc giả không tồn tại');
            }
        } catch (error) {
            console.error('Error updating docGia: ', error);
        }
    };

    const handleChange = (event) => {
        // Thêm logic xử lý sự kiện thay đổi giá trị input ở đây
        const { name, value } = event.target;
        switch (name) {
            case 'hoTen':
                setHoTen(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'ngaySinh':
                setNgaySinh(value);
                break;
            case 'sdt':
                setSDT(value);
                break;
            default:
                break;
        }
    };

    const fetchData = async () => {
        try {
            // Lấy dữ liệu độc giả dựa vào id từ Firestore
            const docRef = doc(firestore, 'docgia', id);
            const docSnap = await getDoc(docRef);

            // Kiểm tra xem có dữ liệu hay không trước khi set state
            if (docSnap.exists()) {
                const docGiaData = docSnap.data();
                setHoTen(docGiaData.hoTen || '');
                setEmail(docGiaData.email || '');
                setSDT(docGiaData.sdt || '');
                setNgaySinh(docGiaData.ngaySinh || '');
            } else {
                console.log('Độc giả không tồn tại');
            }
        } catch (error) {
            console.error('Error fetching docGia: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    
    return (
        <div className="bg-gray-100 py-8">
            <h3 className="text-3xl font-semibold text-center mb-8">Sửa độc giả</h3>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-md p-6">
                        <label htmlFor="maDG" className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                        <input
                            type="text"
                            id="hoTen"
                            value={hoTen}
                            name="hoTen"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            placeholder="Họ và tên"
                        />
                        {/* Thêm các trường khác nếu cần */}
                    </div>

                    <div className="bg-white rounded-md p-6">
                        <label htmlFor="tenDG" className="block text-sm font-medium text-gray-600 mb-1">email</label>
                        <input
                            type="email"
                            value={email}
                            id="email"
                            name="email"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            placeholder="email"
                        />
                        {/* Thêm các trường khác nếu cần */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className="bg-white rounded-md p-6">
                        <label htmlFor="cmnd" className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh</label>
                        <input
                            type="date"
                            id="ngaySinh"
                            name="ngaySinh"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            placeholder="Ngày sinh"
                            value={ngaysinh}
                        />
                        {/* Thêm các trường khác nếu cần */}
                    </div>

                    <div className="bg-white rounded-md p-6">
                        <label htmlFor="sdt" className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                        <input
                            type="number"
                            id="sdt"
                            value={sdt}
                            name="sdt"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={handleChange}
                            placeholder="Số điện thoại"
                            defaultValue={sdt}
                        />
                        {/* Thêm các trường khác nếu cần */}
                    </div>
                </div>

                <div className="flex mt-8">
                    <Link to='/docgia' className="w-1/3">
                        <button className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Quay lại</button>
                    </Link>
                    <Link to='/docgia' className="w-2/3">
                        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={() => handleUpdate(id)}>Sửa</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
