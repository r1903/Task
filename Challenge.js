
// Robot start positions
const startPosition = {
    northWest: {
        northPoint: 4,
        southPoint: -4,
        westPoint: 4,
        eastPoint: -4
    },
    southWest: {
        northPoint: -4,
        southPoint: 4,
        westPoint: 4,
        eastPoint: -4
    },
    southEast: {
        northPoint: -4,
        southPoint: 4,
        westPoint: -4,
        eastPoint: 4
    },
    northEast: {
        northPoint: 4,
        southPoint: -4,
        westPoint: -4,
        eastPoint: 4
    }
};
//Crate position
let cratePosition = [
    {
        northPoint: 0,
        southPoint: 0,
        westPoint: 0,
        eastPoint: 0
    },
    {
        northPoint: 4,
        southPoint: -4,
        westPoint: -4,
        eastPoint: 4
    }
];

function moveRobot(commands, robotStartPosition = startPosition.northEast) {

    let { northPoint, southPoint, westPoint, eastPoint } = robotStartPosition;
    console.log(`Robot started from point 'N S W E': ${northPoint},${southPoint},${westPoint},${eastPoint}`);
    let liftCrate = false;
    let commandsArray = commands.split(' ');
    let length = commandsArray.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            switch (commandsArray[i]) {
                case "N":
                    if (northPoint === 4) {
                        throw `Robort cannot move further north after these commands '${commandsArray.slice(0, i).join(' ')}',as it has reached to end of the grid`;
                    } else {
                        northPoint++;
                        southPoint--;
                        break;
                    }
                case "S":
                    if (southPoint === 4) {
                        throw `Robort cannot move further south after these commands '${commandsArray.slice(0, i).join(' ')}',as it has moved to end of the grid`;
                    } else {
                        southPoint++;
                        northPoint--;
                        break;
                    }
                case "W":
                    if (westPoint === 4) {
                        throw `Robort cannot move further west after these commands '${commandsArray.slice(0, i).join(' ')}',as it has moved to end of the grid`;
                    } else {
                        westPoint++;
                        eastPoint--;
                        break;
                    }
                case "E":
                    if (eastPoint === 4) {
                        throw `Robort cannot move further east after these commands '${commandsArray.slice(0, i).join(' ')}',as it has moved to end of the grid`;
                    } else {
                        eastPoint++;
                        westPoint--;
                        break;
                    }
                case "G":
                    const robotPosition = { northPoint, southPoint, westPoint, eastPoint };
                    if (liftCrate) {
                        console.log('Robot did not lift a crate because it is already holding one crate');
                    } else if (cratePosition.filter(crate => JSON.stringify(crate) === JSON.stringify(robotPosition)).length == 0) {
                        console.log('Robot did not lift a crate because there is no crate to grab');
                    } else {
                        liftCrate = true;
                        cratePosition = cratePosition.filter(crate => JSON.stringify(crate) !== JSON.stringify(robotPosition));
                        console.log(`Robot lifted a crate from position 'N S W E': ${northPoint} ,${southPoint}, ${westPoint}, ${eastPoint}`);
                    }
                    break;
                case "D":
                    const robotLocation = { northPoint, southPoint, westPoint, eastPoint };
                    if (!liftCrate) {
                        console.log('Robot did not drop a crate because Robot has not grabed one');
                    } else if (cratePosition.filter(crate => JSON.stringify(crate) === JSON.stringify(robotLocation)).length > 0) {
                        console.log('Robot did not drop a crate because crate is already present in that point');
                    } else {
                        cratePosition.push(robotLocation);
                        liftCrate = false;
                        console.log(`Robot droped a crate at position: 'N S W E': ${northPoint} ,${southPoint}, ${westPoint}, ${eastPoint}`);
                    }
                    break;
                default:
                    throw `${commandsArray[i]} is Wrong command, Robot only accepts 'N,S,W,E,G,D' letters as command`;
            }
        }
        console.log(`Robot ended at the point 'N S W E': ${northPoint},${southPoint},${westPoint},${eastPoint}`);
    }
}


try {
    moveRobot('N E N E N E N E', startPosition.southWest);
    //moveRobot('N E S W', startPosition.southWest);
    //moveRobot('S N E S W');
    //moveRobot('S S S S E E E E', startPosition.northWest);
    //moveRobot('S S S S W W W W');
    //moveRobot('S S S S W W W W W W W W W W');
    //moveRobot('S S S S W W W W G');
    //moveRobot('S S S S W W W W G N N N N E E E E G');
    //moveRobot('S S S S W W W W G N N D');
    //moveRobot('S S S S W W W W G N N N N E E E E D');
    //moveRobot('S G');
    //moveRobot('S A');
} catch (e) {
    console.error(e);
}