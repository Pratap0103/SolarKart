import React, { useState } from 'react';
import { CloudRain, Sun, Compass } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import StatCard from '../components/StatCard';
import Select from '../components/Select';
import { initialWeather } from '../dummyData';

export default function WeatherPage({ weather, onUpdateCity, showToast }) {
  const [selectedCity, setSelectedCity] = useState(weather.city);

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    onUpdateCity(city);
    showToast(`Updated weather location to ${city}`);
  };

  return (
    <div>
      {/* Location Picker */}
      <div className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={20} style={{ color: 'var(--primary-green)' }} />
          <div>
            <h4 style={{ fontSize: '14px', margin: '0' }}>Active Monitoring Region</h4>
            <span style={{ fontSize: '11px', color: 'var(--gray-text)' }}>Latitude / Solar Radiation zone</span>
          </div>
        </div>
        <div style={{ minWidth: '150px' }}>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={['Pune', 'Bangalore', 'Mumbai', 'New Delhi', 'Hyderabad', 'Chennai']}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-row" style={{ marginTop: '20px' }}>
        <StatCard label="Current Weather" value={weather.condition} desc={`Humidity: ${weather.humidity}`} borderLeft="4px solid var(--sky-blue)" />
        <StatCard label="Temperature" value={weather.temp} desc="Peak ambient cell temp" />
        <StatCard label="Rain Probability" value={weather.rainChance} desc="Precipitation risk" />
        <StatCard label="Sunlight Hours" value={`${weather.sunlightHours} Hrs`} desc="Effective peak sunlight today" borderLeft="4px solid var(--primary-green)" />
        <StatCard label="Expected Gen Today" value={weather.expectedKWh} desc="Simulated system output" borderLeft="4px solid var(--primary-green)" />
        <StatCard label="Tomorrow Prediction" value="23.8 kWh" desc="Partly Cloudy forecast" />
      </div>

      {/* Forecast Table */}
      <div className="card" style={{ padding: '10px 0', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>7-Day Solar Generation Yield Forecast</h3>
        <Table headers={['Date', 'Weather', 'Temperature', 'Rain %', 'Sunlight Hours', 'Expected kWh', 'Status']}>
          {weather.forecast.map((f, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 'bold' }}>{f.date}</td>
              <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {f.weather.includes('Rain') ? <CloudRain size={14} style={{ color: 'var(--sky-blue)' }} /> : <Sun size={14} style={{ color: '#F59E0B' }} />}
                <span>{f.weather}</span>
              </td>
              <td>{f.temp}</td>
              <td>{f.rainChance}</td>
              <td>{f.sunlightHours} Hrs</td>
              <td style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>{f.expectedKWh}</td>
              <td><Badge type={f.expectedKWh.replace(' kWh','') > 20 ? 'Active' : 'warning'}>{f.expectedKWh.replace(' kWh','') > 20 ? 'High Yield' : 'Moderate'}</Badge></td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
