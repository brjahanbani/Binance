import { Component, Input, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label = '';
  @Input() control!: FormControl;
  @Input() type = 'text';
  @Input() placeholder = '';

  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    const { errors, dirty, touched } = this.control;
    return errors && dirty && touched;
  }
}
