export const initialProfile = {
  customerName: "Aarav Sharma",
  mobileNumber: "9876543210",
  email: "aarav.sharma@solarkart.com",
  address: "Flat 402, Green Meadows, Sector 15, Gurgaon",
  location: "Gurgaon, Haryana",
  alternateMobile: "9876543211",
  installationDate: "2024-03-15",
  plantCapacity: "5.4 kWp",
  plantType: "On-Grid Rooftop",
  installerDetails: "SolarKart Engineering Team (Lead: Rajesh Kumar, ID: SKT-992)",
  inverterBrand: "SolarKart Hybrid Smart Inverter 6kVA",
  panelBrand: "SolarKart Mono-Perc Half Cut 540W (10 Panels)"
};

export const initialWeather = {
  city: "Gurgaon",
  temp: "38°C",
  humidity: "42%",
  condition: "Sunny Skies",
  sunlightHours: "8.5",
  rainChance: "5%",
  expectedKWh: "24.8 kWh",
  forecast: [
    { date: "May 24", weather: "Clear Sunny", temp: "38°C", rainChance: "5%", sunlightHours: "8.5", expectedKWh: "24.8 kWh" },
    { date: "May 25", weather: "Mostly Sunny", temp: "37°C", rainChance: "10%", sunlightHours: "8.2", expectedKWh: "23.5 kWh" },
    { date: "May 26", weather: "Partly Cloudy", temp: "35°C", rainChance: "25%", sunlightHours: "7.0", expectedKWh: "20.1 kWh" },
    { date: "May 27", weather: "Scattered Rain", temp: "31°C", rainChance: "60%", sunlightHours: "4.5", expectedKWh: "12.8 kWh" },
    { date: "May 28", weather: "Light Showers", temp: "32°C", rainChance: "45%", sunlightHours: "5.5", expectedKWh: "15.4 kWh" },
    { date: "May 29", weather: "Sunny Breaks", temp: "34°C", rainChance: "20%", sunlightHours: "7.8", expectedKWh: "22.0 kWh" },
    { date: "May 30", weather: "Full Sun", temp: "39°C", rainChance: "0%", sunlightHours: "9.0", expectedKWh: "26.2 kWh" }
  ]
};

export const initialAMC = {
  planName: "SolarKart Care Platinum",
  status: "Active",
  remainingDays: 296,
  servicesRemaining: 3,
  expiryDate: "2027-03-14",
  renewalAmount: "₹4,999",
  history: [
    {
      amcId: "AMC-1092",
      planName: "SolarKart Care Platinum",
      startDate: "2025-03-15",
      endDate: "2026-03-14",
      amount: "₹4,999",
      servicesIncluded: 4,
      servicesUsed: 4,
      status: "Completed"
    },
    {
      amcId: "AMC-2083",
      planName: "SolarKart Care Platinum",
      startDate: "2026-03-15",
      endDate: "2027-03-14",
      amount: "₹4,999",
      servicesIncluded: 4,
      servicesUsed: 1,
      status: "Active"
    }
  ]
};

export const initialPlantHealth = {
  efficiencyScore: 97,
  components: [
    { component: "Solar Panels (10x Mono-Perc)", status: "Healthy", efficiency: "98.2%", lastChecked: "10 mins ago", alert: "None" },
    { component: "Smart Inverter (6kVA)", status: "Healthy", efficiency: "96.5%", lastChecked: "10 mins ago", alert: "None" },
    { component: "Battery Storage Bank", status: "Healthy", efficiency: "95.0%", lastChecked: "10 mins ago", alert: "None" },
    { component: "ACDB/DCDB Surge Protectors", status: "Healthy", efficiency: "100%", lastChecked: "1 hour ago", alert: "None" },
    { component: "Net Metering Unit", status: "Healthy", efficiency: "99.1%", lastChecked: "1 hour ago", alert: "None" }
  ],
  alerts: [
    { id: "PH-ALT-1", type: "Cleaning Required", message: "Dust accumulation detected on Panel Group B. Estimated generation impact: -3%.", severity: "Warning" }
  ]
};

export const initialReferrals = {
  referralCode: "SKART-AARAV54",
  totalReferrals: 4,
  pendingRewards: "₹1,000",
  earnedRewards: "₹5,000",
  leads: [
    {
      referralId: "REF-001",
      name: "Vikram Malhotra",
      mobile: "9810123456",
      city: "Delhi",
      plantInterest: "8 kW On-Grid",
      status: "Converted",
      rewardAmount: "₹2,500",
      rewardStatus: "Paid",
      date: "2026-04-10"
    },
    {
      referralId: "REF-002",
      name: "Sneha Patel",
      mobile: "9930294817",
      city: "Mumbai",
      plantInterest: "3 kW Hybrid",
      status: "Converted",
      rewardAmount: "₹2,500",
      rewardStatus: "Paid",
      date: "2026-04-22"
    },
    {
      referralId: "REF-003",
      name: "Rajesh Singhal",
      mobile: "9871239847",
      city: "Noida",
      plantInterest: "5 kW On-Grid",
      status: "Site Visit",
      rewardAmount: "₹2,500",
      rewardStatus: "Pending",
      date: "2026-05-18"
    },
    {
      referralId: "REF-004",
      name: "Preeti Joshi",
      mobile: "9560382910",
      city: "Gurgaon",
      plantInterest: "10 kW Off-Grid",
      status: "Contacted",
      rewardAmount: "₹5,000",
      rewardStatus: "Pending",
      date: "2026-05-22"
    }
  ]
};

