export interface AdminLogin {
  status: Status
}

export interface Status {
  code: number
  message: string
  data: Data
  role: string
  token: any
}

export interface Data {
  id: number
  email: string
  created_at: string
  updated_at: string
  jti: string
}


export interface LoginResponse {
  data: {
    created_at: string;
    email: string;
    id: number;
    jti: string;
    updated_at: string;
    role: string;
  };
  message: string,
}

export interface loginResToSend {
  status: LoginResponse,
  token: string
}

export interface LoginRequest {
  email: string;
  password: string;
}
