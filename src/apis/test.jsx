import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // API 호출 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/notification'); 
      setData(response.data); // 응답 받은 데이터 설정
    } catch (err) {
      setError('Error fetching data');
      console.error(err); // 오류 로그 출력
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때 API 호출

  return (
    <div>
      <h1>API Call Test</h1>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <h2>Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TestComponent;
