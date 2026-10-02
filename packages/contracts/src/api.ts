export interface ApiValidationIssue {
  path: string;
  code: string;
}

/** Shape of every error body returned by the API. */
export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  issues?: ApiValidationIssue[];
}

export interface HealthResponse {
  status: "ok";
  uptime: number;
  timestamp: string;
}
