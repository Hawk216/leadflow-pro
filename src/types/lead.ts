export type LeadStatus = 'new' | 'delivered' | 'exchanged';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  industry: string;
  campaign: string;
  status: LeadStatus;
  createdAt: Date;
  deliveredAt?: Date;
  exchangedAt?: Date;
}

export interface MonthlyMetrics {
  default: number; // D - Monthly lead volume from contract
  missing: number; // M - Undelivered leads from previous month
  exchange: number; // E - Exchanged leads
  target: number; // Target = D + M + E
  delivered: number;
  remaining: number;
  exchangeLimit: number; // 20% of D
  exchangeUsed: number;
}

export interface Industry {
  id: string;
  name: string;
  fields: DynamicField[];
}

export interface DynamicField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  industry: string;
  contractVolume: number; // Monthly D value
  exchangeLimit: number; // Usually 20%
}
