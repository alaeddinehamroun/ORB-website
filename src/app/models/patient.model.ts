import { Message } from "./message.model";

export interface Patient {
  // uid: string;
  // email: string;
  id: string;
  displayName: string;
  photoURL: string;
  // emailVerified: boolean;
  isOnline: boolean;
  messages: Message[];
  status: string;
  description: string;
  supervisorEmail: string;
  devices: {
    'ac'?: boolean,
    'tv'?: boolean,
    'lights'?: boolean,
  }
}
