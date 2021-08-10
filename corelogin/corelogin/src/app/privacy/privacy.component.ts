import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  public claims: [] = [];
  constructor(private _repository: ServiceService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  getClaims() {
    this._repository.getData().subscribe((result) => {
     

      console.log(result);
    });
  }


}
