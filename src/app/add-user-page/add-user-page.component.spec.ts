import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPageComponent } from './add-user-page.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('AddUserPageComponent', () => {
  let component: AddUserPageComponent;
  let fixture: ComponentFixture<AddUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check that save method is called', () => {

    const httpTesting = TestBed.inject(HttpTestingController);

    spyOn(component, 'onSubmit').and.callThrough(); 
    
    const firstname = fixture.debugElement.query(By.css('input[name="firstname"]'));
    firstname.nativeElement.value = 'John';
    firstname.nativeElement.dispatchEvent(new Event('input'));

    const surname = fixture.debugElement.query(By.css('input[name="surname"]'));
    surname.nativeElement.value = 'Doe';
    surname.nativeElement.dispatchEvent(new Event('input'));

    const saveButton = fixture.nativeElement.querySelector('button');
    saveButton.click();

    const mock = httpTesting.expectOne({ url: 'http://localhost:8080/api/user', method: 'POST' });
    mock.flush({ id: 123, firstname: 'John', surname: 'Doe' });
    
    fixture.detectChanges();

    expect(component.firstname).toBe('John');
    expect(component.surname).toBe('Doe');

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.message).toBe('User added successfully with id :123'); 
  });
});
