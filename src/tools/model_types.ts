export type Work = {
  id: number;
  title: string;
  description: string;
  status: string;
  projectId: number;
  assignedUserId: number;
};
export type Project = {
  id: number;
  name: string;
  description: string;
  members: User[];
  adminId: number;
  works: Work[];
};
export type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
};
