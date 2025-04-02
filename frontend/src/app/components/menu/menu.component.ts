import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/communication.service';
import { ButtonComponent } from '../buttons/button.component';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, ButtonComponent, MatSlideToggleModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit, OnDestroy {
  listOfPinnedLists: {isPinned: boolean, tdlid: number, title: string}[] = [];
  subject: {isPinned: boolean; tdlid: number, title: string} | null = null;
  private subscription!: Subscription;

  constructor(private communicationService: CommunicationService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.communicationService.communication$.subscribe(subject => {
      if (subject) {
        this.subject = subject;
        this.updateListPin(this.subject);
      }
    });
  }

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

  navigateTo(path: string, id: number) {
    this.router.navigate([`${path}/${id}`]);
  }
}
