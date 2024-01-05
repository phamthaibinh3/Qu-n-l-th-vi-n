// ChitietsachAd.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Data } from '../Context';
import NavKH from './NavKH';

export default function ChitietsachAd(props) {
    const { xemnhieu } = useContext(Data);
    const { id } = useParams();

    // Lấy thông tin sách từ ID
    const selectedBook = xemnhieu[id];

    if (!selectedBook) {
        return <div>Sách không tồn tại</div>;
    }

    return (
        <div>
            <NavKH />
            <div className="flex mt-24" style={{ justifyContent: 'space-between' }}>
                {selectedBook && (
                    <div className="w-1/5 ml-10" style={{ marginRight: 30 }}>
                        <img
                            src={selectedBook.hinh}
                            alt=""
                        />
                    </div>
                )}

                <div className="w-4/5 mr-10 ml-10">
                    <div className="header-name">
                        <span className="text-black text-3xl ">Text</span>
                        <h1 className="font-bold text-2xl border-b-2 " >{selectedBook.name}</h1>
                    </div>
                    <div className="note border-b-2 text-slate-400	">
                        <p>{selectedBook.moTa}</p>
                    </div>
                    <div className="detail mt-1 " >
                        <h2 className='scroll-mt-2 text-2xl'>Chi tiết</h2>
                        <ul className='col-12'>
                            <li className="flex col-12">
                                <div className="name col-3">Tác giả :</div>
                                <div className="content col-9">{selectedBook.tacGia}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Loại sách :</div>
                                <div className="content col-9">{selectedBook.loaiSach}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Ngôn ngữ :</div>
                                <div className="content col-9">{selectedBook.ngonNgu}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Giá :</div>
                                <div className="content col-9">{selectedBook.gia}</div>
                            </li>
                            <li className="flex col-12">
                                <div className="name col-3">Số lượng :</div>
                                <div className="content col-9">{selectedBook.soLuong}</div>
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