export const initialDocuments = [
  { documentId: "DOC-9012", documentName: "Tax Invoice - Solar Installation", documentType: "Invoice", uploadDate: "2024-03-15", fileSize: "1.8 MB", status: "Verified" },
  { documentId: "DOC-8210", documentName: "Technical Proposal & Layout Plan", documentType: "Quotation", uploadDate: "2024-02-28", fileSize: "4.2 MB", status: "Approved" },
  { documentId: "DOC-7391", documentName: "Vidyut Board Net Metering Work Order", documentType: "Work Order", uploadDate: "2024-03-02", fileSize: "1.1 MB", status: "Completed" },
  { documentId: "DOC-4921", documentName: "Commissioning & Safety Certificate", documentType: "Installation Report", uploadDate: "2024-03-15", fileSize: "2.5 MB", status: "Verified" },
  { documentId: "DOC-5011", documentName: "Panel Warranty Certificate (25 Years)", documentType: "Warranty Card", uploadDate: "2024-03-15", fileSize: "950 KB", status: "Active" },
  { documentId: "DOC-6302", documentName: "AMC Agreement - Gold Cover", documentType: "AMC Agreement", uploadDate: "2026-03-15", fileSize: "1.3 MB", status: "Active" },
  { documentId: "DOC-1102", documentName: "SolarKart Hybrid Inverter User Manual", documentType: "User Manual", uploadDate: "2024-03-15", fileSize: "6.8 MB", status: "Available" }
];

export const initialNotifications = [
  { notificationId: "NOT-9021", type: "Cleaning reminder", message: "Dust accumulation detected on panels. Schedule a cleaning to boost efficiency by 3%.", date: "2026-05-23", status: "Unread" },
  { notificationId: "NOT-8120", type: "Low generation alert", message: "Generation drops below 15kWh due to heavy cloud cover in Gurgaon.", date: "2026-05-22", status: "Read" },
  { notificationId: "NOT-7301", type: "Referral rewards", message: "Congratulations! Referral Vikram Malhotra converted. ₹2500 reward credited to your bank.", date: "2026-04-12", status: "Read" },
  { notificationId: "NOT-6082", type: "Maintenance reminder", message: "Quarterly preventative maintenance service scheduled for May 28, 2026.", date: "2026-05-20", status: "Unread" },
  { notificationId: "NOT-5091", type: "AMC expiry alert", message: "Your AMC plan was auto-renewed successfully on March 15, 2026.", date: "2026-03-15", status: "Read" }
];

export const initialEngineers = [
  { name: "Suresh Chandra", mobile: "+91 9988776655", specialty: "Inverter Specialist" },
  { name: "Rohan Varma", mobile: "+91 8877665544", specialty: "Solar Panel & Electrical Expert" },
  { name: "Pooja Hegde", mobile: "+91 7766554433", specialty: "Net Metering Technical Officer" },
  { name: "Vikram Rathore", mobile: "+91 6655443322", specialty: "General Maintenance & Cleaning Lead" }
];

export const initialTickets = [
  {
    ticketId: "SKT-2083",
    title: "Slight drop in daily generation",
    description: "Daily generation is hover around 19kWh compared to average 24kWh during sunny days.",
    category: "Low generation",
    priority: "Medium",
    createdDate: "2026-05-21",
    preferredDate: "2026-05-25",
    preferredTimeSlot: "10:00 AM - 01:00 PM",
    customerRemark: "Please call before arrival.",
    status: "Assigned",
    assignedEngineer: "Suresh Chandra",
    engineerMobile: "+91 9988776655",
    visits: [],
    logs: [
      { status: "Open", note: "Ticket created by customer.", updatedBy: "Aarav Sharma", dateTime: "2026-05-21 09:30 AM" },
      { status: "Assigned", note: "Engineer Suresh Chandra assigned for visit.", updatedBy: "Admin Portal", dateTime: "2026-05-21 11:00 AM" }
    ]
  },
  {
    ticketId: "SKT-2094",
    title: "Quarterly panel washing request",
    description: "Requesting professional wash and angle check for optimal output.",
    category: "Cleaning request",
    priority: "Low",
    createdDate: "2026-05-23",
    preferredDate: "2026-05-27",
    preferredTimeSlot: "02:00 PM - 05:00 PM",
    customerRemark: "Need morning slot if possible, otherwise afternoon is okay.",
    status: "Open",
    assignedEngineer: "",
    engineerMobile: "",
    visits: [],
    logs: [
      { status: "Open", note: "Ticket submitted online.", updatedBy: "Aarav Sharma", dateTime: "2026-05-23 08:15 AM" }
    ]
  }
];

export const initialHistoryTickets = [
  {
    ticketId: "SKT-1092",
    title: "Inverter offline code 402",
    description: "Inverter screen showing code 402 red light, solar power not supplying house.",
    category: "Inverter issue",
    priority: "Emergency",
    createdDate: "2026-04-10",
    resolvedDate: "2026-04-12",
    closedDate: "2026-04-13",
    status: "Closed",
    assignedEngineer: "Suresh Chandra",
    engineerMobile: "+91 9988776655",
    customerRating: 5,
    customerFeedback: "Suresh diagnosed the issue instantly. The surge protector fuse had blown. He replaced it and restarted system. Exceptional service!",
    visits: [
      {
        visitDate: "2026-04-12",
        engineerName: "Suresh Chandra",
        workDone: "Replaced blown AC Surge Protection fuse, updated inverter firmware, checked connection cables.",
        partsUsed: "AC SPD Fuse (16A) - Under Warranty",
        engineerComment: "System fully operational after replacement. Cleaned inverter vents."
      }
    ],
    logs: [
      { status: "Open", note: "Ticket submitted by customer.", updatedBy: "Aarav Sharma", dateTime: "2026-04-10 10:00 AM" },
      { status: "Assigned", note: "Urgent dispatch to Suresh Chandra.", updatedBy: "Admin", dateTime: "2026-04-10 10:15 AM" },
      { status: "In Progress", note: "Engineer arrived at site.", updatedBy: "Suresh Chandra", dateTime: "2026-04-12 11:30 AM" },
      { status: "Resolved", note: "Fuse replaced, system working.", updatedBy: "Suresh Chandra", dateTime: "2026-04-12 12:45 PM" },
      { status: "Closed", note: "Customer confirmed resolution and left rating.", updatedBy: "Aarav Sharma", dateTime: "2026-04-13 02:00 PM" }
    ]
  }
];

