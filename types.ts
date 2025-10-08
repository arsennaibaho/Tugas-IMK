export enum TaskPriority {
  IMPORTANT = 'important',
  URGENT = 'urgent',
}

export enum RepetitionType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
}

export interface Repetition {
  type: RepetitionType;
  days?: number[]; // 0 for Sunday, 1 for Monday, etc.
}

export interface Task {
  id: string;
  text: string;
  completions?: { [date: string]: boolean }; // key is YYYY-MM-DD
  deadline: string;
  priority?: TaskPriority[];
  repetition?: Repetition;
  notes?: { [date: string]: string }; // key is YYYY-MM-DD
}

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
