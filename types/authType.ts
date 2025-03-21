export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
      token?: string;
    } | null;
}