import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Layout & Reusable components
import Header from './components/Header';
import Sidebar from './components/Sidebar';


// Page-wise components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Savings from './pages/Savings';
import ServiceComplaint from './pages/ServiceComplaint';
import DocumentCenter from './pages/DocumentCenter';
import CarePanel from './pages/CarePanel';
import NotificationsPage from './pages/NotificationsPage';
import ReferralSystem from './pages/ReferralSystem';
import AISolarAssistant from './pages/AISolarAssistant';
import WeatherPage from './pages/WeatherPage';
import PlantHealth from './pages/PlantHealth';
import AMCManagement from './pages/AMCManagement';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Usage from './pages/Usage';

// Mock initial data sources
import {
  initialProfile,
  initialWeather,
  initialAMC,
  initialPlantHealth,
  initialReferrals,
  initialDocuments,
  initialNotifications,
  initialEngineers,
  initialTickets,
  initialHistoryTickets,
  initialCustomers
} from './dummyData';

const safeStorageSet = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (e) {
    console.warn(`LocalStorage quota exceeded when setting ${key}.`);
    if (e.name === 'QuotaExceededError' || (e.message && e.message.toLowerCase().includes('quota'))) {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith('sk_')) {
          localStorage.removeItem(k);
        }
      }
      try {
        localStorage.setItem(key, data);
      } catch (innerE) {
        console.error("Still exceeding quota after clearing sk_ keys.");
      }
    }
  }
};

