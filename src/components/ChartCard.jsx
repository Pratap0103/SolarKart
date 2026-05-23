import React from 'react';

export default function ChartCard({ title, badgeText, data = [], type = 'Day' }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {badgeText && <span className="badge badge-success">{badgeText}</span>}
      </div>

      <div className="chart-container-inner">
        <div className="chart-axis-y">
          <span>Max</span>
          <span>Med</span>
          <span>0</span>
        </div>
        <div className="chart-bars-wrapper">
          {type === 'Day' &&
            data.map((d, index) => (
              <div key={index} className="chart-bar-col">
                <div
                  className="chart-bar-fill"
                  style={{
                    height: `${Math.min(100, d.generation * 18)}%`,
                    background: d.peakTime ? 'var(--sky-blue)' : 'var(--primary-green)'
                  }}
                >
                  <span className="chart-tooltip">{d.generation} kW</span>
                </div>
                <span className="chart-label-x">{d.hour.split(' ')[0]}</span>
              </div>
            ))}

          {type === 'Week' &&
            data.map((d, index) => (
              <div key={index} className="chart-bar-col">
                <div className="chart-bar-fill" style={{ height: `${Math.min(100, d.generation * 3.5)}%` }}>
                  <span className="chart-tooltip">{d.generation} kWh</span>
                </div>
                <span className="chart-label-x">{d.dayName.substring(0, 3)}</span>
              </div>
            ))}

          {type === 'Month' &&
            data.map((d, index) => (
              <div key={index} className="chart-bar-col">
                <div className="chart-bar-fill" style={{ height: `${Math.min(100, d.avgGeneration * 3.6)}%` }}>
                  <span className="chart-tooltip">Avg: {d.avgGeneration} kWh</span>
                </div>
                <span className="chart-label-x" style={{ fontSize: '8px' }}>{d.date.replace('May ', '')}</span>
              </div>
            ))}

          {type === 'Year' &&
            data.map((d, index) => (
              <div key={index} className="chart-bar-col">
                <div className="chart-bar-fill" style={{ height: `${Math.min(100, d.generation * 0.12)}%` }}>
                  <span className="chart-tooltip">{d.generation} kWh</span>
                </div>
                <span className="chart-label-x">{d.month}</span>
              </div>
            ))}

          {type === 'Lifetime' &&
            data.map((d, index) => (
              <div key={index} className="chart-bar-col">
                <div className="chart-bar-fill" style={{ height: `${Math.min(100, d.totalGeneration * 0.012)}%` }}>
                  <span className="chart-tooltip">{d.totalGeneration} kWh</span>
                </div>
                <span className="chart-label-x">{d.year}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
