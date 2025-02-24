import axios from './axios'; // axios 인스턴스 가져오기

/**
 * 인증 API를 관리하는 객체입니다.
 */
const authApi = {
  /**
   * 로그인 함수입니다.
   * @param {Object} credentials 로그인 정보를 포함하는 객체입니다.
   * @returns {Promise} 로그인 응답 데이터를 반환합니다.
   */
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('로그인 오류:', error); // 오류 로깅
      throw new Error('로그인에 실패했습니다.'); // 사용자에게 알림
    }
  },

  /**
   * 로그아웃 함수입니다.
   * @returns {Promise} 로그아웃 응답 데이터를 반환합니다.
   */
  logout: async () => {
    try {
      const token = '사용자 토큰'; // 사용자 토큰을 여기에 추가하세요.
      const response = await axios.post('/api/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('로그아웃 오류:', error); // 오류 로깅
      throw new Error('로그아웃에 실패했습니다.'); // 사용자에게 알림
    }
  },

  /**
   * 회원가입 함수입니다.
   * @param {Object} userData 회원가입 정보를 포함하는 객체입니다.
   * @returns {Promise} 회원가입 응답 데이터를 반환합니다.
   */
  signup: async (userData) => {
    try {
      const response = await axios.post('/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 오류:', error); // 오류 로깅
      throw new Error('회원가입에 실패했습니다.'); // 사용자에게 알림
    }
  },

  /**
   * 회원가입 아이디 중복확인 함수입니다.
   * @param {String} username 확인할 사용자 이름입니다.
   * @returns {Promise} 중복 확인 응답 데이터를 반환합니다.
   */
  verifyUsername: async (username) => {
    try {
      const response = await axios.get(`/api/auth/signup/verify?username=${username}`);
      return response.data;
    } catch (error) {
      console.error('아이디 중복확인 오류:', error); // 오류 로깅
      throw new Error('아이디 중복확인에 실패했습니다.'); // 사용자에게 알림
    }
  },

  /**
   * 사용자 감상문 목록 조회 함수입니다.
   * @param {String} username 감상문 목록을 조회할 사용자 이름입니다.
   * @returns {Promise} 감상문 목록 응답 데이터를 반환합니다.
   */
  getUserReviews: async (username) => {
    try {
      const response = await axios.get(`/api/mypage/${username}`, {
        headers: {},
      });
      return response.data;
    } catch (error) {
      console.error('감상문 목록 조회 오류:', error); // 오류 로깅
      throw new Error('감상문 목록 조회에 실패했습니다.'); // 사용자에게 알림
    }
  },
};

export default authApi; // authApi 객체 내보내기
