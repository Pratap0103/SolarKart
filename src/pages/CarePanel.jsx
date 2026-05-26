import React, { useState } from 'react';
import { 
  Play, 
  Check, 
  AlertTriangle, 
  Phone, 
  MessageCircle, 
  Wrench, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  Droplet,
  Info,
  ChevronRight
} from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';

export default function CarePanel({ 
  profile, 
  amc, 
  onNavigateTab, 
  showToast,
  lastCleanedDate,
  nextCleanedDate,
  onMarkCleaned
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dustLevel, setDustLevel] = useState('light'); // none, light, thick, heavy
  
  // Custom video guide data
  const careVideos = [
    {
      id: 'vid-1',
      title: "Solar Panel Wash Protocol",
      duration: "3:45",
      category: "Cleaning Guide",
      description: "Learn how to wash panels safely using soft microfiber pads and clean water to prevent thermal shock and scale marks.",
      thumbnail: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&q=80",
      steps: [
        "Perform cleaning during early morning (before 8 AM) or late evening to prevent thermal shock.",
        "Use purified soft water. Avoid harsh detergents or mineral-rich hard water.",
        "Gently mop with a microfiber squeegee pad. Do not scrub hard.",
        "Dry immediately with a clean wiper to prevent scaling/spots."
      ],
      tips: [
        "Never step on the panels under any circumstances.",
        "Avoid using high-pressure jet washers which can crack solar cells internally."
      ]
    },
    {
      id: 'vid-2',
      title: "Inverter Diagnostics & Fault 402",
      duration: "5:12",
      category: "Troubleshooting",
      description: "Quick diagnostic walkthrough on reading LED alerts, checking the ACDB box, and solving Grid Surge code 402.",
      thumbnail: "https://images.unsplash.com/photo-1581092334651-ddf26d9aae9d?auto=format&fit=crop&w=400&q=80",
      steps: [
        "Inspect the inverter front panel. Identify if status light is blinking green or solid red.",
        "Open your ACDB distribution box and check if Grid Surge Protector (SPD) red indicator is visible.",
        "If surge fuse is blown, safely switch off the DC Isolator first, followed by the AC breaker.",
        "Wait for 5 minutes, turn the AC breaker back on, then engage the DC isolator."
      ],
      tips: [
        "If red surge flags remain up after reboot, register a ticket to have technicians replace the AC fuse cartridge under warranty."
      ]
    },
    {
      id: 'vid-3',
      title: "Rooftop Structural Safety",
      duration: "4:15",
      category: "Safety Protocol",
      description: "Crucial guidelines for safe traversal around mounting structures, testing ground wires, and inspecting rust proofing.",
      thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
      steps: [
        "Always wear high-grip rubber-insulated boots when traversing rooftops.",
        "Inspect galvanized structural bolts for snug fitment after strong winds.",
        "Check that structural grounding wire (earthing) is tightly clamped to soil rod.",
        "Ensure DC cables are bundled neatly in protective conduits and not hanging loose."
      ],
      tips: [
        "During storm alerts, ensure structures are clear of potential loose debris."
      ]
    },
    {
      id: 'vid-4',
      title: "Understanding Bidirectional Billing",
      duration: "6:20",
      category: "Billing Guide",
      description: "Deep dive explaining how net metering measures import, exports surplus solar units, and deducts cost from your DISCOM bill.",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
      steps: [
        "Read Zone 1 (Imports) and Zone 2 (Exports) on your digital bidirectional net meter.",
        "Calculate daily net consumption: Net KWh = Imported units - Exported surplus units.",
        "Verify standard DISCOM bill matches net figures. Solar credits accumulate over month-end billing cycles."
      ],
      tips: [
        "Make sure net billing cycles are certified annually with local utilities to receive proper credit rates."
      ]
    }
  ];

  // Live dust calculations
  const calculateDustLoss = () => {
    switch (dustLevel) {
      case 'none':
        return { percent: 0, rupee: 0, text: "System is operating at Peak Efficiency!", severity: "success" };
      case 'light':
        return { percent: 3, rupee: 12, text: "Light dust layer. Yield reduced by ~3%. Clean soon.", severity: "warning" };
      case 'thick':
        return { percent: 12, rupee: 48, text: "Thick dust/Mud layer! Yield reduced by ~12%. Washing highly advised.", severity: "danger" };
      case 'heavy':
        return { percent: 22, rupee: 88, text: "Heavy Bird Droppings/Debris! ~22% critical loss. Immediate wash required to prevent hotspot damage.", severity: "danger" };
      default:
        return { percent: 0, rupee: 0, text: "Unknown", severity: "warning" };
    }
  };

  const dustMetrics = calculateDustLoss();

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      

      {/* Grid: Dust Calculator + Schedule Tracker */}
      <div className="care-tracker-grid">
        
        {/* Dust Loss Calculator */}
        <div className="dust-calc-card">
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplet size={18} style={{ color: 'var(--primary-green)' }} /> Live Dust Yield Loss Calculator
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--gray-text)', marginBottom: '14px' }}>
            Select your panels' physical status to estimate immediate power generation and monetary loss.
          </p>

          <div className="dust-levels-row">
            <button 
              className={`dust-level-btn ${dustLevel === 'none' ? 'active' : ''}`}
              onClick={() => setDustLevel('none')}
            >
              ☀️ Clean<br/>(0% loss)
            </button>
            <button 
              className={`dust-level-btn ${dustLevel === 'light' ? 'active' : ''}`}
              onClick={() => setDustLevel('light')}
            >
              🌪️ Light Dust<br/>(-3% loss)
            </button>
            <button 
              className={`dust-level-btn ${dustLevel === 'thick' ? 'active' : ''}`}
              onClick={() => setDustLevel('thick')}
            >
              🌫️ Thick Mud<br/>(-12% loss)
            </button>
            <button 
              className={`dust-level-btn ${dustLevel === 'heavy' ? 'active' : ''}`}
              onClick={() => setDustLevel('heavy')}
            >
              🐦 Droppings<br/>(-22% loss)
            </button>
          </div>

          <div className={`calc-impact-box ${dustMetrics.severity === 'success' ? 'healthy' : ''}`}>
            <div>
              <span className={`calc-impact-lbl ${dustMetrics.severity === 'success' ? 'healthy' : ''}`}>
                Estimated Power Loss:
              </span>
              <p style={{ fontSize: '11px', color: 'var(--gray-text)', marginTop: '2px', fontWeight: '500' }}>
                {dustMetrics.text}
              </p>
            </div>
            <span className={`calc-impact-val ${dustMetrics.severity === 'success' ? 'healthy' : ''}`}>
              {dustMetrics.percent > 0 ? `-${dustMetrics.percent}%` : '0%'}
            </span>
          </div>

          {dustMetrics.percent > 0 && (
            <div style={{ marginTop: '14px', background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--gray-text)' }}>Estimated Money Wasted:</span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--danger)' }}>₹{dustMetrics.rupee} / day</span>
            </div>
          )}
        </div>

        {/* Cleaning & Maintenance Schedule Tracker */}
        <div className="clean-schedule-card">
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: 'var(--primary-green)' }} /> Cleaning & Maintenance Schedule
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--gray-text)', marginBottom: '14px' }}>
              Tracking automated 15-day service intervals to ensure solar yield optimization.
            </p>

            <div className="schedule-row">
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-text)' }}>Last Self-Cleaning Wash</span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--dark-blue)' }}>{lastCleanedDate}</span>
            </div>
            <div className="schedule-row">
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-text)' }}>Next Recommended Wash</span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--warning)' }}>{nextCleanedDate}</span>
            </div>
            <div className="schedule-row">
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-text)' }}>Active Care Plan Cover</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-green)' }}>{amc.planName}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                onMarkCleaned();
                setDustLevel('none');
              }}
              style={{ flex: 1, padding: '10px', fontSize: '12px', background: 'var(--primary-green)', color: '#FFFFFF' }}
            >
              <Check size={14} style={{ marginRight: '4px' }} /> Mark Cleaned Today
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => {
                onNavigateTab('services');
                setTimeout(() => {
                  showToast("Washing ticket raised in cleaning division", "info");
                }, 200);
              }}
              style={{ padding: '10px', fontSize: '12px', background: 'transparent', border: '1px solid #CBD5E1' }}
            >
              Book Service Wash
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Grid Section */}
      <h3 className="care-section-title">
        <Play size={18} style={{ strokeWidth: 3, color: 'var(--primary-green)' }} /> Interactive Care & Training Playlists
      </h3>
      
      <div className="care-playlist">
        {careVideos.map((video) => (
          <div 
            key={video.id} 
            className="care-video-card"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="video-card-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
              <div className="video-play-overlay">
                <Play size={20} fill="#FFF" style={{ marginLeft: '4px' }} />
              </div>
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-card-content">
              <div>
                <span className="badge badge-info" style={{ fontSize: '9px', marginBottom: '8px' }}>
                  {video.category}
                </span>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '4px', lineSize: '1.2' }}>
                  {video.title}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--gray-text)', lineHeight: '1.3' }}>
                  {video.description}
                </p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--primary-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '12px' }}>
                Watch Guide & Playbook <ChevronRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Urgent Care & Contacts Hub */}
      <h3 className="care-section-title">
        <HelpCircle size={18} style={{ color: 'var(--primary-green)' }} /> Urgent Care & Technical Support
      </h3>
      
      <div className="support-hub">
        <a href="tel:+919876543210" style={{ textDecoration: 'none' }} className="support-item">
          <div className="support-icon-wrap">
            <Phone size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--dark-blue)' }}>Call Lead Engineer</h4>
            <p style={{ fontSize: '10px', color: 'var(--gray-text)' }}>Rajesh Kumar (SK-992)</p>
          </div>
        </a>

        <div 
          className="support-item"
          onClick={() => {
            window.open('https://wa.me/919876543210', '_blank');
            showToast("Opening WhatsApp Chat...", "info");
          }}
        >
          <div className="support-icon-wrap" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <MessageCircle size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--dark-blue)' }}>WhatsApp Assistant</h4>
            <p style={{ fontSize: '10px', color: 'var(--gray-text)' }}>Chat live for panel reports</p>
          </div>
        </div>

        <div 
          className="support-item"
          onClick={() => {
            onNavigateTab('services');
            showToast("Configure details to submit maintenance request.", "info");
          }}
        >
          <div className="support-icon-wrap" style={{ background: '#FFF7ED', color: 'var(--warning)' }}>
            <Wrench size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--dark-blue)' }}>Raise Maintenance Ticket</h4>
            <p style={{ fontSize: '10px', color: 'var(--gray-text)' }}>Book professional repairs</p>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYBACK DETAILS MODAL */}
      <Modal 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
        title={`${selectedVideo?.category} Playbook`}
      >
        {selectedVideo && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <span className="badge badge-info" style={{ width: 'fit-content', fontSize: '10px' }}>
              {selectedVideo.category}
            </span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--dark-blue)' }}>
              {selectedVideo.title}
            </h3>
            
            {/* Embedded mockup video stream layout */}
            <div style={{
              background: '#0B132B',
              aspectRatio: '16/9',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid rgba(0, 82, 255, 0.15)',
              boxShadow: 'inset 0 0 40px rgba(0,82,255,0.3)'
            }}>
              <img 
                src={selectedVideo.thumbnail} 
                alt="playing" 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} 
              />
              <Play size={44} style={{ color: '#FFFFFF', zIndex: 2, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))', cursor: 'pointer' }} />
              <span style={{ fontSize: '11px', fontWeight: '800', zIndex: 2, marginTop: '8px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px' }}>
                ▶️ Stream Active: {selectedVideo.duration}
              </span>
              
              {/* Playback bar simulation */}
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '4px', background: 'rgba(255,255,255,0.2)', zIndex: 3 }}>
                <div style={{ width: '42%', height: '100%', background: 'var(--primary-green)' }} />
              </div>
            </div>

            <p style={{ color: 'var(--gray-text)', lineHeight: '1.4' }}>
              {selectedVideo.description}
            </p>

            <div>
              <h4 style={{ fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '6px', fontSize: '13px' }}>
                🛠️ Step-by-Step Training Protocol
              </h4>
              <ol style={{ paddingLeft: '18px', margin: '0' }}>
                {selectedVideo.steps.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: '6px', color: 'var(--text-dark)', lineHeight: '1.3' }}>{step}</li>
                ))}
              </ol>
            </div>

            <div style={{ background: 'var(--light-green)', color: 'var(--primary-green)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(0, 82, 255, 0.08)' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                💡 Pro Tips for Optimal Yield
              </h4>
              <ul style={{ paddingLeft: '18px', margin: '0', fontSize: '11px', color: 'var(--dark-blue)' }}>
                {selectedVideo.tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{tip}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <Button onClick={() => setSelectedVideo(null)}>Done, Close Playbook</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