export default function App() {
  // --- CORE APP STATE ---
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('sk_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  useEffect(() => {
    safeStorageSet('sk_customers', JSON.stringify(customers));
  }, [customers]);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sk_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('sk_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('sk_tickets');
    return saved ? JSON.parse(saved) : initialTickets;
  });

  const [historyTickets, setHistoryTickets] = useState(() => {
    const saved = localStorage.getItem('sk_history_tickets');
    return saved ? JSON.parse(saved) : initialHistoryTickets;
  });

  const [amc, setAmc] = useState(() => {
    const saved = localStorage.getItem('sk_amc');
    return saved ? JSON.parse(saved) : initialAMC;
  });

  const [referrals, setReferrals] = useState(() => {
    const saved = localStorage.getItem('sk_referrals');
    return saved ? JSON.parse(saved) : initialReferrals;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sk_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('sk_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [plantHealth, setPlantHealth] = useState(() => {
    const saved = localStorage.getItem('sk_plant_health');
    return saved ? JSON.parse(saved) : initialPlantHealth;
  });

  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem('sk_weather');
    return saved ? JSON.parse(saved) : initialWeather;
  });

  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Namaste! Welcome to SolarKart AI Assistant. How can I help you optimize your solar energy generation today? (You can toggle language/Hindi below)', time: 'Just now' }
  ]);

  const [lastCleanedDate, setLastCleanedDate] = useState(() => {
    const saved = localStorage.getItem('sk_last_cleaned_date');
    return saved ? saved : 'May 20, 2026';
  });

  const [nextCleanedDate, setNextCleanedDate] = useState(() => {
    const saved = localStorage.getItem('sk_next_cleaned_date');
    return saved ? saved : 'June 04, 2026';
  });

  // --- UI NAVIGATION & TOAST STATES ---
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatLang, setChatLang] = useState('EN'); // EN or HI
  const [toasts, setToasts] = useState([]);

  // --- PWA WEB APP INSTALL LOGIC ---
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      showToast('To install: click your browser menu and select "Install" or "Add to Home Screen".', 'info');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  // --- LOCAL PERSISTENCE TRIGGERS ---
  useEffect(() => {
    safeStorageSet('sk_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    safeStorageSet('sk_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    safeStorageSet('sk_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    safeStorageSet('sk_history_tickets', JSON.stringify(historyTickets));
  }, [historyTickets]);

  useEffect(() => {
    safeStorageSet('sk_amc', JSON.stringify(amc));
  }, [amc]);

  useEffect(() => {
    safeStorageSet('sk_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    safeStorageSet('sk_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    safeStorageSet('sk_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    safeStorageSet('sk_plant_health', JSON.stringify(plantHealth));
  }, [plantHealth]);

  useEffect(() => {
    safeStorageSet('sk_weather', JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    safeStorageSet('sk_last_cleaned_date', lastCleanedDate);
  }, [lastCleanedDate]);

  useEffect(() => {
    safeStorageSet('sk_next_cleaned_date', nextCleanedDate);
  }, [nextCleanedDate]);

  const handleMarkCleaned = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedToday = today.toLocaleDateString('en-US', options);
    
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + 15);
    const formattedNext = nextDate.toLocaleDateString('en-US', options);
    
    setLastCleanedDate(formattedToday);
    setNextCleanedDate(formattedNext);
    
    showToast("Solar panels marked as fully cleaned!", "success");
  };

  // --- HELPER HANDLERS ---
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleLogin = (role, mobile, custId) => {
    if (role === 'admin') {
      const user = {
        role: 'admin',
        mobile: mobile || '9999999999',
        customerId: 'ADMIN-SYS',
        name: 'SolarKart Admin'
      };
      setCurrentUser(user);

      // Aggregated admin view data:
      const allActiveTickets = customers.flatMap(c => c.tickets || []);
      const allHistoryTickets = customers.flatMap(c => c.historyTickets || []);
      const allLeads = customers.flatMap(c => c.referrals?.leads || []);
      const totalRef = customers.reduce((sum, c) => sum + (c.referrals?.totalReferrals || 0), 0);
      const pendingRew = `₹${customers.reduce((sum, c) => sum + parseInt((c.referrals?.pendingRewards || '0').replace(/[^\d]/g, '') || 0), 0).toLocaleString('en-IN')}`;
      const earnedRew = `₹${customers.reduce((sum, c) => sum + parseInt((c.referrals?.earnedRewards || '0').replace(/[^\d]/g, '') || 0), 0).toLocaleString('en-IN')}`;

      setTickets(allActiveTickets);
      setHistoryTickets(allHistoryTickets);
      setReferrals({
        referralCode: 'ADMIN-GLOBAL',
        totalReferrals: totalRef,
        pendingRewards: pendingRew,
        earnedRewards: earnedRew,
        leads: allLeads
      });

      setActivePage('admin_dashboard');
      showToast('Logged in successfully as Admin!');
    } else {
      // Find matching customer by mobile or customerId
      let matched = customers.find(c => c.customerId === custId || c.mobile === mobile);
      if (!matched) {
        // Fallback to Aarav Sharma if not found
        matched = customers.find(c => c.customerId === 'SK-90821') || customers[0];
      }

      const user = {
        role: 'customer',
        mobile: matched.mobile,
        customerId: matched.customerId,
        name: matched.profile.customerName
      };
      setCurrentUser(user);

      // Populate session states for this customer
      setProfile(matched.profile);
      setTickets(matched.tickets || []);
      setHistoryTickets(matched.historyTickets || []);
      setAmc(matched.amc);
      setReferrals(matched.referrals);
      setNotifications(matched.notifications || []);
      setDocuments(matched.documents || []);
      setPlantHealth(matched.plantHealth);
      setWeather(matched.weather);

      setActivePage('dashboard');
      showToast(`Logged in successfully as ${matched.profile.customerName}!`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.');
  };

  const handleRaiseTicket = (newForm) => {
    const customerId = currentUser?.customerId || 'SK-90821';
    const customerName = currentUser?.name || profile.customerName;
    const newTicket = {
      ticketId: newForm.ticketId,
      customerId,
      customerName,
      title: newForm.title,
      description: newForm.description,
      category: newForm.category,
      priority: newForm.priority,
      createdDate: new Date().toISOString().split('T')[0],
      preferredDate: newForm.preferredDate || new Date().toISOString().split('T')[0],
      preferredTimeSlot: newForm.preferredTimeSlot,
      customerRemark: newForm.customerRemark,
      status: 'Open',
      assignedEngineer: '',
      engineerMobile: '',
      photoUrl: newForm.dummyPhoto,
      videoUrl: newForm.dummyVideo,
      visits: [],
      logs: [
        {
          status: 'Open',
          note: 'Ticket created: ' + newForm.description,
          updatedBy: customerName,
          dateTime: new Date().toLocaleString()
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);

    // Create a new unread notification item
    const notifId = 'NOT-' + Math.floor(1000 + Math.random() * 9000);
    const newNotif = {
      notificationId: notifId,
      type: 'Maintenance reminder',
      message: `New ticket ${newForm.ticketId} raised successfully: ${newForm.title}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Sync to customers state
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) => {
        if (c.customerId === customerId) {
          return {
            ...c,
            tickets: [newTicket, ...(c.tickets || [])],
            notifications: [newNotif, ...(c.notifications || [])]
          };
        }
        return c;
      })
    );

    showToast(`Ticket ${newForm.ticketId} registered!`);
  };

  const handleAssignEngineer = (ticketId, form) => {
    const engineer = initialEngineers.find((eng) => eng.name === form.engineerName);
    
    // Update active tickets state
    const updated = tickets.map((t) => {
      if (t.ticketId === ticketId) {
        return {
          ...t,
          status: 'Assigned',
          assignedEngineer: form.engineerName,
          engineerMobile: engineer ? engineer.mobile : '+91 9999999999',
          logs: [
            ...t.logs,
            {
              status: 'Assigned',
              note: `Engineer ${form.engineerName} assigned. Visit: ${form.visitDate || 'TBD'} (${form.visitTime}). Admin Note: ${form.adminNote}`,
              updatedBy: 'Admin',
              dateTime: new Date().toLocaleString()
            }
          ]
        };
      }
      return t;
    });
    setTickets(updated);

    // Sync to matching customer in database
    const targetTicket = tickets.find((t) => t.ticketId === ticketId);
    if (targetTicket) {
      const targetCustId = targetTicket.customerId;
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) => {
          if (c.customerId === targetCustId) {
            return {
              ...c,
              tickets: (c.tickets || []).map((t) => {
                if (t.ticketId === ticketId) {
                  return {
                    ...t,
                    status: 'Assigned',
                    assignedEngineer: form.engineerName,
                    engineerMobile: engineer ? engineer.mobile : '+91 9999999999',
                    logs: [
                      ...t.logs,
                      {
                        status: 'Assigned',
                        note: `Engineer ${form.engineerName} assigned. Visit: ${form.visitDate || 'TBD'} (${form.visitTime}). Admin Note: ${form.adminNote}`,
                        updatedBy: 'Admin',
                        dateTime: new Date().toLocaleString()
                      }
                    ]
                  };
                }
                return t;
              })
            };
          }
          return c;
        })
      );
    }

    showToast(`Engineer assigned to ticket ${ticketId}`);
  };

  const handleUpdateStatus = (ticketId, newStatus, note) => {
    const updated = tickets.map((t) => {
      if (t.ticketId === ticketId) {
        return {
          ...t,
          status: newStatus,
          logs: [
            ...t.logs,
            {
              status: newStatus,
              note: note || `Status updated to ${newStatus}.`,
              updatedBy: currentUser?.name || 'Staff',
              dateTime: new Date().toLocaleString()
            }
          ]
        };
      }
      return t;
    });
    setTickets(updated);

    const targetTicket = tickets.find((t) => t.ticketId === ticketId);
    if (targetTicket) {
      const targetCustId = targetTicket.customerId;
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) => {
          if (c.customerId === targetCustId) {
            return {
              ...c,
              tickets: (c.tickets || []).map((t) => {
                if (t.ticketId === ticketId) {
                  return {
                    ...t,
                    status: newStatus,
                    logs: [
                      ...t.logs,
                      {
                        status: newStatus,
                        note: note || `Status updated to ${newStatus}.`,
                        updatedBy: currentUser?.name || 'Staff',
                        dateTime: new Date().toLocaleString()
                      }
                    ]
                  };
                }
                return t;
              })
            };
          }
          return c;
        })
      );
    }

    showToast(`Ticket ${ticketId} status updated to ${newStatus}`);
  };

  const handleAddVisit = (ticketId, form) => {
    const targetTicket = tickets.find((t) => t.ticketId === ticketId);
    if (!targetTicket) return;

    const newVisit = {
      visitDate: form.visitDate || new Date().toISOString().split('T')[0],
      engineerName: targetTicket.assignedEngineer || 'Field Technician',
      workDone: form.workDone,
      partsUsed: form.partsUsed || 'None',
      engineerComment: form.engineerComment,
      customerComment: form.customerComment
    };

    // Add service report document to records
    const docId = 'DOC-' + Math.floor(1000 + Math.random() * 9000);
    const newDoc = {
      documentId: docId,
      documentName: `Service Report - ${targetTicket.category} (${ticketId})`,
      documentType: 'Service Report',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '1.2 MB',
      status: 'Signed'
    };
    setDocuments((prev) => [newDoc, ...prev]);

    const updated = tickets.map((t) => {
      if (t.ticketId === ticketId) {
        return {
          ...t,
          status: 'Resolved',
          visits: [...t.visits, newVisit],
          logs: [
            ...t.logs,
            {
              status: 'Resolved',
              note: `Engineer visit reported. Work Done: ${form.workDone}. Status set to Resolved.`,
              updatedBy: t.assignedEngineer || 'Engineer',
              dateTime: new Date().toLocaleString()
            }
          ]
        };
      }
      return t;
    });
    setTickets(updated);

    const targetCustId = targetTicket.customerId;
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) => {
        if (c.customerId === targetCustId) {
          return {
            ...c,
            documents: [newDoc, ...(c.documents || [])],
            tickets: (c.tickets || []).map((t) => {
              if (t.ticketId === ticketId) {
                return {
                  ...t,
                  status: 'Resolved',
                  visits: [...t.visits, newVisit],
                  logs: [
                    ...t.logs,
                    {
                      status: 'Resolved',
                      note: `Engineer visit reported. Work Done: ${form.workDone}. Status set to Resolved.`,
                      updatedBy: t.assignedEngineer || 'Engineer',
                      dateTime: new Date().toLocaleString()
                    }
                  ]
                };
              }
              return t;
            })
          };
        }
        return c;
      })
    );

    showToast(`Visit report logged. Status resolved.`);
  };

  const handleCloseTicket = (ticketId, rating, feedback, resolutionSummary) => {
    const targetTicket = tickets.find((t) => t.ticketId === ticketId) || historyTickets.find((t) => t.ticketId === ticketId);
    if (!targetTicket) return;

    const closedRecord = {
      ...targetTicket,
      status: 'Closed',
      resolvedDate: targetTicket.preferredDate,
      closedDate: new Date().toISOString().split('T')[0],
      customerRating: Number(rating),
      customerFeedback: feedback || 'No remarks provided.',
      logs: [
        ...targetTicket.logs,
        {
          status: 'Closed',
          note: `Ticket closed by customer. Rating: ${rating} Stars. Feedback: ${feedback}`,
          updatedBy: 'Customer',
          dateTime: new Date().toLocaleString()
        }
      ]
    };

    setHistoryTickets((prev) => [closedRecord, ...prev]);
    setTickets((prev) => prev.filter((t) => t.ticketId !== ticketId));

    const targetCustId = targetTicket.customerId;
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) => {
        if (c.customerId === targetCustId) {
          return {
            ...c,
            tickets: (c.tickets || []).filter((t) => t.ticketId !== ticketId),
            historyTickets: [closedRecord, ...(c.historyTickets || [])]
          };
        }
        return c;
      })
    );

    showToast(`Ticket ${ticketId} is Closed and archived.`);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.customerId === currentUser?.customerId) {
          return { ...c, profile: updatedProfile };
        }
        return c;
      })
    );
    showToast('Profile information updated successfully!');
  };

  const handleRenewAmc = (amcForm) => {
    const newAmcId = 'AMC-' + Math.floor(1000 + Math.random() * 9000);
    const renewedPlan = {
      amcId: newAmcId,
      planName: amcForm.newPlan,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      amount: amcForm.amount,
      servicesIncluded: 4,
      servicesUsed: 0,
      status: 'Active'
    };

    const updatedAmc = {
      planName: amcForm.newPlan,
      status: 'Active',
      remainingDays: 365,
      servicesRemaining: 4,
      expiryDate: renewedPlan.endDate,
      renewalAmount: amcForm.amount,
      history: [renewedPlan, ...amc.history]
    };
    setAmc(updatedAmc);

    const docId = 'DOC-' + Math.floor(1000 + Math.random() * 9000);
    const newInvoice = {
      documentId: docId,
      documentName: `AMC Renewal Invoice (${newAmcId})`,
      documentType: 'Invoice',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '1.4 MB',
      status: 'Paid'
    };
    setDocuments((prev) => [newInvoice, ...prev]);

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.customerId === currentUser?.customerId) {
          return {
            ...c,
            amc: updatedAmc,
            documents: [newInvoice, ...(c.documents || [])]
          };
        }
        return c;
      })
    );

    showToast('AMC Plan Renewed successfully!');
  };

  const handleRegisterReferral = (newReferral) => {
    const refId = 'REF-' + Math.floor(100 + Math.random() * 900);
    const newLead = {
      referralId: refId,
      name: newReferral.name,
      mobile: newReferral.mobile,
      city: newReferral.city,
      plantInterest: newReferral.plantInterest,
      status: 'Lead Created',
      rewardAmount: '₹2,500',
      rewardStatus: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    const updatedReferrals = {
      ...referrals,
      totalReferrals: referrals.totalReferrals + 1,
      leads: [newLead, ...referrals.leads]
    };
    setReferrals(updatedReferrals);

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.customerId === currentUser?.customerId) {
          return { ...c, referrals: updatedReferrals };
        }
        return c;
      })
    );

    showToast(`Referral registered for ${newReferral.name}!`);
  };

  const handleSendMessage = (text) => {
    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let aiText = '';
      const query = text.toLowerCase();

      if (query.includes('low') || query.includes('कम')) {
        aiText = chatLang === 'EN'
          ? 'Low energy yield is usually caused by dust layer on panels, cloud shadowing, battery levels or fault code 402. Clean your panels or check Plant Health diagnostics.'
          : 'सोलर पैनलों पर धूल जमने, बादलों की छाया, बैटरी स्तर या इनवर्टर त्रुटि कोड 402 के कारण बिजली उत्पादन कम हो सकता है।';
      } else if (query.includes('clean') || query.includes('सफाई') || query.includes('wash')) {
        aiText = chatLang === 'EN'
          ? 'Recommended panel cleaning interval is 15 days. Your panels were last cleaned on May 20, 2026. The next automated cleaning is scheduled on May 28, 2026.'
          : 'पैनलों की सफाई हर 15 दिनों में की जानी चाहिए। पिछली सफाई 20 मई, 2026 को हुई थी। अगली सफाई 28 मई, 2026 को निर्धारित है।';
      } else if (query.includes('save') || query.includes('बचत') || query.includes('money')) {
        aiText = chatLang === 'EN'
          ? `You have saved ₹7,300 this month. Lifetime savings reached ₹1.92 Lakhs (approx. 48.5% recovery rate of your net system investment).`
          : `आपने इस महीने ₹7,300 की बचत की है। कुल जीवनकाल बचत ₹1.92 लाख तक पहुंच गई है।`;
      } else if (query.includes('maintenance') || query.includes('रखरखाव') || query.includes('schedule')) {
        aiText = chatLang === 'EN'
          ? 'Your next maintenance visit is scheduled for June 10, 2026. This includes string fuse tests, structural tightening, and inverter diagnostic validation.'
          : 'आपकी अगली रखरखाव जांच 10 जून, 2026 को निर्धारित है।';
      } else if (query.includes('402')) {
        aiText = chatLang === 'EN'
          ? 'Inverter Fault Code 402 represents an AC Surge Protection Device (SPD) blow-out. Please raise a service ticket or trigger "Create Ticket" from Plant Health.'
          : 'इनवर्टर फॉल्ट कोड 402 एसी सर्ज प्रोटेक्शन डिवाइस (SPD) के फ्यूज खराब होने को दर्शाता है। कृपया सर्विस टिकट उठाएं।';
      } else {
        aiText = chatLang === 'EN'
          ? "I am your SolarKart Solar Assistant. Ask me about low generation, panel washing dates, savings progress, or active inverter fault codes."
          : "मैं आपका सोलरकार्ट सोलर असिस्टेंट हूँ। आप मुझसे कम उत्पादन, सफाई तिथियों, बचत या त्रुटि कोड के बारे में पूछ सकते हैं।";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const handleToggleLang = () => {
    setChatLang((prev) => (prev === 'EN' ? 'HI' : 'EN'));
    showToast(`Switched chat assistant language to ${chatLang === 'EN' ? 'Hindi' : 'English'}`);
  };

  const handleMarkRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === notifId ? { ...n, status: 'Read' } : n))
    );
    showToast('Alert marked as read.');
  };

  const handleDeleteNotification = (notifId) => {
    setNotifications((prev) => prev.filter((n) => n.notificationId !== notifId));
    showToast('Alert deleted.');
  };

  const handleUpdateCity = (city) => {
    setWeather((prev) => ({
      ...prev,
      city,
      temp: city === 'Pune' ? '32°C' : city === 'Bangalore' ? '28°C' : '35°C',
      humidity: city === 'Pune' ? '45%' : city === 'Bangalore' ? '60%' : '52%',
      expectedKWh: city === 'Pune' ? '24.5 kWh' : city === 'Bangalore' ? '21.0 kWh' : '26.8 kWh'
    }));
  };

  const handleCreateTicketFromAlert = (category) => {
    setActivePage('services');
    showToast(`Category ${category} auto-filled. Complete details to submit ticket.`, 'info');
  };

  const unreadNotifCount = notifications.filter((n) => n.status === 'Unread').length;

  return (
    <>
      {/* Dynamic Toast Portal */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === 'success' && <CheckCircle2 size={16} />}
            {t.type === 'error' && <AlertTriangle size={16} />}
            {t.type === 'info' && <Bell size={16} />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* RENDER LOGIN IF NOT LOGGED IN */}
      {!currentUser ? (
        <Login onLogin={handleLogin} showToast={showToast} />
      ) : (
        /* RENDER DUAL GRID WEB LAYOUT: Top Header + Left Sidebar Navigation + Main Content Area */
        <div className="app-layout">
          {/* Permanent Desktop Left Sidebar Navigation / Responsive Slide-out on Mobile */}
          <Sidebar
            activePage={activePage}
            onPageChange={setActivePage}
            role={currentUser.role}
            unreadNotifCount={unreadNotifCount}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Core Content Layout Area */}
          <div className="app-body">
            {/* Common Header Layout */}
            <Header
              currentUser={currentUser}
              profile={profile}
              unreadNotifCount={unreadNotifCount}
              onOpenNotifications={() => setActivePage('notifications')}
              onLogout={handleLogout}
              onToggleSidebar={() => setIsSidebarOpen(true)}
            />



            <main className="main-content">
              {/* RENDER CONDITIONAL PAGE VIEWS */}
              {activePage === 'dashboard' && (
                <Dashboard
                  profile={profile}
                  amc={amc}
                  currentUser={currentUser}
                  usage={customers.find(c => c.customerId === currentUser?.customerId)?.usage}
                  onNavigateTab={setActivePage}
                  onNavigateMorePage={setActivePage}
                  lastCleanedDate={lastCleanedDate}
                  nextCleanedDate={nextCleanedDate}
                  onTriggerModal={(modalName) => {
                    if (modalName === 'raiseTicket') {
                      setActivePage('services');
                      setTimeout(() => {
                        const btn = document.querySelector('button[title="Raise Ticket"]');
                        if (btn) btn.click();
                      }, 100);
                    }
                  }}
                />
              )}
              {activePage === 'usage' && (
                <Usage
                  usage={customers.find(c => c.customerId === currentUser?.customerId)?.usage}
                  profile={profile}
                />
              )}
              {activePage === 'analytics' && <Analytics />}
              {activePage === 'savings' && <Savings />}
              {activePage === 'services' && (
                <ServiceComplaint
                  tickets={tickets}
                  historyTickets={historyTickets}
                  currentUser={currentUser}
                  onRaiseTicket={handleRaiseTicket}
                  onAssignEngineer={handleAssignEngineer}
                  onUpdateStatus={handleUpdateStatus}
                  onAddVisit={handleAddVisit}
                  onCloseTicket={handleCloseTicket}
                  showToast={showToast}
                />
              )}
              {activePage === 'documents' && (
                <DocumentCenter documents={documents} showToast={showToast} />
              )}
              {activePage === 'care_panel' && (
                <CarePanel
                  profile={profile}
                  amc={amc}
                  onNavigateTab={setActivePage}
                  showToast={showToast}
                  lastCleanedDate={lastCleanedDate}
                  nextCleanedDate={nextCleanedDate}
                  onMarkCleaned={handleMarkCleaned}
                />
              )}
              {activePage === 'notifications' && (
                <NotificationsPage
                  notifications={notifications}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDeleteNotification}
                />
              )}
              {activePage === 'referrals' && (
                <ReferralSystem
                  referrals={referrals}
                  onRegisterReferral={handleRegisterReferral}
                  showToast={showToast}
                />
              )}
              {activePage === 'ai_assistant' && (
                <AISolarAssistant
                  chatMessages={chatMessages}
                  onSendMessage={handleSendMessage}
                  chatLang={chatLang}
                  onToggleLang={handleToggleLang}
                  showToast={showToast}
                />
              )}
              {activePage === 'weather' && (
                <WeatherPage
                  weather={weather}
                  onUpdateCity={handleUpdateCity}
                  showToast={showToast}
                />
              )}
              {activePage === 'plant_health' && (
                <PlantHealth
                  plantHealth={plantHealth}
                  onCreateTicketFromAlert={handleCreateTicketFromAlert}
                  showToast={showToast}
                />
              )}
              {activePage === 'amc' && (
                <AMCManagement
                  amc={amc}
                  profile={profile}
                  onRenewAmc={handleRenewAmc}
                  showToast={showToast}
                />
              )}
              {activePage === 'profile' && (
                <Profile
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                  onNavigateMorePage={setActivePage}
                  onLogout={handleLogout}
                />
              )}
              {activePage === 'admin_dashboard' && (
                <AdminDashboard
                  tickets={tickets}
                  historyTickets={historyTickets}
                  referrals={referrals}
                  onAssignEngineer={handleAssignEngineer}
                  onUpdateStatus={handleUpdateStatus}
                  onAddVisit={handleAddVisit}
                  onCloseTicket={handleCloseTicket}
                  showToast={showToast}
                  customers={customers}
                />
              )}
            </main>
            


            {/* Global Fixed Footer */}
            <footer className="app-footer">
              Powered by <a href="https://www.botivate.in" target="_blank" rel="noreferrer">Botivate</a>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
