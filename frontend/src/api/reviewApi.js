import axios from './axios';

/**
 * 리뷰 API를 관리하는 객체입니다.
 */
const reviewApi = {
  /**
   * 새로운 리뷰를 생성하는 함수입니다.
   * @param {Object} data 생성할 리뷰 정보를 포함하는 객체입니다.
   * @returns {Promise} 생성된 리뷰 응답 데이터를 반환합니다.
   */
  createReview: async (data) => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.post('/api/reviews', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('감상문 생성 오류:', error); // 오류 로깅
      throw new Error('감상문 생성에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 리뷰 목록을 조회하는 함수입니다.
   * @returns {Promise} 리뷰 목록 응답 데이터를 반환합니다.
   */
  getReviews: async () => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.get('/api/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('감상문 목록 조회 오류:', error); // 오류 로깅
      throw new Error('감상문 목록 조회에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 특정 리뷰의 상세 정보를 조회하는 함수입니다.
   * @param {String} reviewId 조회할 리뷰의 ID입니다.
   * @returns {Promise} 리뷰 상세 정보 응답 데이터를 반환합니다.
   */
  getReviewDetail: async (reviewId) => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.get(`/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('감상문 상세 조회 오류:', error); // 오류 로깅
      throw new Error('감상문 상세 조회에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 리뷰를 수정하는 함수입니다.
   * @param {String} reviewId 수정할 리뷰의 ID입니다.
   * @param {Object} data 수정할 리뷰 정보를 포함하는 객체입니다.
   * @returns {Promise} 수정된 리뷰 응답 데이터를 반환합니다.
   */
  updateReview: async (reviewId, data) => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.put(`/api/reviews/${reviewId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('감상문 수정 오류:', error); // 오류 로깅
      throw new Error('감상문 수정에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 리뷰의 일부 정보를 수정하는 함수입니다.
   * @param {String} reviewId 수정할 리뷰의 ID입니다.
   * @param {Object} data 수정할 리뷰 정보를 포함하는 객체입니다.
   * @returns {Promise} 수정된 리뷰 응답 데이터를 반환합니다.
   */
  patchReview: async (reviewId, data) => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.patch(`/api/reviews/${reviewId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('감상문 일부 수정 오류:', error); // 오류 로깅
      throw new Error('감상문 일부 수정에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 리뷰를 삭제하는 함수입니다.
   * @param {String} reviewId 삭제할 리뷰의 ID입니다.
   * @returns {Promise} 삭제된 리뷰 응답 데이터를 반환합니다.
   */
  deleteReview: async (reviewId) => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.delete(`/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('감상문 삭제 오류:', error); // 오류 로깅
      throw new Error('감상문 삭제에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 도서에 대한 리뷰를 조회하는 함수입니다.
   * @param {String} bookId 조회할 도서의 ID입니다.
   * @param {String} reviewId 조회할 리뷰의 ID입니다.
   * @returns {Promise} 도서 리뷰 응답 데이터를 반환합니다.
   */
  getBookReviews: async (bookId, reviewId) => {
    try {
      const response = await axios.get(`/api/books/${bookId}/reviews/${reviewId}`, {
        headers: {},
      });
      return response.data;
    } catch (error) {
      console.error('도서 감상문 조회 오류:', error); // 오류 로깅
      throw new Error('도서 감상문 조회에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default reviewApi; // reviewApi 객체 내보내기
