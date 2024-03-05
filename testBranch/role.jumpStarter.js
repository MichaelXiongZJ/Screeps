const helperFunctions = require('util.helperFunctions');

const roleJumpStarter = {
    run(creep) {
        if (creep.memory.workRoom && creep.room.name !== creep.memory.workRoom) {
            this.exitRoom(creep);
            return;
        }

        this.updateStates(creep);

        if (creep.memory.working) {
            this.performWork(creep);
        } else {
            creep.memory.upgrading = false;
            this.collectResources(creep);
        }
    },

    exitRoom(creep) {
        creep.say("Exiting...");
        const exitDir = creep.room.findExitTo(creep.memory.workRoom);
        const exit = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exit, { visualizePathStyle: { stroke: '#ff69b4' } });
    },

    updateStates(creep) {
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

    collectResources(creep) {
        if (creep.memory.target) {
            if (!helperFunctions.collectSourceTarget(creep, creep.memory.target)) {
                delete creep.memory.target;
            }
        } else {
            const source = helperFunctions.getSourceTarget(creep);
            if (source) {
                creep.memory.target = source.id;
            } else {
                const closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
                helperFunctions.moveToPerform(creep, closestSource, () => creep.harvest(closestSource));
            }
        }
    },

    performWork(creep) {
        const target = this.findWorkTarget(creep);
        if (target) {
            helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
        } else if (creep.room.memory.build_list && creep.room.memory.build_list.length > 0) {
            this.handleConstruction(creep);
        } else {
            helperFunctions.moveToPerform(creep, creep.room.controller, () => creep.upgradeController(creep.room.controller));
        }
    },

    findWorkTarget(creep) {
        const priorities = [
            { type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 },
            { type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 },
        ];

        for (let priority of priorities) {
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType === priority.type && priority.filter(s)
            });
            if (target) return target;
        }
        return null;
    },

    handleConstruction(creep) {
        const constructionSites = creep.room.memory.build_list
            .map(id => Game.getObjectById(id))
            .filter(site => site !== null);
        const target = creep.pos.findClosestByPath(constructionSites);

        if (target) {
            helperFunctions.moveToPerform(creep, target, () => creep.build(target));
        }
    }
};

module.exports = roleJumpStarter;
