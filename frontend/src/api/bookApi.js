import axios from './axios';

/**
 * 도서 API를 관리하는 객체입니다.
 */
const bookApi = {
  /**
   * 도서를 이름으로 검색하는 함수입니다.
   * @param {String} title 검색할 도서 이름입니다.
   * @returns {Promise} 검색된 도서 목록 응답 데이터를 반환합니다.
   */
  searchBooks: async (title) => {
    try {
      const response = await axios.get(`/books?title=${title}`);
      return response.data;
    } catch (error) {
      // 없는 도서 검색 시 아래의 에러 메세지 떠서 주석 처리함(사용자가 없는 도서 검색하여 감상문 쓸 수 있음)
      // console.error('도서 검색 오류:', error); // 오류 로깅
      // throw new Error('도서 검색에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default bookApi; // bookApi 객체 내보내기
