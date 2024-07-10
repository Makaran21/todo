import { Timestamp } from "firebase/firestore";

interface ITodoItem {
  id?: string;
  todo: string;
  isCompleted: boolean;
  createdAt?: Timestamp;
}

export type { ITodoItem };
