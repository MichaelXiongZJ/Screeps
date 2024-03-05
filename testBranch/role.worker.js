var helperFunctions = require('util.helperFunctions');

var roleWorker = {
    run: function(creep) {
        this.updateStates(creep);

        if (creep.memory.recycle) {
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
        } else if (!creep.memory.working && creep.store.getUsedCapacity() > creep.store.getCapacity() * 0.9) {
            creep.memory.working = true;
            delete creep.memory.target;
            creep.say('🔄 working');
            this.assignWorkTarget(creep);
        } else if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
            creep.memory.working = false;
            delete creep.memory.target;
            creep.say('🔄 collecting');
            this.assignCollectionTarget(creep);
        }
    },

    handleCollection: function(creep) {
        if (!creep.memory.target || !helperFunctions.collectSourceTarget(creep, Game.getObjectById(creep.memory.target))) {
            this.assignCollectionTarget(creep);
        }
    },

    handleWork: function(creep) {
        const target = Game.getObjectById(creep.memory.target);
        if (!target) {
            this.assignWorkTarget(creep);
        } else {
            helperFunctions.moveToPerform(creep, target, () => {
                if (target instanceof ConstructionSite) {
                    return creep.build(target);
                } else {
                    return creep.upgradeController(target);
                }
            });
        }
    },

    assignCollectionTarget: function(creep) {
        delete creep.memory.target;
        if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            creep.memory.target = creep.room.storage.id;
        } else {
            const target = helperFunctions.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
            } else {
                const sourceSpot = creep.pos.findClosestByPath(FIND_SOURCES);
                helperFunctions.moveToPerform(creep, sourceSpot, () => creep.harvest(sourceSpot));
            }
        }
    },

    assignWorkTarget: function(creep) {
        delete creep.memory.target;
        if (creep.room.memory.build_list && creep.room.memory.build_list.length > 0) {
            const constructionSites = creep.room.memory.build_list.map(id => Game.getObjectById(id)).filter(site => site !== null);
            const target = creep.pos.findClosestByPath(constructionSites);
            if (target) {
                creep.memory.target = target.id;
            } else {
                creep.say('outdated target');
            }
        } else {
            creep.memory.target = creep.room.controller.id;
        }
    }
};

module.exports = roleWorker;
