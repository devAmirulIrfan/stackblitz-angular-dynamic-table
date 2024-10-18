import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <!-- Table -->
    <table>
      <thead>
        <tr>
          <ng-container *ngFor="let item of keyMap | keyvalue">
            <th *ngIf="item.value.isKeySelected">
              <div>
                <div>{{ item.value.columnName }}</div>
              </div>
            </th>
          </ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let rowIndex of getRowIndexes()">
          <ng-container *ngFor="let item of keyMap | keyvalue">
            <td *ngIf="item.value.isKeySelected">
              {{ item.value.columnValue[rowIndex] }}
            </td>
          </ng-container>
        </tr>
      </tbody>
    </table>

    <!-- Checkboxes -->
    <div *ngFor="let item of keyMap | keyvalue">
      <input
        class="form-check-input me-2"
        type="checkbox"
        [(ngModel)]="item.value.isKeySelected"
        [id]="item.value.columnName"
        [name]="item.value.columnName"
      />
      <label [for]="item.value.columnName">
        {{ item.value.columnName }}
      </label>
    </div>
  `,
})
export class App {
  keyMap = new Map<number, TableModel>();

  constructor() {
    this.keyMap.set(1, {
      columnName: 'Name',
      columnValue: mockData.map((data) => data.name),
      isKeySelected: true,
    });

    this.keyMap.set(2, {
      columnName: 'Age',
      columnValue: mockData.map((data) => data.age),
      isKeySelected: true,
    });

    this.keyMap.set(3, {
      columnName: 'Designation',
      columnValue: mockData.map((data) => data.designation),
      isKeySelected: true,
    });

    this.keyMap.set(4, {
      columnName: 'Address',
      columnValue: mockData.map((data) => data.address),
      isKeySelected: true,
    });
  }

  getRowIndexes() {
    return Array.from(Array(mockData.length).keys());
  }
}

export interface TableModel {
  columnName: string;
  columnValue: (string | number)[];
  isKeySelected: boolean;
}

export interface ResponseAPIModel {
  name: string;
  age: number;
  designation: string;
  address: string;
}

export const mockData: ResponseAPIModel[] = [
  {
    name: 'John Doe',
    age: 30,
    designation: 'Software Engineer',
    address: '123 Main Street, Cityville',
  },
  {
    name: 'Jane Smith',
    age: 28,
    designation: 'Product Manager',
    address: '456 Oak Avenue, Townsville',
  },
  {
    name: 'Michael Johnson',
    age: 40,
    designation: 'Senior Developer',
    address: '789 Pine Road, Villagetown',
  },
  {
    name: 'Alice Brown',
    age: 35,
    designation: 'UX Designer',
    address: '1010 Birch Lane, Metropolis',
  },
];

bootstrapApplication(App);
