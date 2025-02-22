export interface EmailData {
    to: string;
    subject: string;
    templateFile: string;
    templateData: Record<string, any>;
    attachments?: string[];
  }
  