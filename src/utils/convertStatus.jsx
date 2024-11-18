const convertStatusToKor = (status) => {
    switch (status) {
      case "PENDING":
        return "대기 중";
      case "APPROVED":
        return "승인됨";
      case "REJECTED":
        return "거절됨";
      case "HOLDING":
        return "보류 중";
      default:
        return "알 수 없음";
    }
};

const convertStatusToEng = (statusKor) => {
    switch (statusKor) {
      case "대기 중":
        return "PENDING";
      case "승인됨":
        return "APPROVED";
      case "거절됨":
        return "REJECTED";
      case "보류 중":
        return "HOLDING";
      default:
        return "UNKNOWN";
    }
  };
  
export { convertStatusToKor, convertStatusToEng };