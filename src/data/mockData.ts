import { 
  RFP, 
  AgentStatus, 
  ValidationItem, 
  SKUMatch, 
  PricingBreakdown, 
  Document, 
  Alert,
  ActivityLog 
} from '@/types/rfp';

// Helper to generate dates
const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const mockRFPs: RFP[] = [
  {
    id: 'RFP-2024-001',
    clientName: 'Power Grid Corporation',
    clientType: 'PSU',
    title: 'HVDC Transmission Cable Supply - Phase III',
    deadline: daysFromNow(5),
    currentStage: 'human_review',
    assignedOwner: 'Rajesh Kumar',
    estimatedValue: 45000000,
    marginRange: [12, 18],
    boqLineCount: 156,
    createdAt: daysAgo(10),
    lastUpdated: new Date(),
    urgency: 'critical',
  },
  {
    id: 'RFP-2024-002',
    clientName: 'L&T Infrastructure',
    clientType: 'LSTK',
    title: 'Industrial Wiring Systems - Mumbai Metro',
    deadline: daysFromNow(12),
    currentStage: 'agent_processing',
    assignedOwner: 'Priya Sharma',
    estimatedValue: 28000000,
    marginRange: [15, 22],
    boqLineCount: 89,
    createdAt: daysAgo(7),
    lastUpdated: daysAgo(1),
    urgency: 'high',
  },
  {
    id: 'RFP-2024-003',
    clientName: 'Reliance Projects',
    clientType: 'Private',
    title: 'Refinery Cable Supply Contract',
    deadline: daysFromNow(20),
    currentStage: 'validation',
    assignedOwner: 'Amit Patel',
    estimatedValue: 67000000,
    marginRange: [10, 15],
    boqLineCount: 234,
    createdAt: daysAgo(14),
    lastUpdated: daysAgo(2),
    urgency: 'medium',
  },
  {
    id: 'RFP-2024-004',
    clientName: 'NTPC Limited',
    clientType: 'PSU',
    title: 'Solar Park Cabling Infrastructure',
    deadline: daysFromNow(8),
    currentStage: 'approved',
    assignedOwner: 'Sneha Reddy',
    estimatedValue: 32000000,
    marginRange: [14, 19],
    boqLineCount: 112,
    createdAt: daysAgo(20),
    lastUpdated: daysAgo(1),
    urgency: 'high',
  },
  {
    id: 'RFP-2024-005',
    clientName: 'Defence Ministry',
    clientType: 'Government',
    title: 'Specialized Communication Cables',
    deadline: daysFromNow(30),
    currentStage: 'ingestion',
    assignedOwner: 'Vikram Singh',
    estimatedValue: 89000000,
    marginRange: [8, 12],
    boqLineCount: 78,
    createdAt: daysAgo(2),
    lastUpdated: daysAgo(1),
    urgency: 'low',
  },
  {
    id: 'RFP-2024-006',
    clientName: 'Tata Projects',
    clientType: 'Private',
    title: 'Data Center Infrastructure Cabling',
    deadline: daysFromNow(15),
    currentStage: 'agent_processing',
    assignedOwner: 'Neha Gupta',
    estimatedValue: 41000000,
    marginRange: [16, 21],
    boqLineCount: 167,
    createdAt: daysAgo(5),
    lastUpdated: new Date(),
    urgency: 'medium',
  },
  {
    id: 'RFP-2024-007',
    clientName: 'BHEL',
    clientType: 'PSU',
    title: 'Thermal Power Plant Cables',
    deadline: daysFromNow(3),
    currentStage: 'submitted',
    assignedOwner: 'Rakesh Verma',
    estimatedValue: 55000000,
    marginRange: [11, 16],
    boqLineCount: 198,
    createdAt: daysAgo(25),
    lastUpdated: daysAgo(3),
    urgency: 'critical',
  },
  {
    id: 'RFP-2024-008',
    clientName: 'Adani Green',
    clientType: 'Private',
    title: 'Wind Farm Electrical Systems',
    deadline: daysFromNow(18),
    currentStage: 'validation',
    assignedOwner: 'Kavita Menon',
    estimatedValue: 38000000,
    marginRange: [13, 18],
    boqLineCount: 145,
    createdAt: daysAgo(8),
    lastUpdated: daysAgo(1),
    urgency: 'medium',
  },
];

