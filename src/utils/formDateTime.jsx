// yyyy년 mm월 dd일 w요일 hh:mm:ss
const formatDateTime = (date) => {
    const { formattedDate, formattedTime, weekday } = formatDateComponents(date);

    const [year, month, day] = formattedDate.split('.').map(part => part.trim());
    return `${year}년 ${month}월 ${day}일 ${weekday}요일 ${formattedTime}`;
};

// yyyy/mm/dd hh:mm:ss
const dateOnly = (date) => {
    const { formattedDate, formattedTime } = formatDateComponents(date);

    const [year, month, day] = formattedDate.split('.').map(part => part.trim());
    return `${year}/${month}/${day} ${formattedTime}`;
};
//yyyy년 mm월 dd일
const yearMonthDay = (date) => {
    const { formattedDate } = formatDateComponents(date);
    const [year, month, day] = formattedDate.split('.').map(part => part.trim());
    return `${year}년 ${month}월 ${day}일`;
};
const formatDateComponents = (date) => {
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
        hour12: false,
    };

    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions);
    const formattedTime = date.toLocaleTimeString('ko-KR', timeOptions);
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });

    return { formattedDate, formattedTime, weekday };
};

export default formatDateTime;
export { formatDateTime, dateOnly, yearMonthDay };
