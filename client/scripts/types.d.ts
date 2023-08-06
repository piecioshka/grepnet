export interface Task {
  state: 'paused' | 'started' | 'grepping' | 'completed' | 'error' | 'new';
  id: number;
  title: string;
  url: string;
  phrase: string;
  delay: number;
  unit: string;
}
