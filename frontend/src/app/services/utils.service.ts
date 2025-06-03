import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: InjectionToken<object>,
    private readonly sanitizer: DomSanitizer
  ) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getSanitizedMessage(message: string): string {
    const html = message.replace(/\n/g, '<br>');
    return html;
  }
}
