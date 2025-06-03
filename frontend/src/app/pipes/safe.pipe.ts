import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  public constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: unknown, type: 'html'): SafeHtml;
  public transform(value: unknown, type: 'style'): SafeStyle;
  public transform(value: unknown, type: 'script'): SafeScript;
  public transform(value: unknown, type: 'url'): SafeUrl;
  public transform(value: unknown, type: 'resourceUrl'): SafeResourceUrl;

  public transform(value: unknown, type: string): unknown {
    const sanitizedItem: any = {
      html: (item: string) => this.sanitizer.bypassSecurityTrustHtml(item),
      style: (item: string) => this.sanitizer.bypassSecurityTrustStyle(item),
      script: (item: string) => this.sanitizer.bypassSecurityTrustScript(item),
      url: (item: string) => this.sanitizer.bypassSecurityTrustUrl(item),
      resourceUrl: (item: string) => this.sanitizer.bypassSecurityTrustResourceUrl(item),
    };

    return sanitizedItem[type](value);
  }
}
