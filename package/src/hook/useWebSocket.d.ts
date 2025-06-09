interface WebSocketState {
    [key: string]: any;
    type?: string;
    code?: number;
    eventPhase?: number;
    isTrusted?: boolean;
    readyState?: number;
    reason?: string;
    returnValue?: any;
    timeStamp?: number;
    wasClean?: boolean;
}
interface WebSocketResult {
    data: any;
    error: any;
    state: WebSocketState;
    transmit: (data: any) => void;
}
export default function useWebSocket(url: string, altUrl?: string): WebSocketResult;
export {};
