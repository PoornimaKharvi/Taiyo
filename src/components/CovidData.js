import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CovidData = () => {
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    fetchCovidData();
  }, []);

  const fetchCovidData = async () => {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      setHistoricalData(response.data);
    } catch (error) {
      console.error('Error fetching COVID-19 data:', error);
    }
  };

  return (
    <div>
      {historicalData ? (
        <LineChart
          width={800}
          height={400}
          data={Object.entries(historicalData.cases).map(([date, count]) => ({ date, count }))}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default CovidData;
