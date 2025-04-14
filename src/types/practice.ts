export type PracticeActions = {
  lastEditedBy?: string;
  lastEditedAt?: string;
  lastDeletedBy?: string;
  lastDeletedAt?: string;
};

export type Practice = {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: "Active" | "Disabled";
  actions: PracticeActions;
};
