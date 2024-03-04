var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');
var roomController = require('room');
var roleSpawn = require('role.spawn');
var roleJumpStarter = require('role.jumpStarter');
var roleClaimer = require('role.claimer');

module.exports.loop = function() {
    
    // Clean up room for new season
    // for (var myRoomName in Memory.rooms) {
    //     if (!Game.rooms[myRoomName]) {
    //         delete Memory.rooms[myRoomName];
    //         console.log('Clearing non-existing room memory:', myRoomName);
    //     }
    // }
    
    // Clean up
    for (var creepName in Memory.creeps) {
        if (!Game.creeps[creepName]) {
            delete Memory.creeps[creepName];
            console.log('Clearing non-existing creep memory:', creepName);
        }
    }

    // All the rooms I have access to
    for (let roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        roomController.run(room);
    }

    // All the Spawns I have access to
    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];
        roleSpawn.run(spawn);
    }

    // All the creeps I have access to
    for (let creepName in Game.creeps) {
        let creep = Game.creeps[creepName];
        var role = creep.memory.role;
        if (role === 'harvester') {
            roleHarvester.run(creep);
        } else if (role === 'hauler') {
            roleHauler.run(creep);
        } else if (role === 'worker') {
            roleWorker.run(creep);
        } else if (role === 'upgrader') {
            roleUpgrader.run(creep);
        } else if (role === 'jumpStarter'){
            roleJumpStarter.run(creep);
        } else if (role === 'claimer') {
            roleClaimer.run(creep);
        } else{
            console.log('Unknow creep role: ', creepName);
        }
    }
}
