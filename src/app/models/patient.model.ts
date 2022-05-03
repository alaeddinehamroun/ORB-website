import { Message } from "./message.model";

export interface Patient {
  // uid: string;
  // email: string;
  displayName: string;
  photoURL: string;
  // emailVerified: boolean;
  isOnline: boolean;
  messages: Message[];
  situation: string;
  description: string;
  supervisorEmail: string;
}