export const initialEnergyData = {
  dayView: [
    { hour: "06:00 AM", generation: 0.1, peakTime: false },
    { hour: "07:00 AM", generation: 0.8, peakTime: false },
    { hour: "08:00 AM", generation: 1.5, peakTime: false },
    { hour: "09:00 AM", generation: 2.4, peakTime: false },
    { hour: "10:00 AM", generation: 3.5, peakTime: false },
    { hour: "11:00 AM", generation: 4.2, peakTime: false },
    { hour: "12:00 PM", generation: 4.8, peakTime: false },
    { hour: "01:00 PM", generation: 5.0, peakTime: true },
    { hour: "02:00 PM", generation: 4.5, peakTime: false },
    { hour: "03:00 PM", generation: 3.8, peakTime: false },
    { hour: "04:00 PM", generation: 2.2, peakTime: false },
    { hour: "05:00 PM", generation: 1.0, peakTime: false },
    { hour: "06:00 PM", generation: 0.2, peakTime: false }
  ],
  weekView: [
    { dayName: "Monday", generation: 22.8, weather: "Sunny", efficiency: "96%" },
    { dayName: "Tuesday", generation: 24.1, weather: "Sunny", efficiency: "98%" },
    { dayName: "Wednesday", generation: 23.4, weather: "Clear", efficiency: "97%" },
    { dayName: "Thursday", generation: 18.2, weather: "Partly Cloudy", efficiency: "88%" },
    { dayName: "Friday", generation: 14.5, weather: "Overcast", efficiency: "72%" },
    { dayName: "Saturday", generation: 22.4, weather: "Sunny", efficiency: "95%" },
    { dayName: "Sunday", generation: 24.8, weather: "Sunny", efficiency: "99%" }
  ],
  monthView: [
    { date: "May 01 - 05", generation: 118, avgGeneration: 23.6, highestDay: 25.1, lowestDay: 19.5 },
    { date: "May 06 - 10", generation: 122, avgGeneration: 24.4, highestDay: 25.6, lowestDay: 22.0 },
    { date: "May 11 - 15", generation: 105, avgGeneration: 21.0, highestDay: 24.8, lowestDay: 14.2 },
    { date: "May 16 - 20", generation: 116, avgGeneration: 23.2, highestDay: 25.0, lowestDay: 18.9 },
    { date: "May 21 - 25", generation: 110, avgGeneration: 22.0, highestDay: 24.8, lowestDay: 14.5 }
  ],
  yearView: [
    { month: "Jan", generation: 380, savings: "₹2,660", efficiency: "82%" },
    { month: "Feb", generation: 440, savings: "₹3,080", efficiency: "88%" },
    { month: "Mar", generation: 520, savings: "₹3,640", efficiency: "94%" },
    { month: "Apr", generation: 610, savings: "₹4,270", efficiency: "98%" },
    { month: "May", generation: 572, savings: "₹4,004", efficiency: "96%" }
  ],
  lifetimeView: [
    { year: "2024", totalGeneration: 4890, totalSavings: "₹34,230", co2Saved: "3.9 Tons" },
    { year: "2025", totalGeneration: 5820, totalSavings: "₹40,740", co2Saved: "4.6 Tons" },
    { year: "2026 (YTD)", totalGeneration: 2522, totalSavings: "₹17,654", co2Saved: "2.0 Tons" }
  ]
};

export const initialSavings = {
  systemCost: "₹4,50,000",
  subsidyReceived: "₹50,000",
  netInvestment: "₹4,00,000",
  monthlyBillBefore: "₹8,500",
  monthlyBillAfter: "₹1,200",
  monthlySavings: "₹7,300",
  totalMoneySaved: "₹1,92,624",
  roiPercentage: "48%",
  paybackPeriod: "4.5 Years",
  remainingRecoveryPeriod: "2.3 Years",
  recoveredAmount: 192624,
  investmentAmount: 400000,
  savingsLog: [
    { month: "Jan 2026", billBefore: "₹8,500", billAfter: "₹1,200", savings: "₹7,300", cumulativeSavings: "₹1,70,724", roiPercent: "42.7%" },
    { month: "Feb 2026", billBefore: "₹8,000", billAfter: "₹1,100", savings: "₹6,900", cumulativeSavings: "₹1,77,624", roiPercent: "44.4%" },
    { month: "Mar 2026", billBefore: "₹8,800", billAfter: "₹1,300", savings: "₹7,500", cumulativeSavings: "₹1,85,124", roiPercent: "46.3%" },
    { month: "Apr 2026", billBefore: "₹9,200", billAfter: "₹1,400", savings: "₹7,800", cumulativeSavings: "₹1,92,924", roiPercent: "48.2%" },
    { month: "May 2026", billBefore: "₹8,500", billAfter: "₹1,200", savings: "₹7,300", cumulativeSavings: "₹2,00,224", roiPercent: "50.1%" }
  ]
};

