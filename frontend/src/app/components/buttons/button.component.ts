import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  host: {'class': 'btn'},
})
export class ButtonComponent {
  // only certain icon and text are allowed for the buttons in this app. It ensures that no mistakes are made and a uniformity of all buttons.
  @Input() icon?: 'logout' | 'visibility' | 'visibility_off' | 'settings' | 'send' | 'upload' | 'edit' | 'add' | 'task_alt' | 'delete' | 'keep' | 'calendar_month' | 'keyboard' | 'schedule' | 'filter_list' | 'swap_vert' | 'arrow_back' | 'arrow_forward' | 'arrow_downward' | 'arrow_upward' | 'keyboard_return' | 'chevron_left' | 'chevron_right' | 'close';
  @Input() text?: 'Sign in' | 'Sign up' | 'Log out' | 'Settings' | 'Contact us' | 'Send' | 'Upload' | 'Edit' | 'Add' | 'Save' | 'Ok' | 'Cancel' | 'Delete' | 'Pin' | 'View' | 'Filter' | 'Sort' | 'Go back' | 'Yes' | 'No' | 'Reset';
}
