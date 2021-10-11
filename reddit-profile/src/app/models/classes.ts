export class SwipeParams {
  swipeLeftIconName: string;
  swipeRigthIconName: string;
  swipeLeft: boolean;
  swipeRigth: boolean;

  constructor(
    swipeLeft: boolean,
    swipeRight: boolean,
    leftIcon: string,
    rightIcon: string
  ) {
    this.swipeLeft = swipeLeft;
    this.swipeRigth = swipeRight;
    this.swipeLeftIconName = leftIcon;
    this.swipeRigthIconName = rightIcon;
  }
}
