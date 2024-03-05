const helperFunctions = require('util.helperFunctions');

const roleHauler = {
    run(creep) {
        this.updateStates(creep);

        if (creep.memory.recycle) {
            helperFunctions.selfRecycle(creep);
            return;
        }

        if (!creep.memory.hauling) {
            this.collectResources(creep);
        } else {
            this.distributeResources(creep);
        }
    },

    updateStates(creep) {
        if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() === 0) {
            creep.memory.recycle = true;
        } else if (!creep.memory.hauling && creep.store.getUsedCapacity() > creep.store.getCapacity() * 0.9) {
            creep.memory.hauling = true;
            delete creep.memory.target;
            creep.say('🔄 haul');
        } else if (creep.memory.hauling && creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = false;
            delete creep.memory.target;
            creep.say('🔄 collect');
        }
    },

    collectResources(creep) {
        let target = Game.getObjectById(creep.memory.target);
        if (!target || !helperFunctions.collectSourceTarget(creep, target)) {
            delete creep.memory.target;
            target = helperFunctions.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
            } else {
                creep.say('!collect');
            }
        }
    },

    distributeResources(creep) {
        const priorities = [
            { type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 },
            { type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 },
            { type: STRUCTURE_TOWER, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 200 },
            { type: STRUCTURE_CONTAINER, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 100 && s.id === creep.room.memory.upgraderStructureID },
            { type: STRUCTURE_STORAGE, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 }
        ];

        let target = this.findDistributionTarget(creep, priorities);
        if (target) {
            helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
        } else {
            creep.say('!haul');
        }
    },

    findDistributionTarget(creep, priorities) {
        for (let priority of priorities) {
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType === priority.type && priority.filter(s)
            });
            if (target) return target;
        }
        return null;
    }
};

module.exports = roleHauler;
