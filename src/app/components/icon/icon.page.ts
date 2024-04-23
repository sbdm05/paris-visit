import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.page.html',
  styleUrls: ['./icon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class IconPage implements OnInit {
  @Input() icon!: string;
  @Input() sizeIcon!: string;
  @Input() colorIcon!: string;

  constructor() {}

  ngOnInit() {}
}
