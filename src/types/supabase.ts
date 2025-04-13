export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      practices: {
        Row: {
          id: number;
          name: string;
          phone: string;
          email: string;
          date: string;
          status: "Active" | "Disabled";
          actions: Json | null;
        };
        Insert: {
          name: string;
          phone: string;
          email: string;
          date?: string;
          status?: "Active" | "Disabled";
          actions?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["practices"]["Insert"]>;
      };
      logs: {
        Row: {
          id: number;
          timestamp: string;
          user_email: string;
          action: string;
          target: string;
          status: "Success" | "Warning" | "Error";
        };
        Insert: Omit<Database["public"]["Tables"]["logs"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["logs"]["Row"]>;
      };
    };
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
}
