import axios from './axios'; // axios 인스턴스 가져오기

/**
 * 도서 API를 관리하는 객체입니다.
 */
const bookApi = {
  /**
   * 도서를 이름으로 검색하는 함수입니다.
   * @param {String} bookName 검색할 도서 이름입니다.
   * @returns {Promise} 검색된 도서 목록 응답 데이터를 반환합니다.
   */
  searchBooks: async (bookName) => {
    try {
      const response = await axios.get(`/api/books?name=${bookName}`);
      return response.data;
    } catch (error) {
      console.error('도서 검색 오류:', error); // 오류 로깅
      throw new Error('도서 검색에 실패했습니다.'); // 사용자에게 알림
    }
  },

  /**
   * 도서의 상세 정보를 조회하는 함수입니다.
   * @param {String} bookId 조회할 도서의 ID입니다.
   * @returns {Promise} 도서 상세 정보 응답 데이터를 반환합니다.
   */
  getBookDetails: async (bookId) => {
    try {
      const response = await axios.get(`/api/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('도서 상세 조회 오류:', error); // 오류 로깅
      throw new Error('도서 상세 조회에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default bookApi; // bookApi 객체 내보내기
