import {Component} from '@angular/core';

import {navItems} from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['default-layout.component.scss']
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public brandFullJson = {
    src: 'assets/img/brand/dmss.png',
    width: 200,
    height: 82,
    alt: 'DMSS Logo'
  };

  public brandNarrowJson = {
    src: '',
    width: 46,
    height: 46,
    alt: 'DMSS Logo'
  };

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
  }
}
