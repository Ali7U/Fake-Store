import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface FileUploadResponse {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file)
    return this.http.post<FileUploadResponse>(
      `${this.apiUrl}/files/upload`,
      formData
    );
  }
}
