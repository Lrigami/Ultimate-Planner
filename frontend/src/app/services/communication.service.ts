import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Communication service to communicate between menu and other components
@Injectable({
    providedIn: 'root',
})
export class CommunicationService {
    private communicationSubject = new BehaviorSubject<{isPinned: boolean, tdlid: number, title: string} | null>(null);
    communication$ = this.communicationSubject.asObservable();

    updatePinnedState(subject: {isPinned: boolean, tdlid: number, title: string}) {
        this.communicationSubject.next(subject);
    }
}