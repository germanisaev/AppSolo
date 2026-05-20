import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CreateBankRequestResponse {
  applicationId: string;
  token: string;
  customerLink: string;
}

@Injectable({
  providedIn: 'root',
})
export class BankRequestService {
  createRequest(): Observable<CreateBankRequestResponse> {
    return of({
      applicationId: 'abc123',
      token: 'secure-token-xyz',
      customerLink:
        'http://localhost:61354/wizard/start?token=secure-token-xyz',
    });
  }
}
