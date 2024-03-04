var helperFunctions = require('util.helperFunctions');

var roleJumpStarter = {
    run: function(creep) {

        if(creep.memory.workRoom && (creep.room.name !== creep.memory.workRoom)){
            creep.say("Exiting...");
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit),{visualizePathStyle: {stroke: 'COLOR_PURPLE'}});
            return;
        }

        this.updateStates(creep);

        if (creep.memory.working) {
            this.handleWork(creep);
        } else {
            creep.memory.upgrading = false;
            this.handleCollection(creep);
        }
    },

    updateStates: function(creep) {
        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
            delete creep.memory.target;
            creep.say('🔄 working');
        } else if (creep.memory.working && creep.store.getUsedCapacity() === 0) {
            creep.memory.working = false;
            delete creep.memory.target;
            creep.say('🔄 collecting');
        }
    },

    handleCollection: function(creep) {
        if (creep.memory.target){   // has target
            if (!helperFunctions.collectSourceTarget(creep, creep.memory.target)) { // but target is unavaliable
                delete creep.memory.target;
            }
        }else{  // no target
            let target = helperFunctions.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
            } else {    // then MINE
                var sourceSpot = creep.pos.findClosestByPath(FIND_SOURCES);
                helperFunctions.moveToPerform(creep, sourceSpot, () => creep.harvest(sourceSpot));
            }
        }
    },

    handleWork: function(creep) {

        const priorities = [    // haul piority
            {type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
            {type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
        ];

        let target = null;  // find a haul target
        for (let priority of priorities) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType === priority.type && priority.filter(s)
            });
            if (target) break;
        }

        if (target) {   // if haul target exist
            helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
        } else if (creep.room.memory.build_list && creep.room.memory.build_list.length > 0) { // build
            let constructionSites = creep.room.memory.build_list.map(id => Game.getObjectById(id)).filter(site => site !== null);
            let target = creep.pos.findClosestByPath(constructionSites);
            if (target) {
                helperFunctions.moveToPerform(creep, target, () => creep.build(target));
            }
        } else {    // upgrade
            helperFunctions.moveToPerform(creep, creep.room.controller, () => creep.upgradeController(creep.room.controller));
        }
    },
};

module.exports = roleJumpStarter;
