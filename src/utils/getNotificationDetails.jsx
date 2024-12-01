const getNotificationDetails = ({ type }) => {
  switch (type) {
    case '승인 요청':
      return {
        label: '기사',
      };
    case '비공개 요청':
      return {
        label: '비공개',
      };
    case '기사 등록 요청':
      return {
        label: '기자등록',
      };

    case 'REPORTER_LIKE':
    case 'USER_LIKE':
      return {
        label: '좋아요'
      };
    case 'REPORTER_COMMENT':
      return {
        label: '댓글'
      };
    case 'USER_REPLY':
      return {
        label: '대댓글'
      };
    case 'REQUEST':
      return {
        label: '승인'
      };
    default:
      return {
        label: '알림'
      };
  }
};

export { getNotificationDetails };