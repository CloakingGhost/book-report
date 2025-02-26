import axios from './axios';

/**
 * 이미지 API를 관리하는 객체입니다.
 */
const imageApi = {
  /**
   * JWT를 통해 사용자가 생성한 이미지 목록을 조회하는 함수(감상문 작성 시)입니다.
   * @returns {Promise} 사용자가 생성한 이미지 목록 응답 데이터를 반환합니다.
   */
  getUserImages: async () => {
    try {
      const response = await axios.get('/reviews/images');
      return response.data;
    } catch (error) {
      console.error('사용자 이미지 목록 조회 오류:', error); // 오류 로깅
      throw new Error('사용자 이미지 목록 조회에 실패했습니다. 로그인이 필요합니다.'); // 사용자에게 알림
    }
  },

  /**
   * 새로운 이미지를 생성하는 함수입니다.
   * @param {Object} data 생성할 이미지 정보를 포함하는 객체입니다.
   * @returns {Promise} 생성된 이미지 응답 데이터를 반환합니다.
   */
  createImage: async (data) => {
    try {
      const response = await axios.post('/images', data);
      return response.data;
    } catch (error) {
      console.error('이미지 생성 오류:', error); // 오류 로깅
      throw new Error('이미지 생성에 실패했습니다.'); // 사용자에게 알림
    }
  },

  /**
   * 이미지를 삭제하는 함수입니다.
   * @param {String} imageId 삭제할 이미지의 ID입니다.
   * @returns {Promise} 삭제된 이미지 응답 데이터를 반환합니다.
   */
  deleteImage: async (imageId) => {
    try {
      const response = await axios.delete(`/images/${imageId}`);
      return response.data;
    } catch (error) {
      console.error('이미지 삭제 오류:', error); // 오류 로깅
      throw new Error('이미지 삭제에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default imageApi; // imageApi 객체 내보내기
