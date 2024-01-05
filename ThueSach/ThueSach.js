import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, updateDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Header from '../NhanVien/Header';

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const LapPhieuThueSach = () => {
    const [maDocGia, setMaDocGia] = useState('');
    const [maSach, setMaSach] = useState('');
    const [ngayThue, setNgayThue] = useState(getCurrentDate());
    const [books, setBooks] = useState([]);
    const [docGia, setDocGia] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const booksQuery = query(collection(firestore, 'books'));
            const booksSnapshot = await getDocs(booksQuery);
            const booksData = booksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBooks(booksData);
        };

        const fetchDocGia = async () => {
            const docGiaQuery = query(collection(firestore, 'docgia'));
            const docGiaSnapshot = await getDocs(docGiaQuery);
            const docGiaData = docGiaSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDocGia(docGiaData);
        };

        fetchBooks();
        fetchDocGia();
    }, []);

    const handleSubmit = async () => {
        try {
            // Tìm độc giả và sách được chọn
            const selectedDocGia = docGia.find((dg) => dg.id === maDocGia);
            const selectedBook = books.find((book) => book.id === maSach);

            // Kiểm tra mã độc giả và mã sách
            if (!selectedDocGia || !selectedBook) {
                setError('Mã độc giả hoặc mã sách không tồn tại.');
                return;
            }

            // Chuyển đổi trường soLuong từ chuỗi thành số
            const soLuongSach = parseInt(selectedBook.soLuong, 10);

            // Kiểm tra xem giá trị có thể chuyển đổi thành số và lớn hơn 0 không
            if (!isNaN(soLuongSach) && soLuongSach > 0) {
                // Thực hiện phép trừ và cập nhật vào Firestore
                await updateDoc(doc(firestore, 'books', maSach), {
                    soLuong: soLuongSach - 1,
                });

                // Thêm phiếu thuê sách vào Firestore
                const thueSachRef = await addDoc(collection(firestore, 'thuesach'), {
                    maDocGia,
                    maSach,
                    ngayThue,
                });

                console.log('Đã lập phiếu thuê sách với ID:', thueSachRef.id);
                setError('');
            } else {
                setError('Số lượng sách không hợp lệ.');
            }
        } catch (error) {
            console.error('Lỗi khi lập phiếu thuê sách:', error.message);
            setError('Đã xảy ra lỗi khi lập phiếu thuê sách.');
        }
    };


    return (
        <div>
            <Header/>
            <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-md">

                <h1 className="text-3xl font-semibold mb-6 text-center">Lập phiếu thuê sách</h1>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="maDocGia" className="block text-sm font-medium text-gray-600 mb-1">Mã độc giả:</label>
                        <select
                            id="maDocGia"
                            name="maDocGia"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={maDocGia}
                            onChange={(e) => setMaDocGia(e.target.value)}
                        >
                            <option value="">Chọn mã độc giả</option>
                            {docGia.map((dg) => (
                                <option key={dg.id} value={dg.id}>{dg.id} - {dg.hoTen}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="maSach" className="block text-sm font-medium text-gray-600 mb-1">Mã sách:</label>
                        <select
                            id="maSach"
                            name="maSach"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={maSach}
                            onChange={(e) => setMaSach(e.target.value)}
                        >
                            <option value="">Chọn mã sách</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>{book.id} - {book.tenSach}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ngayThue" className="block text-sm font-medium text-gray-600 mb-1">Ngày thuê:</label>
                        <input
                            type="date"
                            id="ngayThue"
                            name="ngayThue"
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={ngayThue}
                            onChange={(e) => setNgayThue(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Lập phiếu thuê
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LapPhieuThueSach;
