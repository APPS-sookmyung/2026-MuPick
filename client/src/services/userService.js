// client/src/services/userService.js
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

// 1. 유저 찜 목록에 뮤지컬 추가
export const addFavorite = async (userId, musical, selectedTag) => {
  try {
    const favRef = doc(db, 'users', userId, 'favorites', String(musical.id));
    await setDoc(favRef, {
      musicalId: musical.id,
      title: musical.title,
      posterUrl: musical.posterUrl,
      selectedTag: selectedTag || "기본 추천",
      likedAt: new Date()
    });
    console.log("Firestore 찜하기 성공!");
  } catch (error) {
    console.error("Firestore 찜하기 실패:", error);
  }
};

// 2. 유저 찜 목록에서 삭제
export const removeFavorite = async (userId, musicalId) => {
  try {
    const favRef = doc(db, 'users', userId, 'favorites', String(musicalId));
    await deleteDoc(favRef);
    console.log("Firestore 찜 취소 성공!");
  } catch (error) {
    console.error("Firestore 찜 취소 실패:", error);
  }
};

// 3. 해당 유저의 전체 찜 목록 가져오기 (마이페이지 연동용)
export const getUserFavorites = async (userId) => {
  try {
    const favCollectionRef = collection(db, 'users', userId, 'favorites');
    const querySnapshot = await getDocs(favCollectionRef);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Firestore 찜 목록 불러오기 실패:", error);
    return [];
  }
};

// 4. 비회원 로그아웃 시 DB의 유저 데이터 통째로 삭제
export const deleteUserData = async (userId) => {
  try {
    // 4-1. 하위 favorites 서브 컬렉션 문서들 삭제
    const favCollectionRef = collection(db, 'users', userId, 'favorites');
    const querySnapshot = await getDocs(favCollectionRef);
    
    const deletePromises = querySnapshot.docs.map((favDoc) => 
      deleteDoc(doc(db, 'users', userId, 'favorites', favDoc.id))
    );
    await Promise.all(deletePromises);

    // 4-2. 유저 상위 문서 삭제
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);

    console.log(`비회원 유저(${userId}) DB 데이터 완전히 삭제 완료`);
  } catch (error) {
    console.error("비회원 DB 데이터 삭제 중 오류 발생:", error);
  }
};