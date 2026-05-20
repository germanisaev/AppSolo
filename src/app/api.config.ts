import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  baseUrlV0: string;
  baseUrlV1: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');