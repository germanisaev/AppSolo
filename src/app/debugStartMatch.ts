import { CanMatchFn } from '@angular/router';

export const debugStartMatch: CanMatchFn = (route, segments) => {
  console.log('START ROUTE MATCHED:', segments.map(s => s.path).join('/'));
  return true;
};