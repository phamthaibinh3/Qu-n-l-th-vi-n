import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase';
//xử lui dong bo / sử dụng forebtore xử lý đưa hình ảnh vô
export const saveItem = async data => {
    await setDoc(
        doc(firestore, 'books', `${Date.now()}`), data, { merge: true, }
    );
};
//độc giả
export const docgia = async data => {
    await setDoc(
        doc(firestore, 'docgia', `${Date.now()}`), data, { merge: true, }
    );
};
export const newbook = async data => {
    await setDoc(
        doc(firestore, 'newbook', `${Date.now()}`), data, { merge: true, }
    );
};
export const phieuThue = async data => {
    await setDoc(
        doc(firestore, 'thueSach', `${Date.now()}`), data, { merge: true, }
    );
};
export const updateDocGia = async (id, data) => {
    const docRef = doc(firestore, 'docgia', id);
    await setDoc(docRef, data, { merge: true });
};

//   getall food items 
export const getAllFoodItems = async (loaiSach) => {
    const items = await getDocs(
        
        query(collection(firestore, 'books'),
            where('loaiSach', '==', loaiSach),
            orderBy('id', 'desc')),
    );
    // console.log('loaiSach:', loaiSach);
    return items.docs.map(doc => doc.data());
};
