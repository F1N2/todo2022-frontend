export interface Todo {
  id: string;
  user_id: string;
  content: string;
  description: string;
  complete: boolean;
  created: Date;
  updated: Date;
}
