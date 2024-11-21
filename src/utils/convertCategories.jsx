const convertToEng = (koreanCategory) => {
    switch (koreanCategory) {
        case "사회":
            return "SOCIAL";
        case "경제":
            return "ECONOMY";
        case "생활/문화":
            return "LIFE_CULTURE";
        case "연예":
            return "ENTERTAINMENT";
        case "기계/IT":
            return "SCIENCE_TECH";
        case "정치":
            return "POLITICS";
        case "오피니언":
            return "OPINION";
        default:
            throw new Error("유효하지 않은 카테고리입니다.");
    }
};

const convertToKor = (englishCategory) => {
    switch (englishCategory) {
        case "SOCIAL":
            return "사회";
        case "ECONOMY":
            return "경제";
        case "LIFE_CULTURE":
            return "생활/문화";
        case "ENTERTAINMENT":
            return "연예";
        case "SCIENCE_TECH":
            return "기계/IT";
        case "POLITICS":
            return "정치";
        case "OPINION":
            return "오피니언";
        default:
            throw new Error("유효하지 않은 카테고리입니다.");
    }
};

const convertToIdx = (englishCategory) => {
    switch (englishCategory) {
        case "SOCIAL":
            return 4;
        case "ECONOMY":
            return 3;
        case "LIFE_CULTURE":
            return 6;
        case "ENTERTAINMENT":
            return 5;
        case "SCIENCE_TECH":
            return 7;
        case "POLITICS":
            return 2;
        case "OPINION":
            return 8;
        default:
            throw new Error("유효하지 않은 카테고리입니다.");
    }
};

export { convertToEng, convertToKor, convertToIdx };
