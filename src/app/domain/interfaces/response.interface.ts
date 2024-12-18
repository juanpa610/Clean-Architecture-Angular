export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    error?: string;
    metadata?: {
        timestamp: Date;
        path: string;
    };
}