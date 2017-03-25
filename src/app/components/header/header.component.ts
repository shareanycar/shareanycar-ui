import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private ownerService: OwnerService, private router: Router) { }

  ngOnInit() {}
  
  logout(){
      this.ownerService.logout();
      this.router.navigate(['/']);
  }

}
