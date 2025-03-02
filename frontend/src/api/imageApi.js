import axios from './axios';

/**
 * 이미지 API를 관리하는 객체입니다.
 */
const imageApi = {
  /**
   * JWT를 통해 사용자가 생성한 이미지 목록을 조회하는 함수(감상문 작성 시)입니다.
   * @returns {Promise} 사용자가 생성한 이미지 목록 응답 데이터를 반환합니다.
   */
  getUserImages: async (type) => {
    try {
      const response = await axios.get(`/reviews/images?type=${type}`);
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
  createImage: async (type, addImages) => {
    try {
      const formData = new FormData();

      // data 객체를 추가
      formData.append('data', new Blob([JSON.stringify({ type })], { type: 'application/json' }));

      // 이미지 파일들을 하나씩 formData에 추가
      addImages.forEach((image) => {
        formData.append('images', image); // 'images'는 서버에서 받을 때의 파라미터명과 일치해야 합니다.
      });

      const response = await axios.post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 반드시 설정해야 합니다.
        },
        withCredentials: true,
      });
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
      const response = await axios.delete(`/images/${imageId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('이미지 삭제 오류:', error); // 오류 로깅
      throw new Error('이미지 삭제에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default imageApi; // imageApi 객체 내보내기
