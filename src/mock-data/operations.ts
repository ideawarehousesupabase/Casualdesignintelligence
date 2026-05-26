// Mock operational dataset (simulates AI/IoT kitchen telemetry).

export const wasteTrend = [
  { day: "Mon", waste: 18, predicted: 20 },
  { day: "Tue", waste: 22, predicted: 19 },
  { day: "Wed", waste: 15, predicted: 17 },
  { day: "Thu", waste: 26, predicted: 24 },
  { day: "Fri", waste: 31, predicted: 28 },
  { day: "Sat", waste: 38, predicted: 35 },
  { day: "Sun", waste: 21, predicted: 23 },
];

export const tripleCost = [
  { week: "W1", food: 4200, labour: 3100, utilities: 980 },
  { week: "W2", food: 4500, labour: 3000, utilities: 1020 },
  { week: "W3", food: 4100, labour: 3300, utilities: 940 },
  { week: "W4", food: 4800, labour: 3200, utilities: 1100 },
];

export const efficiency = [
  { hour: "08", value: 62 },
  { hour: "10", value: 71 },
  { hour: "12", value: 88 },
  { hour: "14", value: 79 },
  { hour: "16", value: 73 },
  { hour: "18", value: 91 },
  { hour: "20", value: 84 },
];

export const ingredientUsage = [
  { name: "Chicken", value: 32 },
  { name: "Rice", value: 24 },
  { name: "Vegetables", value: 18 },
  { name: "Sauces", value: 14 },
  { name: "Dairy", value: 12 },
];

export const productionBatches = [
  { id: "B-1042", item: "Chicken Curry", qty: 40, status: "In progress", variance: -3 },
  { id: "B-1043", item: "Veg Stir Fry", qty: 25, status: "Holding", variance: 2 },
  { id: "B-1044", item: "Beef Lasagne", qty: 30, status: "Plated", variance: 0 },
  { id: "B-1045", item: "Tomato Soup", qty: 50, status: "Prep", variance: -5 },
  { id: "B-1046", item: "Fish Pie", qty: 20, status: "Cooking", variance: 1 },
];

export const alerts = [
  { id: 1, severity: "high", title: "Reduce batch size for Chicken Curry", detail: "Demand forecast down 18% vs prep plan. Cut next batch to 32 portions." },
  { id: 2, severity: "medium", title: "Delay next prep cycle (Rice)", detail: "Holding inventory at 92% capacity. Delay by 45 minutes." },
  { id: 3, severity: "high", title: "Overproduction warning — Soup station", detail: "Projected 22% waste based on current pace." },
  { id: 4, severity: "low", title: "Demand-shift detected — lunch service", detail: "Vegetarian options trending +12%. Adjust Veg Stir Fry +8 portions." },
  { id: 5, severity: "medium", title: "Adjust production timing — Lasagne", detail: "Service window starts 20 min late. Re-stage cooking." },
];

export const wasteDrivers = [
  { cause: "Over-ordering", impact: 34 },
  { cause: "Prep errors", impact: 22 },
  { cause: "Holding-time failures", impact: 18 },
  { cause: "Incorrect yields", impact: 14 },
  { cause: "Low demand", impact: 12 },
];

export const digitalTwinStages = [
  { stage: "Delivery", yield: 100, loss: 0 },
  { stage: "Preparation", yield: 94, loss: 6 },
  { stage: "Cooking", yield: 89, loss: 5 },
  { stage: "Holding", yield: 84, loss: 5 },
  { stage: "Service", yield: 78, loss: 6 },
  { stage: "Disposal", yield: 72, loss: 6 },
];

export const inventory = [
  { sku: "ING-001", name: "Chicken Breast", qty: "48 kg", expiresIn: "2d", risk: "high" },
  { sku: "ING-002", name: "Basmati Rice", qty: "120 kg", expiresIn: "21d", risk: "low" },
  { sku: "ING-003", name: "Tomatoes", qty: "32 kg", expiresIn: "3d", risk: "medium" },
  { sku: "ING-004", name: "Double Cream", qty: "18 L", expiresIn: "1d", risk: "high" },
  { sku: "ING-005", name: "Cheddar", qty: "26 kg", expiresIn: "9d", risk: "low" },
  { sku: "ING-006", name: "Spinach", qty: "14 kg", expiresIn: "2d", risk: "medium" },
];

export const compliance = [
  { name: "UK Waste Regulations", status: "Compliant", score: 96 },
  { name: "HACCP", status: "Compliant", score: 92 },
  { name: "NHS DTAC", status: "In review", score: 81 },
  { name: "GDPR", status: "Compliant", score: 98 },
  { name: "ESG Reporting", status: "Compliant", score: 88 },
];

export const integrations = [
  { name: "Toast POS", type: "POS", status: "Connected" },
  { name: "Lightspeed", type: "POS", status: "Available" },
  { name: "SAP ERP", type: "ERP", status: "Available" },
  { name: "Oracle NetSuite", type: "ERP", status: "Available" },
  { name: "Square", type: "POS", status: "Connected" },
  { name: "Custom API", type: "API", status: "Connected" },
];

export const edgeNodes = [
  { id: "EDGE-01", site: "Main Kitchen", status: "Online", latency: "12ms", mode: "Edge AI" },
  { id: "EDGE-02", site: "Prep Station", status: "Online", latency: "18ms", mode: "Edge AI" },
  { id: "EDGE-03", site: "Cold Storage", status: "Offline", latency: "—", mode: "Local cache" },
  { id: "EDGE-04", site: "Service Line", status: "Online", latency: "9ms", mode: "Edge AI" },
];

export const reports = [
  { name: "Weekly ESG Report", category: "ESG", size: "1.2 MB", date: "2026-05-20" },
  { name: "Waste Analytics Q2", category: "Waste", size: "2.8 MB", date: "2026-05-18" },
  { name: "GP Margin Snapshot", category: "Finance", size: "640 KB", date: "2026-05-22" },
  { name: "Operational Summary", category: "Operations", size: "1.6 MB", date: "2026-05-23" },
  { name: "HACCP Compliance Export", category: "Compliance", size: "920 KB", date: "2026-05-21" },
];