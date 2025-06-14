import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type InboxType = {
  title: string;
  icon: IconDefinition;
  active: boolean;
  count: number;
};

export type InboxMailType = {
  labels: { id: string; name: string; color: string; selected: boolean }[];
  createdAt: Date;
  email: string;
  id: string;
  isRead: boolean;
  isStared: boolean;
  message: string;
  name: string;
  role: string | null;
  HTML?: string;
};

export type InboxSidebarType = {
  title: string;
  content: InboxType[] | undefined;
};
