import { RedditPost } from '../models/RedditPost';
import {
  AfterViewInit, Component, OnInit, Input, Output, EventEmitter, OnDestroy,
  ElementRef, QueryList, ViewChildren, OnChanges, AfterViewChecked, ChangeDetectionStrategy, AfterContentInit, DoCheck, AfterContentChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimationController, DomController, GestureController } from '@ionic/angular'

@Component({
  selector: 'app-reddit-posts-list',
  templateUrl: './reddit-posts-list.component.html',
  styleUrls: ['./reddit-posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedditPostsListComponent implements OnInit, OnDestroy, DoCheck {
  private _subscriptions: Subscription[] = [];
  @ViewChildren('container', { read: ElementRef }) itemContainer: QueryList<ElementRef>;

  constructor(private _gestureCtrl: GestureController, private _animationCtrl: AnimationController,
    private _domCtrl: DomController) { }

  ngOnInit() {
  }
  private _posts: RedditPost[];
  @Input()
  set posts(value: RedditPost[]) {
    this._posts = value;
    console.debug(this.itemContainer?.toArray());
  }

  get posts() {
    return this._posts;
  }

  @Output() rightSwingEvent = new EventEmitter<string>();

  @Output() leftSwingEvent = new EventEmitter<string>();
  ngDoCheck() {
    // console.debug('ngDoCHeck');
    this.setUpGesture();
  }

  setUpGesture() {
    if (!this.itemContainer) return;
    const windowWidth = window.innerWidth;
    const containerArray = this.itemContainer.toArray();

    for (let i = 0; i < containerArray.length; i++) {
      const containerElement = containerArray[i].nativeElement;

      // We know the ion-item is the first child of teachhe container element
      const itemElement = containerElement.childNodes[0];

      const deleteAnimation = this._animationCtrl.create()
        .addElement(containerElement)
        .duration(200)
        .easing('ease-out')
        .fromTo('height', '48px', '0');

      const swipeGesture = this._gestureCtrl.create({
        el: itemElement,
        threshold: 15,
        direction: 'x',
        gestureName: 'swipe-delete',
        onMove: ev => {
          const currentX = ev.deltaX;

          this._domCtrl.write(() => {
            // Make sure the item is above the other elements
            itemElement.style.zIndex = 2;
            // Reposition the item
            itemElement.style.transform = `translateX(${currentX}px)`;
          });
        },
        onEnd: ev => {
          console.debug('On End');
          itemElement.style.transition = '0.2s ease-out';

          // Fly out the element if we cross the threshold of 150px
          if (ev.deltaX > 150) {
            console.debug('RIGHT');
            // this._domCtrl.write(() => {
            //   itemElement.style.transform = `translate3d(${windowWidth}px, 0, 0)`;
            // });
            // deleteAnimation.play();

            // deleteAnimation.onFinish(async (event) => {
            //   console.debug('delete animation');
            // });

            this._domCtrl.write(() => {
              itemElement.style.transform = '';
            });

            this.rightSwingEvent.emit(itemElement.id)
          }
          else if (ev.deltaX < -150) {
            console.debug('LEFT');
            console.debug(itemElement.id);
            this._domCtrl.write(() => {
              itemElement.style.transform = '';
            });
            this.leftSwingEvent.emit(itemElement.id)
          }
          else {
            // Fly the item back into the original position
            this._domCtrl.write(() => {
              itemElement.style.transform = '';
            });
          }
        }
      }, true);

      // Don't forget to enable!
      swipeGesture.enable(true);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
