import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../types/api.types';
import { InboxMailType, InboxSidebarType } from '../types/inbox';
import { Label } from '../types/labels.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  sendContactForm(data: {
    name: string;
    email: string;
    message: string;
  }): Observable<ApiResponse<string, { data: { name: string; email: string; message: string } }>> {
    return this.http.post<
      ApiResponse<string, { data: { name: string; email: string; message: string } }>
    >('mail/saveEmail', data);
  }

  getMails(): Observable<ApiResponse<string, { count: number; emails: InboxMailType[] }>> {
    return this.http.get<ApiResponse<string, { count: number; emails: InboxMailType[] }>>(
      'mail/getEmails'
    );
  }

  mailEdit(mail: InboxMailType): Observable<ApiResponse<string, InboxMailType>> {
    return this.http.patch<ApiResponse<string, InboxMailType>>('mail/editMail', mail);
  }

  getOneMail(id: string): Observable<ApiResponse<string, InboxMailType>> {
    return this.http.get<ApiResponse<string, InboxMailType>>(`mail/getOneMail/${id}`);
  }

  getActionData(): Observable<ApiResponse<string, InboxSidebarType[]>> {
    return this.http.get<ApiResponse<string, InboxSidebarType[]>>('mail/getActionData');
  }

  searchMails(
    searchTerm: string
  ): Observable<ApiResponse<string, { count: number; emails: InboxMailType[] }>> {
    return this.http.get<ApiResponse<string, { count: number; emails: InboxMailType[] }>>(
      `mail/searchEmails/${searchTerm}`
    );
  }

  deleteMail(id: string): Observable<ApiResponse<string, { id: string }>> {
    return this.http.delete<ApiResponse<string, { id: string }>>(`mail/deleteMail/${id}`);
  }

  createLabel(formGroup: {
    color: string;
    name: string;
  }): Observable<ApiResponse<string, { label: string }>> {
    return this.http.post<ApiResponse<string, { label: string }>>('label/createLabels', {
      color: formGroup.color,
      name: formGroup.name,
    });
  }

  getAllLabels(): Observable<ApiResponse<string, Label[]>> {
    return this.http.get<ApiResponse<string, Label[]>>('label/getLabels');
  }

  updateMailLabels(
    mailId: string,
    labels: Label[]
  ): Observable<ApiResponse<string, { id: string; labels: Label[] }>> {
    return this.http.patch<ApiResponse<string, { id: string; labels: Label[] }>>(
      `mail/updateMailLabels/${mailId}`,
      { labels }
    );
  }
}
