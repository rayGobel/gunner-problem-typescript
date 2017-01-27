import { Room } from './lib/Room';

class Coordinate {
  i: number;
  j: number;
}

export function construct2DRoom(): string {

  let arena = [
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()],
                [new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room(), new Room()]
  ];

  setArena(arena);
  let gunnerLocation = setGunner(arena);

  let result: string = '';
  let gunnerCount = 0;
  for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++) {
      let room = arena[i][j];
      result += room.print();
      if (room.hasGunner) {
        gunnerCount += 1;
      }
    }
    result += '\n';
  }

  result += '\n';
  result += 'Gunner count : ' + gunnerCount;
  return result;
}

function setArena(arena: Array<Array<Room>>) {
  arena[0][1].placeWall();
  arena[0][3].placeWall();
  arena[0][5].placeWall();
  arena[0][7].placeWall();
  arena[1][5].placeWall();
  arena[2][0].placeWall();
  arena[2][2].placeWall();
  arena[2][5].placeWall();
  arena[2][7].placeWall();
  arena[4][3].placeWall();
  arena[5][5].placeWall();
  arena[5][7].placeWall();
  arena[6][1].placeWall();
  arena[7][4].placeWall();
  arena[7][6].placeWall();
}

function setGunner(arena: Array<Array<Room>>): Array<Coordinate> {
  let gunnerLocation = [];
  let M = arena.length;
  let N = arena[0].length;
  // Fill gunner
  for (let i=0; i<M; i++) {
    for (let j=0; j<N; j++) {
      // Try to fill if empty
      let room = arena[i][j];
      if (room.isEmpty && !room.isWalled && !room.isGunnerLOS) {
        room.placeGunner();
        let loc = new Coordinate;
        loc.i = i;
        loc.j = j;
        gunnerLocation.push( loc );

        // Set Flags to right of arena until room meet wall
        for (let m=j; m<N; m++) {
          let next_room = arena[i][m];
          if (next_room.isWalled) {
            break;
          }
          // Set is gunner lineof sight
          next_room.isGunnerLOS = true;
        }

        // Set Flags to bottom of arena
        for (let n=i; n<M; n++) {
          let next_room = arena[n][j];
          if (next_room.isWalled) {
            break;
          }
          // Set is gunner lineof sight
          next_room.isGunnerLOS = true;
        }

      }
    }
  }

  return gunnerLocation;
}

function findEmptySpace(arena: Array<Array<Room>>): Array<Coordinate> {
  let M = arena.length;
  let N = arena[0].length;
  let result: Array<Coordinate> = [];
  for (let i=0; i<M; i++) {
    for (let j=0; j<N; j++) {
      let room = arena[i][j];
      if (room.isEmpty && !room.isWalled) {
        result.push( { 'i': i, 'j': j } );
      }
    }
  }
  return result;
}
