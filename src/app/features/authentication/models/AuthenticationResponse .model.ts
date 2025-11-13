export interface AuthenticationResponse {
  httpStatusCode: number;
  timestamp: string; // DateTime
  message: string;
  errors?: string[];
  userId: number;
  username: string;
  email: string;
  token: string;
  refreshToken:string;
  refreshTokenExpiration: string; // DateTime
  expiration: string; // DateTime
}
