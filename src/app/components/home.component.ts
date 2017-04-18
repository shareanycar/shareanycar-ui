import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-home',
    templateUrl: './html/home.component.html',
    styleUrls: ['./css/home.component.css']
})
export class HomeComponent implements OnInit {

    showDatePicker: boolean;
    showDatePickerStart: boolean;
    showDatePickerEnd: boolean;

    constructor() { }

    ngOnInit() {
    }

    focus() {

    }
}