export const mockAgentStatuses: AgentStatus[] = [
  {
    type: 'orchestrator',
    name: 'Orchestrator Agent',
    currentTask: 'Coordinating RFP-2024-002 workflow',
    completionPercent: 65,
    lastActionTime: new Date(),
    confidenceScore: 94,
    warnings: [],
    isActive: true,
  },
  {
    type: 'sales',
    name: 'Sales Agent',
    currentTask: 'Analyzing client history for RFP-2024-006',
    completionPercent: 82,
    lastActionTime: daysAgo(0.1),
    confidenceScore: 87,
    warnings: ['Low historical data for new client segment'],
    isActive: true,
  },
  {
    type: 'technical',
    name: 'Technical Agent',
    currentTask: 'SKU matching for RFP-2024-002',
    completionPercent: 45,
    lastActionTime: daysAgo(0.05),
    confidenceScore: 91,
    warnings: [],
    isActive: true,
  },
  {
    type: 'pricing',
    name: 'Pricing Agent',
    currentTask: 'Margin calculation for RFP-2024-003',
    completionPercent: 78,
    lastActionTime: daysAgo(0.2),
    confidenceScore: 89,
    warnings: ['RM prices updated - recalculation in progress'],
    isActive: true,
  },
];

export const mockValidationItems: ValidationItem[] = [
  {
    id: 'VAL-001',
    rfpId: 'RFP-2024-001',
    itemType: 'technical',
    description: 'XLPE Cable 33kV specification mismatch',
    reasonFlagged: 'Proposed SKU voltage rating differs from RFP requirement',
    agentConfidence: 72,
    status: 'pending',
    createdAt: daysAgo(1),
  },
  {
    id: 'VAL-002',
    rfpId: 'RFP-2024-003',
    itemType: 'pricing',
    description: 'Copper conductor pricing variance',
    reasonFlagged: 'Base price exceeds historical average by 15%',
    agentConfidence: 68,
    status: 'pending',
    createdAt: daysAgo(2),
  },
  {
    id: 'VAL-003',
    rfpId: 'RFP-2024-001',
    itemType: 'compliance',
    description: 'BIS certification requirement',
    reasonFlagged: 'Missing mandatory certification for proposed SKU',
    agentConfidence: 45,
    status: 'pending',
    createdAt: daysAgo(1),
  },
  {
    id: 'VAL-004',
    rfpId: 'RFP-2024-008',
    itemType: 'technical',
    description: 'Weather rating specification',
    reasonFlagged: 'Outdoor rating may not meet coastal environment needs',
    agentConfidence: 78,
    status: 'pending',
    createdAt: daysAgo(0.5),
  },
];

export const mockSKUMatches: SKUMatch[] = [
  {
    rfpLineItem: 'XLPE Cable 33kV 3C x 240 sqmm',
    proposedSKU: 'SKU-XLPE-33-3C240-CU',
    matchPercentage: 94,
    assumptions: 'Copper conductor assumed based on spec',
  },
  {
    rfpLineItem: 'Control Cable 1.5 sqmm 12C',
    proposedSKU: 'SKU-CTRL-1.5-12C-PVC',
    matchPercentage: 98,
    assumptions: 'PVC insulation per standard',
  },
  {
    rfpLineItem: 'Armoured Cable 11kV 3C x 95 sqmm',
    proposedSKU: 'SKU-ARM-11-3C95-XLPE',
    matchPercentage: 87,
    assumptions: 'Single wire armour type selected',
  },
  {
    rfpLineItem: 'Fire Resistant Cable 2.5 sqmm 4C',
    proposedSKU: 'SKU-FR-2.5-4C-LSZH',
    matchPercentage: 92,
    assumptions: 'LSZH sheath for FR requirement',
  },
];

export const mockPricingBreakdown: PricingBreakdown[] = [
  {
    lineItem: 'XLPE Cable 33kV 3C x 240 sqmm',
    baseCost: 4500000,
    rmSurcharge: 450000,
    margin: 742500,
    finalPrice: 5692500,
  },
  {
    lineItem: 'Control Cable 1.5 sqmm 12C',
    baseCost: 850000,
    rmSurcharge: 68000,
    margin: 137700,
    finalPrice: 1055700,
  },
  {
    lineItem: 'Armoured Cable 11kV 3C x 95 sqmm',
    baseCost: 2200000,
    rmSurcharge: 198000,
    margin: 359700,
    finalPrice: 2757700,
  },
];

