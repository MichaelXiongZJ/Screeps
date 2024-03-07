var helperFunctions = require('util.helperFunctions');

var roleWorker = {
    run: function(creep) {

        this.updateStates(creep);

        if (creep.memory.recycle) { // time to be recycled
            helperFunctions.selfRecycle(creep);
            return;
        }
        
        if (creep.memory.working) {
            this.handleWork(creep);
        } else {
            this.handleCollection(creep);
        }
    },

    updateStates: function(creep) {
        if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() === 0) {
            creep.memory.recycle = true;
        } else if (!creep.memory.working && creep.store.getUsedCapacity() > creep.store.getCapacity()*0.9) {
            creep.memory.working = true;
            delete creep.memory.target;
            creep.say('🔄 working');
        } else if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
            creep.memory.working = false;
            delete creep.memory.target;
            creep.say('🔄 collecting');
        }
    },

    handleCollection: function(creep) {
        if (creep.memory.target){   // has target
            if (helperFunctions.collectSourceTarget(creep, creep.memory.target)) { 
                return;
            }else{// but target is unavaliable 
                delete creep.memory.target;
            }
        }
        // no target
        if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            creep.memory.target = creep.room.storage.id;
        } else {
            let target = helperFunctions.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
            } else {    // then MINE
                creep.say('harvest');
                var sourceSpot = creep.pos.findClosestByPath(FIND_SOURCES);
                helperFunctions.moveToPerform(creep, sourceSpot, () => creep.harvest(sourceSpot));
            }
        }
    },

    handleWork: function(creep) {
        if (creep.room.memory.build_list && creep.room.memory.build_list.length > 0) {
            let constructionSites = creep.room.memory.build_list.map(id => Game.getObjectById(id)).filter(site => site !== null);
            let target = creep.pos.findClosestByPath(constructionSites);
            if (target) {
                helperFunctions.moveToPerform(creep, target, () => creep.build(target));
            } else {
                creep.say('outdated target');
            }
        } else {
            helperFunctions.moveToPerform(creep, creep.room.controller, () => creep.upgradeController(creep.room.controller));
        }
    },
};

module.exports = roleWorker;
