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