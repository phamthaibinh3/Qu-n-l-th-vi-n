import React, { useEffect, useState } from 'react'
import { docgia, updateDocGia } from '../utils/firebaseFunction'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import Nav from '../Admin/Nav';
import Header from '../NhanVien/Header';

export default function DocGiaAdmin(props) {
    const [datadocgia, setDocgia] = useState([]);
    const [hoten, setHoTen] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSDT] = useState('');
    const [ngaysinh, setNgaySinh] = useState('');

    const save = () => {
        if (!hoten || !email || !sdt || !ngaysinh) {
            alert('bạn phải điền đủ thông tin độc giả');
        } else {
            const data = {
                id: `${Date.now()}`,
                hoTen: hoten,
                email: email,
                sdt: sdt,
                ngaySinh: ngaysinh
            }
            docgia(data);
            alert('thành công');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(firestore, 'docgia'));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDocgia(data);
        };
        fetchData();
    }, []);

    const xoa = async (id) => {
        try {
            // Xóa sách từ Firestore
            await deleteDoc(doc(firestore, 'docgia', id));

            // Cập nhật state để hiển thị danh sách sách mới
            setDocgia((prevBooks) => prevBooks.filter((book) => book.id !== id));
            await deleteDoc(doc(firestore, 'docgia', id));
        } catch (error) {
            console.error('Error deleting book: ', error);
        }
    };

    return (
        <div>
            <Nav/>
            <div className="container mx-auto p-8 bg-white shadow-lg rounded-md mt-16 flex">
                {/* Danh sách độc giả dưới dạng bảng */}
                <div className="w-2/3 pr-8">
                    <h1 className="text-3xl font-semibold mb-6 text-center">Quản lý độc giả</h1>
                    <table className="min-w-full border rounded-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b">Họ và tên</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Ngày tham gia</th>
                                <th className="py-2 px-4 border-b">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datadocgia.map((dg) => (
                                <tr key={dg.id} className="bg-white">
                                    <td className="py-2 px-4 border-b">{dg.hoTen}</td>
                                    <td className="py-2 px-4 border-b">{dg.email}</td>
                                    <td className="py-2 px-4 border-b">{dg.ngaySinh}</td>
                                    <td className="py-2 px-4 border-b">
                                        <div className='grid grid-cols-2 gap-3'>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-red-600 focus:outline-none"
                                                onClick={() => xoa(dg.id)}
                                            >
                                                Xóa
                                            </button>
                                            <Link to={`/suadocgia/${dg.id}`}
                                                className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-red-600 focus:outline-none"
                                            >
                                                Cập nhập
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {/* Thêm các mục độc giả tương ứng */}
                        </tbody>
                    </table>
                </div>
                {/* Khối thêm mới độc giả bên phải của bảng */}
                <div className="w-1/3">
                    <h2 className="text-xl font-semibold mb-2">Thêm mới độc giả</h2>
                    <form >
                        <div className="">
                            <div className="mb-4">
                                <label htmlFor="ho-ten" className="block text-sm font-medium text-gray-600 mb-1">Họ và tên:</label>
                                <input onChange={(e) => setHoTen(e.target.value)} value={hoten} type="text" id="ho-ten" name="ho-ten" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email:</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" name="email" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh:</label>
                                <input onChange={(e) => setNgaySinh(e.target.value)} value={ngaysinh} type="date" id="email" name="email" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">SDT:</label>
                                <input onChange={(e) => setSDT(e.target.value)} value={sdt} type="number" id="email" name="email" className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="w-full md:w-auto ml-0 md:ml-auto border-none outline-none px-12 py-2 text-white text-lg font-semibold bg-emerald-500 rounded-lg"
                            onClick={save}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}
