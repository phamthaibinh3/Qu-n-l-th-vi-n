import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export default function ThemNhanVien() {
    const [nguoiDung, setNguoiDung] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapShot = await getDocs(collection(firestore, 'NguoiDung'));
                const data = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNguoiDung(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const xoa = async (id) => {
        await deleteDoc(doc(firestore, 'NguoiDung', id));

        setNguoiDung((a) => a.filter((b) => b.id !== id));
        await deleteDoc(doc(firestore, 'NguoiDung', id));
        alert('xóa thành công')
    };

    return (
        <div>
            <Nav/>
            <div className=" container mx-auto mt-24">

                <h1 className="text-3xl font-semibold mb-6">Danh Sách Nhân Viên</h1>
                <Link to='/admin/taotaikhoan'
                    type="button"
                    className=" mb-5 float-right w-full md:w-auto ml-0 md:ml-auto border-none outline-none px-12 py-2 text-white text-lg font-semibold bg-emerald-500 rounded-lg"

                >
                    Thêm
                </Link>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Tên Nhân Viên</th>
                            <th className="py-2 px-4 border-b">SDT</th>
                            <th className="py-2 px-4 border-b">CMND</th>
                            <th className="py-2 px-4 border-b">email</th>
                            <th className="py-2 px-4 border-b">Nơi ở</th>
                            <th className="py-2 px-4 border-b">Chức Vụ</th>
                            <th className="py-2 px-4 border-b">hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nguoiDung.map(nd => (
                            <tr key={nd.id}>
                                <td className="py-2 px-4 border-b text-center">{nd.nguoiDung}</td>
                                <td className="py-2 px-4 border-b text-center">{nd.SDT}</td>
                                <td className="py-2 px-4 border-b text-center">{nd.CMND}</td>
                                <td className="py-2 px-4 border-b text-center">{nd.email}</td>
                                <td className="py-2 px-4 border-b text-center">{nd.diaChi}</td>
                                <td className="py-2 px-4 border-b text-center">{nd.chucVu}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button onClick={() => xoa(nd.id)} type='button' className='bg-red-300 rounded-full p-2'>Xóa</button>
                                    <Link to={`/admin/suanguoidung/${nd.id}`} type='button' className='bg-green-300 rounded-full p-2'>Sửa</Link >
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
