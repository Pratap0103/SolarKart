import React, { useState } from 'react';
import ChartCard from '../components/ChartCard';
import Table from '../components/Table';
import Badge from '../components/Badge';
import StatCard from '../components/StatCard';
import { initialEnergyData } from '../dummyData';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('Day');

  // Chart configuration labels mapping
  const peakTextMap = {
    Day: 'Peak: 5.0 kW',
    Week: 'Peak: 24.8 kWh',
    Month: 'Average: 22.8 kWh',
    Year: 'Max: 610 kWh',
    Lifetime: 'Cumulative: 13.2 MWh'
  };

  const currentDataMap = {
    Day: initialEnergyData.dayView,
    Week: initialEnergyData.weekView,
    Month: initialEnergyData.monthView,
    Year: initialEnergyData.yearView,
    Lifetime: initialEnergyData.lifetimeView
  };

  return (
    <div>
      {/* Analytics Nav Tabs */}
      <div className="tabs-header" style={{ marginBottom: '20px' }}>
        {['Day', 'Week', 'Month', 'Year', 'Lifetime'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} View
          </button>
        ))}
      </div>

      {/* SVG Chart Card */}
      <ChartCard
        title={`${activeTab}ly Generation Analytics`}
        badgeText={peakTextMap[activeTab]}
        data={currentDataMap[activeTab]}
        type={activeTab}
      />

      {/* Tabular Details Grid */}
      <div className="card" style={{ marginTop: '20px', padding: '10px 0' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Detailed Readings Log ({activeTab}ly)</h3>
        
        {activeTab === 'Day' && (
          <Table headers={['Time', 'Generation kWh', 'Power kW', 'Weather', 'Status']}>
            {initialEnergyData.dayView.map((d, i) => (
              <tr key={i}>
                <td>{d.hour}</td>
                <td>{d.generation} kWh</td>
                <td>{d.power} kW</td>
                <td>{d.weather}</td>
                <td><Badge type={d.status}>{d.status}</Badge></td>
              </tr>
            ))}
          </Table>
        )}

        {activeTab === 'Week' && (
          <Table headers={['Day', 'Generation kWh', 'Peak Time', 'Efficiency %', 'Status']}>
            {initialEnergyData.weekView.map((w, i) => (
              <tr key={i}>
                <td>{w.dayName}</td>
                <td>{w.generation} kWh</td>
                <td>{w.peakTime}</td>
                <td>{w.efficiency}%</td>
                <td><Badge type={w.status}>{w.status}</Badge></td>
              </tr>
            ))}
          </Table>
        )}

        {activeTab === 'Month' && (
          <Table headers={['Date', 'Generation kWh', 'Average kWh', 'Weather', 'Status']}>
            {initialEnergyData.monthView.map((m, i) => (
              <tr key={i}>
                <td>{m.date}</td>
                <td>{(m.avgGeneration * 1.1).toFixed(1)} kWh</td>
                <td>{m.avgGeneration} kWh</td>
                <td>{m.weather}</td>
                <td><Badge type="Active">Active</Badge></td>
              </tr>
            ))}
          </Table>
        )}

        {activeTab === 'Year' && (
          <Table headers={['Month', 'Generation kWh', 'Savings', 'Efficiency %', 'Status']}>
            {initialEnergyData.yearView.map((y, i) => (
              <tr key={i}>
                <td>{y.month}</td>
                <td>{y.generation} kWh</td>
                <td>{y.savings}</td>
                <td>{y.efficiency}%</td>
                <td><Badge type={y.status}>{y.status}</Badge></td>
              </tr>
            ))}
          </Table>
        )}

        {activeTab === 'Lifetime' && (
          <Table headers={['Year', 'Generation kWh', 'Savings', 'CO₂ Saved', 'Status']}>
            {initialEnergyData.lifetimeView.map((l, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 'bold' }}>{l.year}</td>
                <td>{l.totalGeneration} kWh</td>
                <td>{l.savings}</td>
                <td>{l.co2Saved} Tons</td>
                <td><Badge type={l.status}>{l.status}</Badge></td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Summary KPI Cards */}
      <h3 style={{ fontSize: '16px', margin: '24px 0 12px', textAlign: 'left' }}>System Performance Indicators</h3>
      <div className="stats-grid">
        <StatCard label="Total Units" value="13,232 kWh" desc="Lifetime aggregate yield" />
        <StatCard label="Peak Time" value="12:45 PM" desc="Best sunlight conversion hours" />
      </div>
      <div className="stats-grid">
        <StatCard label="Average Generation" value="22.8 kWh/day" desc="Expected base rating" />
        <StatCard label="Maximum Generation" value="31.2 kWh" desc="Record single day yield" />
      </div>
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <StatCard label="Minimum Generation" value="8.4 kWh" desc="Overcast rain performance" />
        <StatCard label="Efficiency %" value="94.2%" desc="Inverter conversion health" />
      </div>
    </div>
  );
}
