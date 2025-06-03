export type InboxType = {
    title: string;
    active: boolean;
    count: number;
};
export type InboxSidebarType = {
    title: string;
    content: InboxType[] | undefined;
};