export const initialFAQs = [
  {
    title: "How often should I clean my solar panels?",
    category: "Maintenance",
    description: "It is recommended to clean panels every 2-3 weeks to avoid dust build-up, especially in high-dust regions like Northern India. Morning or late evening cleaning prevents thermal shock.",
    videoUrl: "https://www.youtube.com/embed/dummy1",
    steps: [
      "Wait for panels to cool down (early morning is best).",
      "Use clean water without softeners or harsh detergents.",
      "Use a soft micro-fiber squeegee or soft wiper brush.",
      "Gently wash away dust; avoid scratching panel surface."
    ],
    tips: [
      "Never stand or step on panels.",
      "Do not use high-pressure washers as they can damage cells."
    ]
  },
  {
    title: "What does inverter fault code 402 mean?",
    category: "Safety & Troubleshooting",
    description: "Inverter Fault Code 402 typically signifies an AC Grid Surge Protection Device (SPD) blow or an overvoltage state from the grid.",
    videoUrl: "https://www.youtube.com/embed/dummy2",
    steps: [
      "Inspect the ACDB box to see if the SPD red flags are visible.",
      "Turn off the DC Isolator switch.",
      "Turn off the AC MCB.",
      "Wait 5 minutes, turn on AC MCB, then turn on DC Isolator."
    ],
    tips: [
      "If the issue persists, raise a ticket instantly through the Service section."
    ]
  },
  {
    title: "Understanding Net Metering Billing",
    category: "Billing & ROI",
    description: "Net metering records export of surplus power to grid and imports at night, billing you for net consumption.",
    videoUrl: "https://www.youtube.com/embed/dummy3",
    steps: [
      "Check reading on Net Meter (Import vs Export zones).",
      "Observe solar credits listed on DISCOM bill.",
      "Your surplus units are accumulated or paid out at standard tariff."
    ],
    tips: [
      "Ensure DISCOM meter reader scans the bidirectional details properly."
    ]
  }
];

export const dummyLearningCards = [
  {
    title: "Solar Panel Wash Protocol",
    category: "Cleaning Videos",
    description: "Step-by-step video instruction to clean panels safely without scratch marks.",
    steps: ["Use purified water", "Gently mop with micro-fiber pad", "Dry cleanly to avoid scaling"],
    tips: ["Perform early morning", "Avoid hot hours"]
  },
  {
    title: "Inverter Diagnostics Guide",
    category: "Maintenance Videos",
    description: "Understand LED indicator status lights, error code reads, and quick reboots.",
    steps: ["Read front LED layout", "Understand red/green blink frequency", "Follow power down sequence"],
    tips: ["Never open inverter box yourself", "Keep vent space clear"]
  },
  {
    title: "Rooftop Safety Guidelines",
    category: "Safety Guidelines",
    description: "Important safety alerts when walking around rooftop mounting structures.",
    steps: ["Wear rubber grip footwear", "Maintain distance from cable joints", "Be aware of wet surfaces"],
    tips: ["Secure loose panels during storms", "Keep kids away from system area"]
  },
  {
    title: "Warranty Reclamation Steps",
    category: "Warranty Information",
    description: "How to claim standard warranty for components like panels, structural fittings, and inverters.",
    steps: ["Locate invoice in Document Center", "Locate serial code on the module", "Submit complaint with photo"],
    tips: ["Damage from external debris/storms requires insurance claim, not warranty"]
  }
];

export const initialChatQuestions = [
  "My generation is low",
  "When should I clean my panel?",
  "How much money did I save?",
  "When is my next maintenance?",
  "What is inverter fault 402?"
];

