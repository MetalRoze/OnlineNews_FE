const formatDateTime = (date) => {
    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
    };

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24시간 체계
    };

    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions);
    const formattedTime = date.toLocaleTimeString('ko-KR', timeOptions);

    const [year, month, day] = formattedDate.split('.').map(part => part.trim()); // 각 부분을 분리하고 trim
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });

    return `${year}년 ${month}월 ${day}일 ${weekday}요일 ${formattedTime}`; // 년, 월, 일, 요일, 시, 분, 초 포함
};

export default formatDateTime;
