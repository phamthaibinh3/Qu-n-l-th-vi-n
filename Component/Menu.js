import React, { useEffect, useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/stateprovider';
import { LoaiSach } from '../utils/data';
import { getAllFoodItems } from '../utils/firebaseFunction';

const Menu = () => {
    const [{ books }, dispatch] = useStateValue();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Selected Category:', selectedCategory);

                // Nếu có loại sách được chọn, lấy tất cả các mục thuộc loại đó
                if (selectedCategory) {
                    const items = await getAllFoodItems(selectedCategory);
                    console.log('Fetched Items:', items);
                    setCategoryItems(items);
                } else {
                    // Nếu không có loại sách được chọn, đặt danh sách rỗng
                    setCategoryItems([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        // Lưu trữ loại sách được chọn vào state
        setSelectedCategory(category.urlParamName);
    };

    return (
        <div>
            <section className="w-full my-3" id="menu">
                <div className="flex flex-col w-full items-center justify-between">
                    <p className="relative text-2xl text-headingColor font-semibold capitalize before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
                        Duyệt theo chủ đề
                    </p>
                    <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                        {LoaiSach &&
                            LoaiSach.map((category) => (
                                <motion.div
                                    whileTap={{ scale: 0.7 }}
                                    onClick={() => handleCategoryClick(category)}
                                    key={category.id}
                                    className={`group ${selectedCategory === category.urlParamName
                                        ? 'bg-red-500'
                                        : 'bg-card'
                                        } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out hover:bg-red-500`}
                                >
                                        <div className='text-center'>
                                            <p
                                                className={`text-sm ${selectedCategory === category.urlParamName
                                                    ? 'bg-card-500'
                                                    : 'bg-red'
                                                    } text-textColor group-hover:text-card`}
                                            >
                                                {category.name}
                                            </p>
                                        </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>
            {/* Nơi hiển thị sách thuộc loại được chọn */}
            <div className='grid grid-cols-4 '>
                {categoryItems.map((item) => (
                    <div key={item.id} className="border p-4 my-4">
                        <img className='w-32 ' src={item.imageURL} alt=''></img>
                        <h3 className="text-xl font-semibold">{item.tenSach}</h3>
                        <p>{item.tacGia}</p>
                        {/* Hiển thị thông tin khác về mỗi sách */}
                    </div>
                ))}
                {categoryItems.length === 0 && (
                    <p>Không có sách trong loại được chọn.</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
