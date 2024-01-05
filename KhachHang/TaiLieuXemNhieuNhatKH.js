import React, { useContext, useEffect, useState } from "react";
import demen from "../img/demenphieuluuky.jpg";
import { Data } from "../Context";
import { Link } from "react-router-dom";

export default function TaiLieuMoiNhatAd() {

  const { xemnhieu } = useContext(Data);


  return (
    <div className="mt-10 grid grid-cols-6 gap-4">
      {xemnhieu.map((data, index) => (
        <Link key={index} to={`/chitietxemnhieukh/${index}`} className="">
          <img className="h-[200px] w-[150px] mb-3" src={data.hinh} alt="" />
          <span className="text-xl font-bold">{data.name} </span>
        </Link>
      ))}
    </div>
  );









  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   // Lấy dữ liệu từ Firestore
  //   const fetchData = async () => {
  //     try {
  //       const snapshot = await getDocs(collection(firestore, 'books'));
  //       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //       setBooks(data);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   fetchData();
  //   const unsubscribe = onSnapshot(collection(firestore, 'books'), (snapshot) => {
  //     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setBooks(data);
  //   });
  // }, []);

  // const deleteBook = async (id) => {
  //   try {
  //     // Xóa sách từ Firestore
  //     await deleteDoc(doc(firestore, 'books', id));

  //     // Cập nhật state để hiển thị danh sách sách mới
  //     setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  //     await deleteDoc(doc(firestore, 'books', id));
  //   } catch (error) {
  //     console.error('Error deleting book: ', error);
  //   }
  // };




  // return (
  //   <div className=" mt-10 grid grid-cols-6 gap-4">
  //     {books.map((book) => (
  //       <Link key={book.id} to={`/chitietad/${book.id}`}>
  //         <img className="h-[200px] w-[150px] mb-3" src={book.imageURL} alt="" />
  //         <span className="text-xl font-bold">{book.tenSach} </span>
  //       </Link>
  //     ))}


  //   </div>
  // );
}

