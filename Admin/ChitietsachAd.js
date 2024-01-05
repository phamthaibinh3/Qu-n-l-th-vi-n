import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Nav from './Nav';

export default function ChitietsachAd(props) {
    const { id } = useParams(); // Lấy ID từ URL

    const [book, setBook] = useState(null);

    useEffect(() => {
        // Hàm để lấy thông tin sách từ Firestore dựa trên ID
        const fetchBookData = async () => {
            try {
                const bookDoc = await getDoc(doc(firestore, 'books', id));
                if (bookDoc.exists()) {
                    setBook({ id: bookDoc.id, ...bookDoc.data() });
                } else {
                    console.log('Sách không tồn tại');
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sách: ', error);
            }
        };

        fetchBookData(); // Gọi hàm lấy dữ liệu khi component được render
    }, [id]); // Chỉ gọi lại khi ID thay đổi

    if (!book) {
        return <div>Loading...</div>; // hoặc thể hiện một thông báo khác nếu sách không tồn tại
    }

  return (
    <div>
    <Nav />


    <div className="flex mt-24" style={{ justifyContent: 'space-between' }}>
        <div className="w-1/5 ml-10" style={{ marginRight: 30 }}>
            <img
                src={book.imageURL}
                alt=""
            />
        </div>


        <div className="w-4/5 mr-10 ml-10">
            <div className="header-name  ">
                <span className="text-black text-3xl ">Text</span>
                <h1 className="font-bold text-2xl border-b-2 " >{book.tenSach}</h1>
            </div>
            <div className="note border-b-2 text-slate-400	">
                <p>{book.moTa}</p>
            </div>
            <div className="detail mt-1 " >
                        <h2 className='scroll-mt-2 text-2xl'>Chi tiết</h2>
                        <ul className='col-12'>
                            <li className="flex col-12">
                                <div className="name col-3">Tác giả :</div>
                                <div className="content col-9">{book.tacGia}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Loại sách :</div>
                                <div className="content col-9">{book.loaiSach}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Ngôn ngữ :</div>
                                <div className="content col-9">{book.ngonNgu}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Giá :</div>
                                <div className="content col-9">{book.gia}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Số lượng :</div>
                                <div className="content col-9">{book.soLuong}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Tệp đính kèm</div>
                                <div className="content col-9"> : Không tìm thấy dữ liệu</div>
                            </li>
                        </ul>
                    </div>

        </div>

    </div>
</div>
  );
}






















// import React, { useContext } from 'react'
// import avt from '../img/avt.jpg'
// import sach from '../img/dacnhantam.jpg'
// import { Data } from "../Context";
// import { } from '../data/datatailieumoi.json'
// export default function Chitietsach(props) {

//     const { tailieu } = useContext(Data);

    
//     return (
//         <div className="flex" style={{ justifyContent: "space-between" }}>
//             {tailieu.map((item) => (
//                 <div className="w-1/5 ml-10" style={{ marginRight: 30 }}>
//                     <img
//                         src={item.links.images[0].url}
//                         alt=""
//                     />
//                 </div>
//             ))}

//             <div className="w-4/5 mr-10 ml-10">
//                 <div className="header-name  ">
//                     <span className="text-black text-3xl ">Text</span>
//                     <h1 className="font-bold text-2xl border-b-2 " >Đắc Nhân Tâm</h1>
//                 </div>
//                 <div className="note border-b-2 text-slate-400	">
//                     <p> Trong ví dụ của bạn, scroll-margin-bottom: 1.5rem;, điều này có nghĩa là khi phần tử trở thành mục tiêu của một URL với định danh đoạn, sẽ có một lề dưới là 1.5 rem (tương đương với 24 pixel, giả sử kích thước mặc định của font là 16 pixel) được thêm vào phần tử, tạo ra khoảng trắng phía dưới nó. </p>
//                 </div>
//                 <div className="detail mt-1 " >
//                     <h2 className='scroll-mt-2 text-2xl'>Chi tiết</h2>
//                     <ul className='col-12'>
//                         <li className="flex col-12">
//                             <div className="name col-3">Tác giả :</div>
//                             <div className="content col-9">Nguyễn Nhật Ánh</div>
//                             <div className="content col-9">{props.tacgia}</div>
//                         </li>
//                         <li className="flex col-12">
//                             <div className="name col-3">Thông tin xuất bản :</div>
//                             <div className="content col-9">Tp.Hồ Chí Minh : Trẻ., 2023</div>
//                         </li>
//                         <li className="flex col-12">
//                             <div className="name col-3">Mô tả vật lý :</div>
//                             <div className="content col-9">100 trang , 25*20cm</div>
//                         </li>
//                         <li className="flex col-12">
//                             <div className="name col-3">Ngôn ngữ :</div>
//                             <div className="content col-9">Tiếng Việt</div>
//                         </li>
//                         <li className="flex col-12">
//                             <div className="name col-3">Lần xuất bản :</div>
//                             <div className="content col-9">2</div>
//                         </li>
//                         <li className="flex col-12">
//                             <div className="name col-3">Giá :</div>
//                             <div className="content col-9">200.000 đ</div>
//                         </li>
//                         <li className="flex col-12">
//                             <div className="name col-3">Tệp đính kèm</div>
//                             <div className="content col-9">Không tìm thấy dữ liệu</div>
//                         </li>

//                     </ul>
//                 </div>

//             </div>

//         </div>
//     )
// }
