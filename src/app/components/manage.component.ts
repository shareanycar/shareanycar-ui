import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import {Router} from '@angular/router';


@Component({
  selector: 'app-manage',
  templateUrl: './html/manage.component.html',
  styleUrls: ['./css/manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
      
  }

}
