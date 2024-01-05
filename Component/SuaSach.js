import React, { useState } from "react";
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank, } from "react-icons/md";
import { LoaiSach } from "../utils/data";
import Loader from "./Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { firestore, storage } from "../firebase";
import { saveItem } from "../utils/firebaseFunction";
import { IoBookSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { GoArchive } from "react-icons/go";
import { IoLanguage } from "react-icons/io5";
import { MdPushPin } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { NgonNgu } from "../utils/data";
import { FaCoins } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Create() {
    const { id } = useParams();
    console.log("ID: ", id);
    //khai báo state
    const [moTa, setMoTa] = useState("");
    const [tacGia, setTacGia] = useState("");
    const [tenSach, setTenSach] = useState("");
    const [soLuong, setSoLuong] = useState("");
    const [gia, setGia] = useState("");
    const [ngonNgu, setNgonNgu] = useState(null);
    const [loaiSach, setLoaiSach] = useState(null);
    const [fields, setFields] = useState(true);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState(null);
    const [alertStatus, setAlertStatus] = useState("danger");

    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMessage("Lỗi tải ảnh lên");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);

                    setIsLoading(false);
                    setFields(true);
                    setMessage("tải ảnh lên thành công");
                    setAlertStatus("success");
                    setTimeout(() => {
                        setFields(false);
                    }, 4000);
                });
            }
        );
    };
    const deleteImage = () => {
        setIsLoading(true);
        setTimeout(() => {
            const deleteRef = ref(storage, imageAsset);
            deleteObject(deleteRef).then(() => {
                setImageAsset(null);
                setIsLoading(false);
                setFields(true);
                setMessage("thanh cong");
                setAlertStatus("thanhcong");
                setTimeout(() => {
                    setFields(false);
                }, 3000);
            });
        }, 3000);
    };
    const saveDetails = () => {
        setIsLoading(true);
        try {
            if (!imageAsset || !tenSach || !soLuong || !gia || !loaiSach || !tacGia || !moTa || !ngonNgu) {
                setFields(true);
                setMessage("Bạn chưa đủ thông tin để Lưu");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 3000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    tenSach: tenSach,
                    tacGia: tacGia,
                    moTa: moTa,
                    imageURL: imageAsset,
                    loaiSach: loaiSach,
                    soLuong: soLuong,
                    gia: gia,
                    ngonNgu: ngonNgu
                };
                saveItem(data);
                setIsLoading(true);
                setFields(true);
                setMessage("Lưu thành công");
                setAlertStatus("thanhcong");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                    setGia('');
                    setImageAsset(null);
                    setLoaiSach(null);
                    setMoTa('');
                    setNgonNgu(null);
                    setSoLuong('');
                    setTacGia('');
                    setTenSach('');
                }, 3000);
            }
        } catch {
            setFields(true);
            setMessage("Lỗi rồi");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 3000);
        }
    };

    const update = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(firestore, 'books', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const sachData = docSnap.data();

                const updateData = {
                    ...sachData,
                    gia: gia,
                    imageURL: imageAsset,
                    loaiSach: loaiSach,
                    moTa: moTa,
                    ngonNgu: ngonNgu,
                    soLuong: soLuong,
                    tacGia: tacGia,
                    tenSach: tenSach,
                };
                await setDoc(docRef, updateData);
                setFields(true);
                setMessage("Sửa thành công");
                setAlertStatus("oke");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 3000);
            } else {
                setFields(true);
                setMessage("Sửa thất bại");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 3000);
            }

        } catch (error) {
            console.log("lỗi: ", error);
        }
    }

    return (
        <div className="m-auto w-[90%] md:w-[75%] border-gray-300 rounded-lg p-4 items-center justify-center flex flex-col">
            {fields && (
                <p
                    className={`w-full text-lg font-semibold text-center p-2  rounded-lg ${alertStatus === "danger"
                        ? "bg-red-400 text-red-800"
                        : "bg-emerald-400 text-emerald-800"
                        }`}
                >
                    {message}
                </p>
            )}
            {/* title */}
            <div className="flex w-full py-2 border-b border-gray-300 items-center gap-2">
                <IoBookSharp className="text-xl text-gray-700" />
                <input
                    type="text"
                    onChange={(e) => setTenSach(e.target.value)}
                    required
                    value={tenSach}
                    placeholder="Nhập tên sách"
                    className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                />
            </div>
            {/* Tác giả */}
            <div className="flex w-full py-2 border-b border-gray-300 items-center gap-2">
                <RxAvatar className="text-xl text-gray-700" />
                <input
                    type="text"
                    onChange={(e) => setTacGia(e.target.value)}
                    required
                    value={tacGia}
                    placeholder="Nhập tác giả"
                    className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                />
            </div>
            {/* Mô tả */}
            <div className="flex w-full py-2  mb-2 border-b border-gray-300 items-center gap-2">
                <GoArchive className="text-xl text-gray-700" />
                <input
                    type="text"
                    required
                    value={moTa}
                    onChange={(e) => setMoTa(e.target.value)}
                    placeholder="Mô tả ngắn "
                    className="w-full  h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                />
            </div>

            {/* Ngôn ngữ */}
            <div className="w-full">
                <select onChange={(e) => setNgonNgu(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
                    <option value="other" className="bg-white">
                        Ngôn ngữ
                    </option>
                    {NgonNgu &&
                        NgonNgu.map((item) => (
                            <option
                                key={item.id}
                                value={item.url}
                                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                            >
                                {item.ngongu}
                            </option>
                        ))}
                </select>
            </div>

            {/* Loại Sách */}
            <div className="w-full">
                <select
                    onChange={(e) => setLoaiSach(e.target.value)}
                    className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                    <option value="other" className="bg-white">
                        Loại Sách
                    </option>
                    {LoaiSach &&
                        LoaiSach.map((item) => (
                            <option
                                key={item.id}
                                value={item.urlParamName}
                                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                            >
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>
            {/*  */}
            <div className="flex flex-col group w-full h-225 md:h-420 cursor-pointer border-2 border-groove border-gray-300 rounded-lg items-center justify-center">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {!imageAsset ? (
                            <>
                                <label className="flex flex-col w-full h-full items-center justify-center cursor-pointer">
                                    <div className="flex flex-col w-full h-full items-center justify-center gap-2">
                                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                        <p className="text-gray-500 hover:text-gray-700">
                                            Click here to upload
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="uploadImage"
                                        accept="image/*"
                                        onChange={uploadImage}
                                        className="w-0 h-0"
                                    />
                                </label>
                            </>
                        ) : (
                            // False
                            <>
                                <div className="relative h-full">
                                    <img
                                        src={imageAsset}
                                        alt="The one awaits for upload"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                        onClick={deleteImage}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            {/* Calo và giá */}
            <div className="flex flex-col md:flex-row w-full items-center gap-3">
                {/* số lượng */}
                <div className="flex w-full py-2 border-b border-gray-300 items-enter gap-2">
                    <FaCoins className="text-gray-700 text-2xl" />

                    <input
                        type="number"
                        required
                        value={soLuong}
                        onChange={(e) => setSoLuong(e.target.value)}
                        placeholder="Số Lượng"
                        className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                    />
                </div>
                {/* giá  */}
                <div className="flex w-full py-2 border-b border-gray-300 items-enter gap-2">
                    <MdAttachMoney className="text-gray-700 text-2xl" />

                    <input
                        type="text"
                        required
                        value={gia}
                        onChange={(e) => setGia(e.target.value)}
                        placeholder="Giá"
                        className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300 outline-none border-none"
                    />
                </div>
            </div>
            <div className="flex w-full items-center mt-5">
                <button
                    type="button"
                    className="w-full md:w-auto ml-0 md:ml-auto border-none outline-none px-12 py-2 text-white text-lg font-semibold bg-emerald-500 rounded-lg"
                    onClick={update}
                >
                    Update
                </button>
            </div>
        </div>
    );
}
