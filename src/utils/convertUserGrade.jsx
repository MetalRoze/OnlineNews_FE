const convertUserGradeToKor = (status) => {
    switch (status) {
      case "SYSTEM_ADMIN":
        return "시스템 관리자";
      case "EDITOR":
        return "편집장";
      case "REPORTER":
        return "기자";
      case "INTERN_REPORTER":
        return "인턴기자";
      case "CITIZEN_REPORTER":
        return "시민기자";
      case "GENERAL_MEMBER":
        return "사용자"
      default:
        return "알 수 없음";
    }
};
export { convertUserGradeToKor };