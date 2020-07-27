import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Data} from '../models/Data';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = `http://localhost:3000/users/`;

  dataChange: BehaviorSubject<Data[]> = new BehaviorSubject<Data[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): Data[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Data[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addUser(kanbanItem: Data): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
      },
      (err: HttpErrorResponse) => {
        alert(`${err.statusText}:
         Пользователь не добавлен`)  });
  }

  updateUser(kanbanItem: Data): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
      },
      (err: HttpErrorResponse) => {
        alert(`${err.statusText}:
         Пользователь не изменён`)
      }
    );
  }

  deleteUser(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {}
      ,
      (err: HttpErrorResponse) => {
        alert(`${err.statusText}:
         Пользователь не удалён`)   }
    );
  }
}




