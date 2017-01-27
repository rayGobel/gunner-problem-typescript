export class Room {

  isEmpty: boolean;
  isWalled: boolean;
  isGunnerLOS: boolean; // is gunner line of sight
  hasGunner: boolean;

  constructor() {
    this.clearRoom();
  }

  clearRoom() {
    this.isEmpty = true;
    this.isWalled = false;
    this.isGunnerLOS = false;
    this.hasGunner = false;
  }

  placeWall() {
    this.isEmpty = false;
    this.isWalled = true;
    this.isGunnerLOS = false;
    this.hasGunner = false;
  }

  placeGunner() {
    this.isEmpty = false;
    this.isWalled = false;
    this.isGunnerLOS = false;
    this.hasGunner = true;
  }

  print(): string {
    if (this.isWalled) {
      return '|X|';
    }
    if (this.isEmpty) {
      return '| |';
    }
    return '|o|';
  }
}
