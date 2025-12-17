// Core types for the RFP Platform

export type RFPStatus = 
  | 'ingestion' 
  | 'agent_processing' 
  | 'validation' 
  | 'human_review' 
  | 'approved' 
  | 'submitted' 
  | 'rejected';

export type ValidationStatus = 'pending' | 'approved' | 'rejected';

export type AgentType = 'sales' | 'technical' | 'pricing' | 'orchestrator';

export type Urgency = 'low' | 'medium' | 'high' | 'critical';

export interface RFP {
  id: string;
  clientName: string;
  clientType: 'PSU' | 'LSTK' | 'Private' | 'Government';
  title: string;
  deadline: Date;
  currentStage: RFPStatus;
  assignedOwner: string;
  estimatedValue: number;
  marginRange: [number, number];
  boqLineCount: number;
  createdAt: Date;
  lastUpdated: Date;
  urgency: Urgency;
}

export interface AgentStatus {
  type: AgentType;
  name: string;
  currentTask: string;
  completionPercent: number;
  lastActionTime: Date;
  confidenceScore: number;
  warnings: string[];
  isActive: boolean;
}

export interface ValidationItem {
  id: string;
  rfpId: string;
  itemType: 'technical' | 'pricing' | 'compliance';
  description: string;
  reasonFlagged: string;
  agentConfidence: number;
  status: ValidationStatus;
  createdAt: Date;
}

export interface SKUMatch {
  rfpLineItem: string;
  proposedSKU: string;
  matchPercentage: number;
  assumptions: string;
}

export interface PricingBreakdown {
  lineItem: string;
  baseCost: number;
  rmSurcharge: number;
  margin: number;
  finalPrice: number;
}

export interface Document {
  id: string;
  rfpId: string;
  name: string;
  type: 'compliance' | 'boq' | 'deviation' | 'assumptions';
  status: 'draft' | 'approved' | 'final';
  version: number;
  createdAt: Date;
  format: 'excel' | 'pdf' | 'json';
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  rfpId?: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  rfpId: string;
  action: string;
  actor: string;
  timestamp: Date;
  details?: string;
}
