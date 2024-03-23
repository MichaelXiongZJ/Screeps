/*
RCL 1 = 300
RCL 2 = 550
RCL 3 = 800
RCL 4 = 1300
RCL 5 = 1800
RCL 6 = 2300
*/
const spawnOrder = ['jumpStarter','harvester','hauler','worker','upgrader'];

const creepConfigs = {
    harvester: {
        1: { body: [MOVE,WORK,WORK] },                              //250
        2: { body: [MOVE,WORK,WORK,WORK,WORK,WORK] },               //550
        3: { body: [MOVE,WORK,WORK,WORK,WORK,WORK] },               //550
        4: { body: [MOVE,WORK,WORK,WORK,WORK,WORK] },               //550
        5: { body: [MOVE,WORK,WORK,WORK,WORK,WORK] },
        6: { body: [MOVE,WORK,WORK,WORK,WORK,WORK] },
    },
    hauler: {
        1: { body: [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] },   //300
        2: { body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] },  //450
        3: { body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE] },    //750
        4: { body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] },    //1200
        5: { body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,    //24 carries
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,  //12 moves
                    MOVE,MOVE] },    //1800
        // 6: { body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
        //             CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
        //             CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,    //30 carries
        //             MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,  //15 moves
        //             MOVE,MOVE,MOVE,MOVE,MOVE] },    //2250
        6: { body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    CARRY,CARRY,CARRY,CARRY,    //24 carries
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,  //12 moves
                    MOVE,MOVE] },    //1800
    },
    worker: {
        1: { body: [WORK,CARRY,MOVE,MOVE] },    //300
        2: { body: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE] },   //550
        3: { body: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE] }, //800
        4: { body: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] }, //1200
        5: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] }, //1600
        6: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] }, //2000
    },
    upgrader: {
        1: { body: [WORK,WORK,MOVE,CARRY] },    //300
        2: { body: [WORK,WORK,WORK,WORK,CARRY,MOVE] },  //500
        3: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE] },   //800
        4: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE] },   //1200
        5: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,MOVE,MOVE] },   //1800
        // 6: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             CARRY,CARRY,MOVE,MOVE,MOVE,MOVE] },   //2300  
        6: { body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,MOVE,MOVE] },   //1800
    },
    jumpStarter: {
        1: { body: [WORK,CARRY,MOVE,MOVE] },    //250
        2: { body: [WORK,CARRY,MOVE,MOVE] },    //250
        3: { body: [WORK,CARRY,MOVE,MOVE] },    //250
        4: { body: [WORK,CARRY,MOVE,MOVE] },    //250
        5: { body: [WORK,CARRY,MOVE,MOVE] },    //250
        6: { body: [WORK,CARRY,MOVE,MOVE] },    //250
    },
};

module.exports = {
    spawnOrder,
    creepConfigs,
};
