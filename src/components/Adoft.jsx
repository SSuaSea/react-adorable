import React, { useEffect, useState } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import Chart from './Chart';
import '../styles/adoft.css';

function Adoft() {
    const [animalData, setAnimalData] = useState([]);
    const [breedChartData, setBreedChartData] = useState(null);
    const [sexChartData, setSexChartData] = useState(null);
    const [placeChartData, setPlaceChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceKey = 'iDC4CO0hKvRhRqwjuev%2FnKI%2FYbdVUvmOCP8HFGjTxRuhwk%2Bju1hfFsuBv%2FUHKjGz5zwYhyT8ol7g2zwxCbj%2BCw%3D%3D';
                const apiUrl = `http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList?serviceKey=${serviceKey}&numOfRows=12&pageNo=1&searchCondition=1`;

                const response = await axios.get(apiUrl, {
                    headers: { 'Content-Type': 'application/xml' },
                    responseType: 'text'
                });

                const parser = new xml2js.Parser();
                const result = await parser.parseStringPromise(response.data);
                const items = result.ServiceResult.MsgBody[0].items;

                const animalList = items.map(item => ({
                    Dog_image: `http://www.daejeon.go.kr/${item.filePath[0]}`,
                    BREEDS: item.species[0],
                    SEX: item.gender[0] === '1' ? '남' : item.gender[0] === '2' ? '여' : '기타',
                    FOUND_PLACE: item.foundPlace[0]
                }));

                setAnimalData(animalList);

                const breedCount = {};
                const sexCount = { '남': 0, '여': 0 };
                const placeCount = {};

                animalList.forEach(animal => {
                    breedCount[animal.BREEDS] = (breedCount[animal.BREEDS] || 0) + 1;
                    sexCount[animal.SEX] += 1;
                    placeCount[animal.FOUND_PLACE] = (placeCount[animal.FOUND_PLACE] || 0) + 1;
                });

                setBreedChartData({
                    labels: Object.keys(breedCount),
                    datasets: [{
                        label: '품종별 유기견 수',
                        data: Object.values(breedCount),
                        backgroundColor: Object.keys(breedCount).map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`),
                        borderColor: Object.keys(breedCount).map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`),
                        borderWidth: 1,
                    }]
                });

                setSexChartData({
                    labels: Object.keys(sexCount),
                    datasets: [{
                        label: '성별 유기견 수',
                        data: Object.values(sexCount),
                        backgroundColor: Object.keys(sexCount).map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`),
                        borderColor: Object.keys(sexCount).map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`),
                        borderWidth: 1,
                    }]
                });

                setPlaceChartData({
                    labels: Object.keys(placeCount),
                    datasets: [{
                        label: '발견장소별 유기견 수',
                        data: Object.values(placeCount),
                        backgroundColor: Object.keys(placeCount).map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`),
                        borderColor: Object.keys(placeCount).map(() => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`),
                        borderWidth: 1,
                    }]
                });
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="adoft">
            <h2>사지말고 입양하세요</h2>
            <div className="animal-list">
                {animalData.map((dog, index) => (
                    <div key={index} className="animal-card">
                        <img className="animal-image" src={dog.Dog_image || 'placeholder.jpg'} alt={dog.BREEDS} />
                        <h2>품종: {dog.BREEDS}</h2>
                        <h3>성별: {dog.SEX}</h3>
                        <h3>발견장소: {dog.FOUND_PLACE}</h3>
                    </div>
                ))}
            </div>
            <div className="charts">
                {breedChartData && <Chart chartData={breedChartData} title="품종별 유기견 수" />}
                {sexChartData && <Chart chartData={sexChartData} title="성별 유기견 수" />}
                {placeChartData && <Chart chartData={placeChartData} title="발견장소별 유기견 수" />}
            </div>
        </div>
    );
}

export default Adoft;
