import { RedditProfileService } from './services/reddit-profile.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigate: any =
    [
      {
        title: "All",
        url: "/all",
        icon: "home"
      },
      {
        title: "Starred",
        url: "/starred",
        icon: "star-outline"
      },
      {
        title: "Deleted",
        url: "/deleted",
        icon: "trash-outline"
      },
    ];
}
