var helperFunctions = require('util.helperFunctions');

var roleJumpStarter = {
    workPriorities: [
        {type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
        {type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
    ],

    run: function(creep) {
        if (creep.memory.workRoom && (creep.room.name !== creep.memory.workRoom)) {
            creep.say("Exiting...");
            const exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#800080'}});
            return;
        }

        if (!creep.room.controller) {
            console.log("JumpStarter arrived, but room has no controller.");
            return;
        }

        this.updateStates(creep);

        if (creep.memory.working) {
            this.handleWork(creep);
        } else {
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
                var sourceSpot = creep.pos.findClosestByPath(FIND_SOURCES,{
                    filter: source => source.energy > 0
                });
                helperFunctions.moveToPerform(creep, sourceSpot, () => creep.harvest(sourceSpot));
            }
        }
    },

    handleWork: function(creep) {
        let target = this.findWorkTarget(creep);
        if (target) {
            if (target instanceof ConstructionSite) {
                helperFunctions.moveToPerform(creep, target, () => creep.build(target));
            } else {
                helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
            }
        } else {
            helperFunctions.moveToPerform(creep, creep.room.controller, () => creep.upgradeController(creep.room.controller));
        }
    },

    findWorkTarget: function(creep) {
        let target = null;
        // Check for energy filling targets
        for (let priority of this.workPriorities) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType === priority.type && priority.filter(s)
            });
            if (target) return target;
        }

        // Check for construction sites if no filling targets are found
        if (creep.room.memory.build_list && creep.room.memory.build_list.length > 0) {
            let constructionSites = creep.room.memory.build_list.map(id => Game.getObjectById(id)).filter(site => site !== null);
            target = creep.pos.findClosestByPath(constructionSites);
            if (target) return target;
        }

        // Default to controller upgrade if no other work is found
        return null;
    }
};

module.exports = roleJumpStarter;
