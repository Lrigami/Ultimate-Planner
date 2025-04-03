import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Router, RouterLink} from '@angular/router';
import { CommunicationService } from '../../services/communication.service';
import { TodolistService } from '../../services/to-do-list.service';
import { AuthService } from '../../services/sign-in-up-service';
import { ButtonComponent } from '../buttons/button.component';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, ButtonComponent, MatSlideToggleModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() foldValue = new EventEmitter<boolean>;
  private subscription!: Subscription;

  listOfPinnedLists: {isPinned: boolean, tdlid: number, title: string}[] = [];
  subject: {isPinned: boolean; tdlid: number, title: string} | null = null;
  isFolded: boolean = false;

  constructor(private communicationService: CommunicationService, private todolistService: TodolistService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.todolistService.getPinnedList({ isPinned: true }).subscribe(list => {
      list.forEach((todolist: { pinned: any; id: any; title: any; }) => {
        this.listOfPinnedLists.push({ isPinned: todolist.pinned, tdlid: todolist.id, title: todolist.title });
      });
    });
    this.subscription = this.communicationService.communication$.subscribe(subject => {
      if (subject) {
        this.subject = subject;
        this.updateListPin(this.subject);
      }
    });
  }

  // Update the pinned lists list when a user click on "pin" on the to-do list card
  updateListPin(subject: {isPinned: boolean, tdlid: number, title: string}) {
    const {isPinned, tdlid, title} = subject;
    const existingIndex = this.listOfPinnedLists.findIndex(list => list.tdlid === tdlid);

    if (existingIndex !== -1) {
      if (!isPinned) {
        this.listOfPinnedLists.splice(existingIndex, 1);
      }
    } else {
      if (isPinned) {
        this.listOfPinnedLists.push(subject);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Navigate to the right to-do list path
  navigateTo(path: string, id: number) {
    this.router.navigate([`${path}/${id}`]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  // Check if menu needs to be folded or not
  updateFoldingState() {
    this.isFolded = !this.isFolded;
    console.log(this.isFolded);
    this.foldValue.emit(this.isFolded);
  }

  openSettings() {
    // gérer la logique des paramètres dans la branche "settings"
  }
}
