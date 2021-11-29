import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ServiceWorkerModule} from '@angular/service-worker';

xdescribe('AppComponent', () => {
  let app: AppComponent;
  let foo: { a: number; b: number; bar: string; };
  let fixture: ComponentFixture<AppComponent>;
  const today = new Date();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false})
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    foo = {
      a: 1,
      b: 2,
      bar: 'bar'
    };
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('matches objects with the expect key/value pairs', () => {
    expect(foo).toEqual(jasmine.objectContaining({
      bar: 'bar'
    }));
    expect(foo).not.toEqual(jasmine.objectContaining({
      c: 37
    }));
  });

  it('should call testMethod', () => {
    const spy = spyOn(app, 'testMethod');
    app.testMethod();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('message should be "yay"', () => {
    expect(app.testMethod).toMatch(/yay/i);
  });

  it('should return result for testMethod2(parameter)', () => {
    const result = app.testMethod2(2, 4, true);
    expect(result).toEqual(jasmine.any(Object));
  });

  it('should return object as result for getLatestDate', () => {
    const result = app.getLatestDate(today, true);
    console.log(app.getLatestDate(today, true));
    expect(result).toEqual(jasmine.any(Object));
  });

});
