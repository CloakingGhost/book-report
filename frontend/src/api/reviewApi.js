import axios from './axios';

const REVIEWS_API = `/reviews`;
/**
 * 리뷰 API를 관리하는 객체입니다.
 */
const reviewApi = {
  /**
   * 새로운 리뷰를 생성하는 함수입니다.
   * @param {Object} data 생성할 리뷰 정보를 포함하는 객체입니다.
   * @returns {Promise} 생성된 리뷰 응답 데이터를 반환합니다.
   */
  createReview: async (bookReview) => {
    try {
      const formData = new FormData();

      // JSON 데이터를 문자열로 변환해서 추가
      formData.append(
        'data',
        new Blob([JSON.stringify(bookReview.data)], { type: 'application/json' }),
      );

      // 이미지 파일 추가 (책 표지)
      formData.append('imageFile', bookReview.imageFile[0]);

      const response = await axios.post(`${REVIEWS_API}`, formData, {
        // headers: { 'Content-Type': 'multipart/form-data' }, // formData는 Content-Type을 설정하지 않아도 됩니다.
        withCredentials: true,
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
  getReviews: async (page, title) => {
    try {
      const response = await axios.get(`${REVIEWS_API}?page=${page}&title=${title}`);
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
      const response = await axios.get(`${REVIEWS_API}/${reviewId}`);
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
      const response = await axios.put(`${REVIEWS_API}/${reviewId}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('감상문 수정 오류:', error); // 오류 로깅
      throw new Error('감상문 수정에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 리뷰를 삭제하는 함수입니다.
   * @param {String} reviewId 삭제할 리뷰의 ID입니다.
   * @returns {Promise} 삭제된 리뷰 응답 데이터를 반환합니다.
   */
  deleteReview: async (reviewId) => {
    try {
      const response = await axios.delete(`${REVIEWS_API}/${reviewId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('감상문 삭제 오류:', error); // 오류 로깅
      throw new Error('감상문 삭제에 실패했습니다.'); // 사용자에게 알림
    }
  },
  /**
   * 리뷰 공개여부를 변경하는 함수입니다.
   * @param {String} reviewId 공개여부를 변경할 리뷰의 ID입니다.
   * @param {Object} data 수정할 리뷰 정보를 포함하는 객체입니다.
   * @returns {Promise} 공개여부를 변경할 리뷰 응답 데이터를 반환합니다.
   */
  patchReviewPrivateStatus: async (reviewId, data) => {
    try {
      const response = await axios.patch(`${REVIEWS_API}/${reviewId}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('감상문 공개범위 변경 오류:', error); // 오류 로깅
      throw new Error('감상문 공개범위 변경에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default reviewApi; // reviewApi 객체 내보내기
