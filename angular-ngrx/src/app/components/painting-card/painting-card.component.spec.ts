import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';

import { PaintingCardComponent } from './painting-card.component';

describe('PaintingCardComponent', () => {
  let component: PaintingCardComponent;
  let fixture: ComponentFixture<PaintingCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaintingCardComponent, SafeHtmlPipe],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingCardComponent);
    component = fixture.componentInstance;
    component.painting = {
      genres: [
        "Abstract",
        "Genre art"
      ],
      image: {
        data: "",
        name: "GvZ4rqsyNjI.jpg",
        contentType: "image/jpeg"
      },
      name: "Grey onyx",
      author: "Andrei Vachanka",
      userId: "5efbb163d46bb14bd8783504",
      height: 30,
      width: 30,
      price: 10,
      description: "Fluid art",
      id: "5eee7742031b912444850808"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
