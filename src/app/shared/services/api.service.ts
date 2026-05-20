import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_CONFIG } from '../../api.config';
import { Observable } from 'rxjs';

export interface LoanRequestDto {
  [key: string]: unknown;
}

export interface OtpVerifyRequest {
  loanRequestId?: string;
  otpCode: string;
}

export interface OtpResendRequest {
  loanRequestId?: string;
}

export interface LoanCalcRequest {
  [key: string]: unknown;
}

export interface LookupResponse {
  [key: string]: unknown;
}

export type CascadingType = 'STREET' | 'CITY' | 'BANK' | string;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  private readonly baseUrlV0 = this.config.baseUrlV0;
  private readonly baseUrlV1 = this.config.baseUrlV1;

  // -------------------------
  // Loan Requests
  // -------------------------

  createLoanRequest(payload: LoanRequestDto): Observable<unknown> {
    return this.http.post(`${this.baseUrlV0}/loan-requests/`, payload);
  }

  getLoanRequest(): Observable<LoanRequestDto> {
    return this.http.get<LoanRequestDto>(`${this.baseUrlV0}/loan-requests/`);
  }

  updateLoanRequest(payload: LoanRequestDto): Observable<unknown> {
    return this.http.put(`${this.baseUrlV0}/loan-requests/`, payload);
  }

  createAccountSetupConfirmationUrl(payload: LoanRequestDto): Observable<unknown> {
    return this.http.post(
      `${this.baseUrlV0}/loan-requests/account-setup-confirmation-url`,
      payload
    );
  }

  // -------------------------
  // OTP
  // -------------------------

  verifyOtp(payload: OtpVerifyRequest): Observable<unknown> {
    return this.http.post(
      `${this.baseUrlV0}/loan-requests/otp/verify`,
      payload
    );
  }

  resendOtp(payload: OtpResendRequest): Observable<unknown> {
    return this.http.post(
      `${this.baseUrlV0}/loan-requests/otp/resend`,
      payload
    );
  }

  // -------------------------
  // Loan Calculator
  // -------------------------

  calculateLoan(payload: LoanCalcRequest): Observable<unknown> {
    return this.http.post(`${this.baseUrlV0}/loan-calc/`, payload);
  }

  // -------------------------
  // V1 Data
  // -------------------------

  getLookups(): Observable<LookupResponse> {
    return this.http.get<LookupResponse>(`${this.baseUrlV1}/data/lookups`);
  }

  getCascading(
    type: CascadingType,
    parentType: CascadingType,
    parentCode: string | number
  ): Observable<unknown> {
    const params = new HttpParams()
      .set('type', type)
      .set('parentType', parentType)
      .set('parentCode', String(parentCode));

    return this.http.get(`${this.baseUrlV1}/data/cascading`, { params });
  }
}