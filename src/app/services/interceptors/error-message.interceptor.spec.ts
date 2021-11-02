import { TestBed } from '@angular/core/testing';

import { ErrorMessageInterceptor } from './error-message.interceptor';

xdescribe('ErrorMessageInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorMessageInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorMessageInterceptor = TestBed.inject(ErrorMessageInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
