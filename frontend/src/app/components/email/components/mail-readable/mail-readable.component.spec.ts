import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailReadableComponent } from './mail-readable.component';

describe('MailReadableComponent', () => {
  let component: MailReadableComponent;
  let fixture: ComponentFixture<MailReadableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailReadableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailReadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