export const initialCustomers = [
  {
    customerId: "SK-90821",
    mobile: "9876543210",
    profile: {
      customerName: "Aarav Sharma",
      mobileNumber: "9876543210",
      email: "aarav.sharma@solarkart.com",
      address: "Flat 402, Green Meadows, Sector 15, Gurgaon",
      location: "Gurgaon, Haryana",
      alternateMobile: "9876543211",
      installationDate: "2024-03-15",
      plantCapacity: "5.4 kWp",
      plantType: "On-Grid Rooftop",
      installerDetails: "SolarKart Engineering Team (Lead: Rajesh Kumar, ID: SKT-992)",
      inverterBrand: "SolarKart Hybrid Smart Inverter 6kVA",
      panelBrand: "SolarKart Mono-Perc Half Cut 540W (10 Panels)"
    },
    weather: {
      city: "Gurgaon",
      temp: "38°C",
      humidity: "42%",
      condition: "Sunny Skies",
      sunlightHours: "8.5",
      rainChance: "5%",
      expectedKWh: "24.8 kWh",
      forecast: [
        { date: "May 24", weather: "Clear Sunny", temp: "38°C", rainChance: "5%", sunlightHours: "8.5", expectedKWh: "24.8 kWh" },
        { date: "May 25", weather: "Mostly Sunny", temp: "37°C", rainChance: "10%", sunlightHours: "8.2", expectedKWh: "23.5 kWh" },
        { date: "May 26", weather: "Partly Cloudy", temp: "35°C", rainChance: "25%", sunlightHours: "7.0", expectedKWh: "20.1 kWh" },
        { date: "May 27", weather: "Scattered Rain", temp: "31°C", rainChance: "60%", sunlightHours: "4.5", expectedKWh: "12.8 kWh" },
        { date: "May 28", weather: "Light Showers", temp: "32°C", rainChance: "45%", sunlightHours: "5.5", expectedKWh: "15.4 kWh" },
        { date: "May 29", weather: "Sunny Breaks", temp: "34°C", rainChance: "20%", sunlightHours: "7.8", expectedKWh: "22.0 kWh" },
        { date: "May 30", weather: "Full Sun", temp: "39°C", rainChance: "0%", sunlightHours: "9.0", expectedKWh: "26.2 kWh" }
      ]
    },
    amc: {
      planName: "SolarKart Care Platinum",
      status: "Active",
      remainingDays: 296,
      servicesRemaining: 3,
      expiryDate: "2027-03-14",
      renewalAmount: "₹4,999",
      history: [
        {
          amcId: "AMC-1092",
          planName: "SolarKart Care Platinum",
          startDate: "2025-03-15",
          endDate: "2026-03-14",
          amount: "₹4,999",
          servicesIncluded: 4,
          servicesUsed: 4,
          status: "Completed"
        },
        {
          amcId: "AMC-2083",
          planName: "SolarKart Care Platinum",
          startDate: "2026-03-15",
          endDate: "2027-03-14",
          amount: "₹4,999",
          servicesIncluded: 4,
          servicesUsed: 1,
          status: "Active"
        }
      ]
    },
    plantHealth: {
      efficiencyScore: 97,
      components: [
        { component: "Solar Panels (10x Mono-Perc)", status: "Healthy", efficiency: "98.2%", lastChecked: "10 mins ago", alert: "None" },
        { component: "Smart Inverter (6kVA)", status: "Healthy", efficiency: "96.5%", lastChecked: "10 mins ago", alert: "None" },
        { component: "Battery Storage Bank", status: "Healthy", efficiency: "95.0%", lastChecked: "10 mins ago", alert: "None" },
        { component: "ACDB/DCDB Surge Protectors", status: "Healthy", efficiency: "100%", lastChecked: "1 hour ago", alert: "None" },
        { component: "Net Metering Unit", status: "Healthy", efficiency: "99.1%", lastChecked: "1 hour ago", alert: "None" }
      ],
      alerts: [
        { id: "PH-ALT-1", type: "Cleaning Required", message: "Dust accumulation detected on Panel Group B. Estimated generation impact: -3%.", severity: "Warning" }
      ]
    },
    referrals: {
      referralCode: "SKART-AARAV54",
      totalReferrals: 4,
      pendingRewards: "₹1,000",
      earnedRewards: "₹5,000",
      leads: [
        {
          referralId: "REF-001",
          name: "Vikram Malhotra",
          mobile: "9810123456",
          city: "Delhi",
          plantInterest: "8 kW On-Grid",
          status: "Converted",
          rewardAmount: "₹2,500",
          rewardStatus: "Paid",
          date: "2026-04-10"
        },
        {
          referralId: "REF-002",
          name: "Sneha Patel",
          mobile: "9930294817",
          city: "Mumbai",
          plantInterest: "3 kW Hybrid",
          status: "Converted",
          rewardAmount: "₹2,500",
          rewardStatus: "Paid",
          date: "2026-04-22"
        },
        {
          referralId: "REF-003",
          name: "Rajesh Singhal",
          mobile: "9871239847",
          city: "Noida",
          plantInterest: "5 kW On-Grid",
          status: "Site Visit",
          rewardAmount: "₹2,500",
          rewardStatus: "Pending",
          date: "2026-05-18"
        },
        {
          referralId: "REF-004",
          name: "Preeti Joshi",
          mobile: "9560382910",
          city: "Gurgaon",
          plantInterest: "10 kW Off-Grid",
          status: "Contacted",
          rewardAmount: "₹5,000",
          rewardStatus: "Pending",
          date: "2026-05-22"
        }
      ]
    },
    documents: [
      { documentId: "DOC-9012", documentName: "Tax Invoice - Solar Installation", documentType: "Invoice", uploadDate: "2024-03-15", fileSize: "1.8 MB", status: "Verified" },
      { documentId: "DOC-8210", documentName: "Technical Proposal & Layout Plan", documentType: "Quotation", uploadDate: "2024-02-28", fileSize: "4.2 MB", status: "Approved" },
      { documentId: "DOC-7391", documentName: "Vidyut Board Net Metering Work Order", documentType: "Work Order", uploadDate: "2024-03-02", fileSize: "1.1 MB", status: "Completed" },
      { documentId: "DOC-4921", documentName: "Commissioning & Safety Certificate", documentType: "Installation Report", uploadDate: "2024-03-15", fileSize: "2.5 MB", status: "Verified" },
      { documentId: "DOC-5011", documentName: "Panel Warranty Certificate (25 Years)", documentType: "Warranty Card", uploadDate: "2024-03-15", fileSize: "950 KB", status: "Active" },
      { documentId: "DOC-6302", documentName: "AMC Agreement - Gold Cover", documentType: "AMC Agreement", uploadDate: "2026-03-15", fileSize: "1.3 MB", status: "Active" },
      { documentId: "DOC-1102", documentName: "SolarKart Hybrid Inverter User Manual", documentType: "User Manual", uploadDate: "2024-03-15", fileSize: "6.8 MB", status: "Available" }
    ],
    notifications: [
      { notificationId: "NOT-9021", type: "Cleaning reminder", message: "Dust accumulation detected on panels. Schedule a cleaning to boost efficiency by 3%.", date: "2026-05-23", status: "Unread" },
      { notificationId: "NOT-8120", type: "Low generation alert", message: "Generation drops below 15kWh due to heavy cloud cover in Gurgaon.", date: "2026-05-22", status: "Read" },
      { notificationId: "NOT-7301", type: "Referral rewards", message: "Congratulations! Referral Vikram Malhotra converted. ₹2500 reward credited to your bank.", date: "2026-04-12", status: "Read" },
      { notificationId: "NOT-6082", type: "Maintenance reminder", message: "Quarterly preventative maintenance service scheduled for May 28, 2026.", date: "2026-05-20", status: "Unread" },
      { notificationId: "NOT-5091", type: "AMC expiry alert", message: "Your AMC plan was auto-renewed successfully on March 15, 2026.", date: "2026-03-15", status: "Read" }
    ],
    tickets: [
      {
        ticketId: "SKT-2083",
        customerId: "SK-90821",
        customerName: "Aarav Sharma",
        title: "Slight drop in daily generation",
        description: "Daily generation is hover around 19kWh compared to average 24kWh during sunny days.",
        category: "Low generation",
        priority: "Medium",
        createdDate: "2026-05-21",
        preferredDate: "2026-05-25",
        preferredTimeSlot: "10:00 AM - 01:00 PM",
        customerRemark: "Please call before arrival.",
        status: "Assigned",
        assignedEngineer: "Suresh Chandra",
        engineerMobile: "+91 9988776655",
        visits: [],
        logs: [
          { status: "Open", note: "Ticket created by customer.", updatedBy: "Aarav Sharma", dateTime: "2026-05-21 09:30 AM" },
          { status: "Assigned", note: "Engineer Suresh Chandra assigned for visit.", updatedBy: "Admin Portal", dateTime: "2026-05-21 11:00 AM" }
        ]
      },
      {
        ticketId: "SKT-2094",
        customerId: "SK-90821",
        customerName: "Aarav Sharma",
        title: "Quarterly panel washing request",
        description: "Requesting professional wash and angle check for optimal output.",
        category: "Cleaning request",
        priority: "Low",
        createdDate: "2026-05-23",
        preferredDate: "2026-05-27",
        preferredTimeSlot: "02:00 PM - 05:00 PM",
        customerRemark: "Need morning slot if possible, otherwise afternoon is okay.",
        status: "Open",
        assignedEngineer: "",
        engineerMobile: "",
        visits: [],
        logs: [
          { status: "Open", note: "Ticket submitted online.", updatedBy: "Aarav Sharma", dateTime: "2026-05-23 08:15 AM" }
        ]
      }
    ],
    historyTickets: [
      {
        ticketId: "SKT-1092",
        customerId: "SK-90821",
        customerName: "Aarav Sharma",
        title: "Inverter offline code 402",
        description: "Inverter screen showing code 402 red light, solar power not supplying house.",
        category: "Inverter issue",
        priority: "Emergency",
        createdDate: "2026-04-10",
        resolvedDate: "2026-04-12",
        closedDate: "2026-04-13",
        status: "Closed",
        assignedEngineer: "Suresh Chandra",
        engineerMobile: "+91 9988776655",
        customerRating: 5,
        customerFeedback: "Suresh diagnosed the issue instantly. The surge protector fuse had blown. He replaced it and restarted system. Exceptional service!",
        visits: [
          {
            visitDate: "2026-04-12",
            engineerName: "Suresh Chandra",
            workDone: "Replaced blown AC Surge Protection fuse, updated inverter firmware, checked connection cables.",
            partsUsed: "AC SPD Fuse (16A) - Under Warranty",
            engineerComment: "System fully operational after replacement. Cleaned inverter vents."
          }
        ],
        logs: [
          { status: "Open", note: "Ticket submitted by customer.", updatedBy: "Aarav Sharma", dateTime: "2026-04-10 10:00 AM" },
          { status: "Assigned", note: "Urgent dispatch to Suresh Chandra.", updatedBy: "Admin", dateTime: "2026-04-10 10:15 AM" },
          { status: "In Progress", note: "Engineer arrived at site.", updatedBy: "Suresh Chandra", dateTime: "2026-04-12 11:30 AM" },
          { status: "Resolved", note: "Fuse replaced, system working.", updatedBy: "Suresh Chandra", dateTime: "2026-04-12 12:45 PM" },
          { status: "Closed", note: "Customer confirmed resolution and left rating.", updatedBy: "Aarav Sharma", dateTime: "2026-04-13 02:00 PM" }
        ]
      }
    ],
    savings: {
      systemCost: "₹4,50,000",
      subsidyReceived: "₹50,000",
      netInvestment: "₹4,00,000",
      monthlyBillBefore: "₹8,500",
      monthlyBillAfter: "₹1,200",
      monthlySavings: "₹7,300",
      totalMoneySaved: "₹1,92,624",
      roiPercentage: "48%",
      paybackPeriod: "4.5 Years",
      remainingRecoveryPeriod: "2.3 Years",
      recoveredAmount: 192624,
      investmentAmount: 400000,
      savingsLog: [
        { month: "Jan 2026", billBefore: "₹8,500", billAfter: "₹1,200", savings: "₹7,300", cumulativeSavings: "₹1,70,724", roiPercent: "42.7%" },
        { month: "Feb 2026", billBefore: "₹8,000", billAfter: "₹1,100", savings: "₹6,900", cumulativeSavings: "₹1,77,624", roiPercent: "44.4%" },
        { month: "Mar 2026", billBefore: "₹8,800", billAfter: "₹1,300", savings: "₹7,500", cumulativeSavings: "₹1,85,124", roiPercent: "46.3%" },
        { month: "Apr 2026", billBefore: "₹9,200", billAfter: "₹1,400", savings: "₹7,800", cumulativeSavings: "₹1,92,924", roiPercent: "48.2%" },
        { month: "May 2026", billBefore: "₹8,500", billAfter: "₹1,200", savings: "₹7,300", cumulativeSavings: "₹2,00,224", roiPercent: "50.1%" }
      ]
    },
    usage: {
      activeKW: 3.8,
      capacityKW: 6.0,
      batterySoC: 82,
      batteryWatts: 1200,
      homeUsage: 2.1,
      gridExport: 0.5,
      appliances: [
        { name: "EV Smart Charger", consumption: 1200, status: "Active", icon: "Car" },
        { name: "Living Room AC", consumption: 600, status: "Active", icon: "Wind" },
        { name: "Double Door Refrigerator", consumption: 200, status: "Active", icon: "Tv" },
        { name: "Smart Lighting & Fans", consumption: 100, status: "Active", icon: "Lightbulb" }
      ]
    }
  },
  {
    customerId: "SK-87214",
    mobile: "9812345678",
    profile: {
      customerName: "Rajesh Kumar",
      mobileNumber: "9812345678",
      email: "rajesh.kumar@solarkart.com",
      address: "Flat 402, Green Meadows, Baner, Pune",
      location: "Pune, Maharashtra",
      alternateMobile: "9812345679",
      installationDate: "2023-11-20",
      plantCapacity: "10.0 kWp",
      plantType: "On-Grid Rooftop",
      installerDetails: "SolarKart Pune Franchise (Lead: Anil Kulkarni, ID: SKT-448)",
      inverterBrand: "Solax Smart Inverter 10 kW",
      panelBrand: "SolarKart Perc Monocrystalline Panels (20 Panels)"
    },
    weather: {
      city: "Pune",
      temp: "32°C",
      humidity: "45%",
      condition: "Partly Cloudy",
      sunlightHours: "7.8",
      rainChance: "15%",
      expectedKWh: "42.5 kWh",
      forecast: [
        { date: "May 24", weather: "Partly Cloudy", temp: "32°C", rainChance: "15%", sunlightHours: "7.8", expectedKWh: "42.5 kWh" },
        { date: "May 25", weather: "Sunny Breaks", temp: "33°C", rainChance: "10%", sunlightHours: "8.0", expectedKWh: "44.0 kWh" }
      ]
    },
    amc: {
      planName: "SolarKart Care Platinum",
      status: "Active",
      remainingDays: 142,
      servicesRemaining: 2,
      expiryDate: "2026-10-19",
      renewalAmount: "₹8,999",
      history: [
        {
          amcId: "AMC-4029",
          planName: "SolarKart Care Platinum",
          startDate: "2025-10-20",
          endDate: "2026-10-19",
          amount: "₹8,999",
          servicesIncluded: 4,
          servicesUsed: 2,
          status: "Active"
        }
      ]
    },
    plantHealth: {
      efficiencyScore: 94,
      components: [
        { component: "Solar Panels (20x Perc Mono)", status: "Healthy", efficiency: "95.5%", lastChecked: "5 mins ago", alert: "None" },
        { component: "Smart Inverter (10kW)", status: "Healthy", efficiency: "94.2%", lastChecked: "5 mins ago", alert: "None" },
        { component: "Net Metering Unit", status: "Healthy", efficiency: "98.8%", lastChecked: "30 mins ago", alert: "None" }
      ],
      alerts: []
    },
    referrals: {
      referralCode: "SKART-RAJESH99",
      totalReferrals: 1,
      pendingRewards: "₹0",
      earnedRewards: "₹2,500",
      leads: [
        {
          referralId: "REF-091",
          name: "Milind Gokhale",
          mobile: "9820294817",
          city: "Pune",
          plantInterest: "5 kW On-Grid",
          status: "Converted",
          rewardAmount: "₹2,500",
          rewardStatus: "Paid",
          date: "2026-02-14"
        }
      ]
    },
    documents: [
      { documentId: "DOC-4011", documentName: "Tax Invoice - Solar Installation 10kW", documentType: "Invoice", uploadDate: "2023-11-20", fileSize: "2.4 MB", status: "Verified" },
      { documentId: "DOC-4012", documentName: "Net Metering Work Order", documentType: "Work Order", uploadDate: "2023-11-25", fileSize: "1.5 MB", status: "Completed" }
    ],
    notifications: [
      { notificationId: "NOT-4021", type: "Low generation alert", message: "Generation decreased by 10% due to dust layers. Recommend cleaning panels.", date: "2026-05-24", status: "Unread" }
    ],
    tickets: [
      {
        ticketId: "SKT-4091",
        customerId: "SK-87214",
        customerName: "Rajesh Kumar",
        title: "Inverter AC SPD protection blown flag",
        description: "Red light blinking on ACDB box surge protector module.",
        category: "Inverter issue",
        priority: "High",
        createdDate: "2026-05-24",
        preferredDate: "2026-05-26",
        preferredTimeSlot: "01:00 PM - 04:00 PM",
        customerRemark: "Request morning if possible.",
        status: "Open",
        assignedEngineer: "",
        engineerMobile: "",
        visits: [],
        logs: [
          { status: "Open", note: "Ticket created: AC Surge protection unit indicator shows red flag.", updatedBy: "Rajesh Kumar", dateTime: "2026-05-24 10:15 AM" }
        ]
      }
    ],
    historyTickets: [],
    savings: {
      systemCost: "₹7,20,000",
      subsidyReceived: "₹78,000",
      netInvestment: "₹6,42,000",
      monthlyBillBefore: "₹14,500",
      monthlyBillAfter: "₹1,800",
      monthlySavings: "₹12,700",
      totalMoneySaved: "₹3,81,000",
      roiPercentage: "59%",
      paybackPeriod: "4.2 Years",
      remainingRecoveryPeriod: "1.4 Years",
      recoveredAmount: 381000,
      investmentAmount: 642000,
      savingsLog: [
        { month: "Mar 2026", billBefore: "₹14,500", billAfter: "₹1,800", savings: "₹12,700", cumulativeSavings: "₹3,55,600", roiPercent: "55.3%" },
        { month: "Apr 2026", billBefore: "₹15,000", billAfter: "₹2,000", savings: "₹13,000", cumulativeSavings: "₹3,68,600", roiPercent: "57.4%" },
        { month: "May 2026", billBefore: "₹14,500", billAfter: "₹1,800", savings: "₹12,700", cumulativeSavings: "₹3,81,300", roiPercent: "59.3%" }
      ]
    },
    usage: {
      activeKW: 7.2,
      capacityKW: 10.0,
      batterySoC: 95,
      batteryWatts: 400,
      homeUsage: 4.5,
      gridExport: 2.3,
      appliances: [
        { name: "EV Charger Pro", consumption: 2200, status: "Active", icon: "Car" },
        { name: "Master Bed inverter AC", consumption: 1200, status: "Active", icon: "Wind" },
        { name: "Crompton Water Pump", consumption: 800, status: "Active", icon: "Droplets" },
        { name: "Double Door Refrigerator", consumption: 200, status: "Active", icon: "Tv" },
        { name: "Smart Lighting & Fans", consumption: 100, status: "Active", icon: "Lightbulb" }
      ]
    }
  },
  {
    customerId: "SK-61023",
    mobile: "9555123456",
    profile: {
      customerName: "Aditi Rao",
      mobileNumber: "9555123456",
      email: "aditi.rao@solarkart.com",
      address: "Block C-302, Palm Heights, Outer Ring Road, Bangalore",
      location: "Bangalore, Karnataka",
      alternateMobile: "9555123457",
      installationDate: "2025-05-10",
      plantCapacity: "3.2 kWp",
      plantType: "Hybrid Solar",
      installerDetails: "SolarKart Bangalore Center (Lead: M. A. Prasad, ID: SKT-114)",
      inverterBrand: "SolarKart Hybrid Lite 3kVA",
      panelBrand: "SolarKart Mono-Perc 320W (10 Panels)"
    },
    weather: {
      city: "Bangalore",
      temp: "28°C",
      humidity: "60%",
      condition: "Partly Cloudy",
      sunlightHours: "6.8",
      rainChance: "40%",
      expectedKWh: "14.5 kWh",
      forecast: [
        { date: "May 24", weather: "Cloudy", temp: "28°C", rainChance: "40%", sunlightHours: "6.8", expectedKWh: "14.5 kWh" },
        { date: "May 25", weather: "Thundershowers", temp: "26°C", rainChance: "70%", sunlightHours: "4.0", expectedKWh: "8.5 kWh" }
      ]
    },
    amc: {
      planName: "SolarKart Care Basic",
      status: "Expired",
      remainingDays: 0,
      servicesRemaining: 0,
      expiryDate: "2026-05-09",
      renewalAmount: "₹2,999",
      history: [
        {
          amcId: "AMC-8812",
          planName: "SolarKart Care Basic",
          startDate: "2025-05-10",
          endDate: "2026-05-09",
          amount: "₹2,999",
          servicesIncluded: 2,
          servicesUsed: 2,
          status: "Expired"
        }
      ]
    },
    plantHealth: {
      efficiencyScore: 89,
      components: [
        { component: "Solar Panels (10x Mono-Perc)", status: "Healthy", efficiency: "90.0%", lastChecked: "12 mins ago", alert: "None" },
        { component: "Smart Inverter (3kVA)", status: "Healthy", efficiency: "88.2%", lastChecked: "12 mins ago", alert: "None" },
        { component: "Battery Bank (Lithium 5kWh)", status: "Healthy", efficiency: "89.0%", lastChecked: "12 mins ago", alert: "None" }
      ],
      alerts: []
    },
    referrals: {
      referralCode: "SKART-ADITI12",
      totalReferrals: 0,
      pendingRewards: "₹0",
      earnedRewards: "₹0",
      leads: []
    },
    documents: [
      { documentId: "DOC-6101", documentName: "Tax Invoice - Solar Hybrid 3kW", documentType: "Invoice", uploadDate: "2025-05-10", fileSize: "1.6 MB", status: "Verified" }
    ],
    notifications: [
      { notificationId: "NOT-6120", type: "AMC expiry alert", message: "Your SolarKart Care Basic AMC has expired on May 09, 2026. Renew now to avoid service disruption.", date: "2026-05-10", status: "Unread" }
    ],
    tickets: [],
    historyTickets: [],
    savings: {
      systemCost: "₹2,80,000",
      subsidyReceived: "₹30,000",
      netInvestment: "₹2,50,000",
      monthlyBillBefore: "₹5,200",
      monthlyBillAfter: "₹800",
      monthlySavings: "₹4,400",
      totalMoneySaved: "₹52,800",
      roiPercentage: "21%",
      paybackPeriod: "4.7 Years",
      remainingRecoveryPeriod: "3.7 Years",
      recoveredAmount: 52800,
      investmentAmount: 250000,
      savingsLog: [
        { month: "Mar 2026", billBefore: "₹5,200", billAfter: "₹800", savings: "₹4,400", cumulativeSavings: "₹44,000", roiPercent: "17.6%" },
        { month: "Apr 2026", billBefore: "₹5,500", billAfter: "₹900", savings: "₹4,600", cumulativeSavings: "₹48,600", roiPercent: "19.4%" },
        { month: "May 2026", billBefore: "₹5,200", billAfter: "₹800", savings: "₹4,400", cumulativeSavings: "₹53,000", roiPercent: "21.2%" }
      ]
    },
    usage: {
      activeKW: 1.8,
      capacityKW: 3.2,
      batterySoC: 45,
      batteryWatts: -200,
      homeUsage: 2.0,
      gridExport: 0.0,
      appliances: [
        { name: "Bathroom Geyser", consumption: 1500, status: "Active", icon: "Flame" },
        { name: "Home Refrigerator", consumption: 300, status: "Active", icon: "Tv" },
        { name: "Living Room Lighting", consumption: 200, status: "Active", icon: "Lightbulb" }
      ]
    }
  }
];

