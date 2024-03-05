var helperFunctions = require('util.helperFunctions');

var roleHauler = {
    distributionPriorities: [
        {type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
        {type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
        {type: STRUCTURE_TOWER, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 200},
        {type: STRUCTURE_CONTAINER, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 100 && s.id === creep.room.memory.upgraderStructureID},
        {type: STRUCTURE_STORAGE, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0}
    ],

    run: function(creep) {
        this.updateStates(creep);
        
        if (creep.memory.recycle) {
            helperFunctions.selfRecycle(creep);
            return;
        }

        if (!creep.memory.hauling) {
            this.collect(creep);
        } else {
            this.distribute(creep);
        }
    },

    updateStates: function(creep) {
        if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() === 0) {
            creep.memory.recycle = true;
        } else if (!creep.memory.hauling && creep.store.getUsedCapacity() > creep.store.getCapacity() * 0.9) {
            creep.memory.hauling = true;
            this.assignNewTarget(creep, 'distribute');
            creep.say('🔄haul');
        } else if (creep.memory.hauling && creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = false;
            this.assignNewTarget(creep, 'collect');
            creep.say('🔄collect');
        }
    },
    
    collect: function(creep) {
        if (!creep.memory.target || !helperFunctions.collectSourceTarget(creep, Game.getObjectById(creep.memory.target))) {
            this.assignNewTarget(creep, 'collect');
        }
    },

    distribute: function(creep) {
        const target = Game.getObjectById(creep.memory.target);
        if (!target) {
            this.assignNewTarget(creep, 'distribute');
        } else {
            helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
        }
    },

    assignNewTarget: function(creep, action) {
        delete creep.memory.target;
        let target = null;

        if (action === 'collect') {
            target = helperFunctions.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
                helperFunctions.moveToPerform(creep, target, () => {});
            } else {
                creep.say('!collect');
            }
        } else if (action === 'distribute') {
            for (let priority of this.distributionPriorities) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType === priority.type && priority.filter(s)
                });
                if (target) break;
            }

            if (target) {
                creep.memory.target = target.id;
                helperFunctions.moveToPerform(creep, target, () => {});
            } else {
                creep.say('!haul');
            }
        }
    }
};

module.exports = roleHauler;
