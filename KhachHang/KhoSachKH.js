import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import NavKH from './NavKH';

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        // Lấy dữ liệu từ Firestore
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(firestore, 'books'));
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBooks(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
        const unsubscribe = onSnapshot(collection(firestore, 'books'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBooks(data);
        });
    }, []);

    const deleteBook = async (id) => {
        try {
            // Xóa sách từ Firestore
            await deleteDoc(doc(firestore, 'books', id));

            // Cập nhật state để hiển thị danh sách sách mới
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            await deleteDoc(doc(firestore, 'books', id));
        } catch (error) {
            console.error('Error deleting book: ', error);
        }
    };

    const searchBooks = () => {
        // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sách
        if (!searchTerm) {
            const fetchData = async () => {
                try {
                    const snapshot = await getDocs(collection(firestore, 'books'));
                    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setBooks(data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };

            fetchData();
        } else {
            // Nếu có từ khóa tìm kiếm, lọc danh sách sách
            const filteredBooks = books.filter((book) =>
                book.tenSach.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Hiển thị danh sách sách đã lọc
            setBooks(filteredBooks);
        }
    };

    return (
        <div>
            <div className="min-h-screen mt-24 bg-primary flex items-center justify-center">
                <NavKH />
                <div className="w-full ">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sách"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300"
                        />

                        <button
                            onClick={searchBooks}
                            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    <h1 className=" m-auto mt-[20px] text-3xl font-bold mb-8 text-center">Book Management</h1>
                     {/* Thêm nút "Thêm Sách" với Link ở đầu bảng */}
                    {/* <div className="mb-8 bg-blue-500 text-white py-2 px-4 rounded-full float-right">
                       
                        <Link to="/createItem" className="text-white bg-blue-500 px-4 py-2 rounded mb-4">
                            Thêm Sách
                        </Link>
                    </div>
                    <div className="mb-8 bg-green-500 text-white py-2 px-4 rounded-full float-right">
                        <Link to="/thueSach" className="text-white bg-green-500 px-4 py-2 rounded mb-4">
                            Thuê sách
                        </Link>
                    </div> */}
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b">Hình</th>
                                <th className="py-2 px-4 border-b">Tên</th>
                                <th className="py-2 px-4 border-b">Tác giả</th>
                                <th className="py-2 px-4 border-b">Ngôn ngữ</th>
                                <th className="py-2 px-4 border-b">Giá</th>
                                <th className="py-2 px-4 border-b">Số lượng</th>
                                {/* <th className="py-2 px-4 border-b">Hàng động</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id} className="text-center">
                                    <td className=" py-2 px-4 border-b">
                                        <Link to={`/chitietad/${book.id}`}  >
                                            <img
                                                src={book.imageURL}
                                                alt={book.tenSach}
                                                className='w-20 h-120 m-auto'
                                            />
                                        </Link>
                                    </td>
                                    <td className="py-2 px-4 border-b">{book.tenSach}</td>
                                    <td className="py-2 px-4 border-b">{book.tacGia}</td>
                                    <td className="py-2 px-4 border-b">{book.ngonNgu}</td>
                                    <td className="py-2 px-4 border-b">{book.gia}</td>
                                    <td className="py-2 px-4 border-b">
                                        {/* <button
                                        className="bg-red-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-red-600 focus:outline-none"
                                        onClick={() => deleteBook(book.id)}
                                    >
                                        Xóa
                                    </button>
                                    <Link to={`/suasach/${book.id}`}
                                        className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-red-600 focus:outline-none"
                                    >
                                        Sửa
                                    </Link> */}
                                        {book.soLuong}
                                    </td>
                                    {/* <td>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-red-600 focus:outline-none"
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            Xóa
                                        </button>
                                        <Link to={`/suasach/${book.id}`}
                                            className="bg-green-500 text-white px-3 py-1 rounded transition duration-300 hover:bg-red-600 focus:outline-none"
                                        >
                                            Sửa
                                        </Link>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookManagement;
