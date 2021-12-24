const assert = require("assert");
const isSpotEmpty = (v) => v === 0;

function getReachableSpotsInHallway(roomIndex, hallway) {
  const splitIndex = roomIndex + 1;

  return hallway.map((value, i) => {
    if (i < splitIndex) {
      // to the left of the room
      return hallway.slice(i, splitIndex).every(isSpotEmpty);
    } else {
      // to the right of the room
      return hallway.slice(splitIndex, i + 1).every(isSpotEmpty);
    }
  });
}

function getPodThatNeedsToMove(room, roomIndex) {
  return room.findIndex((value, index) => {
    if (value === 0) {
      return false;
    }
    // this is the target room
    // there is nothing below this that needs to move
    if (
      value === roomIndex &&
      room.slice(index + 1).findIndex((nextValue) => nextValue !== value) === -1
    ) {
      return false;
    }

    return true;
  });
}

function getMoveOrigins(state) {
  const origins = [];
  state.forEach((arr, index) => {
    if (index === 0) {
      // From hallway
      arr.forEach((value, index) => {
        if (value !== 0) {
          origins.push([0, index]);
        }
      });
    } else {
      // From rooms
      const podIndex = getPodThatNeedsToMove(arr, index);
      if (podIndex !== -1) {
        origins.push([index, podIndex]);
      }
    }
  });

  return origins;
}

function isHallwayPathClear(hallway, start, end) {
  const a = Math.min(start, end);
  const b = Math.max(start, end) + 1;

  return hallway.slice(a, b).every((v) => v === 0);
}

// either has empty spot or correct pod type
function isRoomReadyForEntry(room, roomIndex) {
  return room.every((v) => v === 0 || v === roomIndex);
}

function getValidMoves(state) {
  const origins = getMoveOrigins(state);
  const validMoves = [];

  origins.forEach(([listIndex, spotIndex]) => {
    const value = state[listIndex][spotIndex];
    if (listIndex === 0) {
      // pods in the hallway can only move to the target room
      // depends on direction to the target room
      const endIndex = value + (spotIndex > value ? 1 : 0);
      const startIndex =
        spotIndex > value
          ? Math.max(spotIndex - 1, endIndex)
          : Math.min(spotIndex + 1, endIndex);

      // if (spotIndex === 4) {
      //   console.info(startIndex, endIndex);
      // }

      if (
        (value === spotIndex ||
          value + 1 === spotIndex ||
          isHallwayPathClear(state[listIndex], startIndex, endIndex)) &&
        isRoomReadyForEntry(state[value], value)
      ) {
        validMoves.push([
          0,
          spotIndex,
          value,
          state[value].lastIndexOf(0),
          value,
        ]);
      }
    } else {
      // room

      // check if there is a path to the target room
      const startIndex = listIndex + (listIndex < value ? 1 : 0);
      const endIndex = value + (listIndex > value ? 1 : 0);

      if (
        isHallwayPathClear(state[0], startIndex, endIndex) &&
        isRoomReadyForEntry(state[value], value)
      ) {
        validMoves.push([
          listIndex,
          spotIndex,
          value,
          state[value].lastIndexOf(0),
          value,
        ]);
      }

      // travel to hallway
      const reachableHallwaySpots = getReachableSpotsInHallway(
        listIndex,
        state[0]
      );

      reachableHallwaySpots.forEach((isReachable, i) => {
        if (isReachable) {
          validMoves.push([listIndex, spotIndex, 0, i, value]);
        }
      });
    }
  });
  return validMoves;
}

module.exports = getValidMoves;