export const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    rfpId: 'RFP-2024-001',
    name: 'Technical Compliance Sheet',
    type: 'compliance',
    status: 'approved',
    version: 3,
    createdAt: daysAgo(2),
    format: 'excel',
  },
  {
    id: 'DOC-002',
    rfpId: 'RFP-2024-001',
    name: 'Commercial BOQ',
    type: 'boq',
    status: 'draft',
    version: 2,
    createdAt: daysAgo(1),
    format: 'excel',
  },
  {
    id: 'DOC-003',
    rfpId: 'RFP-2024-003',
    name: 'Deviation Statement',
    type: 'deviation',
    status: 'final',
    version: 1,
    createdAt: daysAgo(3),
    format: 'pdf',
  },
  {
    id: 'DOC-004',
    rfpId: 'RFP-2024-004',
    name: 'Assumptions & Notes',
    type: 'assumptions',
    status: 'approved',
    version: 2,
    createdAt: daysAgo(4),
    format: 'pdf',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'error',
    title: 'Deadline Critical',
    description: 'RFP-2024-001 deadline in 5 days - human review pending',
    rfpId: 'RFP-2024-001',
    createdAt: new Date(),
  },
  {
    id: 'ALT-002',
    type: 'warning',
    title: 'Validation Required',
    description: '4 items awaiting validation approval',
    createdAt: daysAgo(0.5),
  },
  {
    id: 'ALT-003',
    type: 'warning',
    title: 'Price Update',
    description: 'Copper LME prices changed - 3 RFPs may need repricing',
    createdAt: daysAgo(1),
  },
  {
    id: 'ALT-004',
    type: 'error',
    title: 'SLA Breach Risk',
    description: 'RFP-2024-007 response time exceeding target',
    rfpId: 'RFP-2024-007',
    createdAt: daysAgo(0.2),
  },
];

export const mockActivityLog: ActivityLog[] = [
  {
    id: 'ACT-001',
    rfpId: 'RFP-2024-001',
    action: 'Technical validation completed',
    actor: 'Technical Agent',
    timestamp: daysAgo(0.1),
    details: 'All 156 line items processed',
  },
  {
    id: 'ACT-002',
    rfpId: 'RFP-2024-001',
    action: 'Moved to human review',
    actor: 'Orchestrator',
    timestamp: daysAgo(0.2),
    details: '3 items flagged for manual review',
  },
  {
    id: 'ACT-003',
    rfpId: 'RFP-2024-001',
    action: 'Pricing calculation completed',
    actor: 'Pricing Agent',
    timestamp: daysAgo(0.5),
    details: 'Total value: ₹45Cr, Margin: 15.2%',
  },
  {
    id: 'ACT-004',
    rfpId: 'RFP-2024-001',
    action: 'Document ingested',
    actor: 'System',
    timestamp: daysAgo(10),
    details: 'RFP document parsed successfully',
  },
];

// Dashboard KPIs
export const dashboardKPIs = {
  totalActiveRFPs: mockRFPs.length,
  rfpsNearDeadline: mockRFPs.filter(r => {
    const daysUntil = Math.ceil((r.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7;
  }).length,
  avgResponseTime: 8.5,
  approvalPendingCount: mockValidationItems.filter(v => v.status === 'pending').length,
  winRate: 67,
  totalPipelineValue: mockRFPs.reduce((sum, r) => sum + r.estimatedValue, 0),
};

// Status distribution for charts
export const statusDistribution = [
  { name: 'Ingestion', value: mockRFPs.filter(r => r.currentStage === 'ingestion').length, color: 'hsl(var(--status-draft))' },
  { name: 'Agent Processing', value: mockRFPs.filter(r => r.currentStage === 'agent_processing').length, color: 'hsl(var(--status-progress))' },
  { name: 'Validation', value: mockRFPs.filter(r => r.currentStage === 'validation').length, color: 'hsl(var(--status-pending))' },
  { name: 'Human Review', value: mockRFPs.filter(r => r.currentStage === 'human_review').length, color: 'hsl(var(--agent-sales))' },
  { name: 'Approved', value: mockRFPs.filter(r => r.currentStage === 'approved').length, color: 'hsl(var(--status-approved))' },
  { name: 'Submitted', value: mockRFPs.filter(r => r.currentStage === 'submitted').length, color: 'hsl(var(--primary))' },
];
