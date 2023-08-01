import { TestBed } from '@angular/core/testing';

import { SecurityTokenInterceptor } from './security-token.interceptor';

describe('SecurityTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SecurityTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SecurityTokenInterceptor = TestBed.inject(SecurityTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
