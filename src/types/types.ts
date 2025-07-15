export interface summaryTypes {
    id:string;
    summary:string;
    flags:string[];
}

export interface NavTypes {
  logo: string;
  loginText?: string;
  signupText?: string;
  authText?: string;
}


export interface RiskInfo {
    type: string;
    severity: string;
    context: string;
    matched_text: string;
}

export interface RisksData {
    high: RiskInfo[];
    medium: RiskInfo[];
    low: RiskInfo[];
    total_count: number;
}

export interface RiskScore {
    score: number;
    percentage: number;
    level: string;
}
