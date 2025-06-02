export default function useNotification(): readonly [(msg: string, options?: NotificationOptions) => void, NotificationPermission | null];
