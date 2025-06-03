import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
    });
  });

  it('create an instance', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
  it('should get an unsafe html data', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    const data = `<div>test</div>`;
    expect(pipe.transform(data, 'html')).toBeTruthy();
  });

  it('should get a unsafe style data', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    const data = `<div style="display: none;">test</div>`;
    expect(pipe.transform(data, 'style')).toBeTruthy();
  });
  it('should get a unsafe script', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    const data = `<script>console.log('test')</script>`;
    expect(pipe.transform(data, 'script')).toBeTruthy();
  });
  it('should get a unsafe url', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    const data = 'http://my_url.com';
    expect(pipe.transform(data, 'url')).toBeTruthy();
  });
  it('should get a unsafe resource url', () => {
    const domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    const data = `https://picsum.photos/200/300`;
    expect(pipe.transform(data, 'resourceUrl')).toBeTruthy();
  });
});
