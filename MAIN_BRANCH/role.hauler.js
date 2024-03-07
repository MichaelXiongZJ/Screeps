var helperFunctions = require('util.helperFunctions');

var roleHauler = {
    
    run: function(creep) {
        this.updateStates(creep);
        // if (creep.memory.recycle){
        //     helperFunctions.selfRecycle(creep);
        //     return;
        // }
        if (!creep.memory.hauling) {
            this.collect(creep);
        } else {
            // if hauler has special resource, transfer them to storage first
            if (creep.store.getUsedCapacity() > creep.store.getUsedCapacity(RESOURCE_ENERGY)){
                let target = creep.room.storage;
                if(!target) {
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType === STRUCTURE_CONTAINER
                    });
                }
                
                if(!target) {   // literally no where to store
                    console.log(creep.room.name, 'has hauler with Resources that has no where to store');
                }else{
                    helperFunctions.moveToPerform(creep, target, () => helperFunctions.transferAllResource(creep, storage));
                }
            }
            const priorities = [
                {type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
                {type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0},
                {type: STRUCTURE_TOWER, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 200},
                {type: STRUCTURE_CONTAINER, 
                    filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 100
                            && s.id === creep.room.memory.upgraderStructureID},
                {type: STRUCTURE_STORAGE, filter: s => s.store.getFreeCapacity(RESOURCE_ENERGY) > 0}
            ];
            this.distrubute(creep, priorities);
        }
    },

    updateStates: function(creep) {
        if (creep.ticksToLive < 50 && creep.store.getUsedCapacity() === 0) {
            creep.memory.recycle = true;
        } else if (!creep.memory.hauling && creep.store.getUsedCapacity() > creep.store.getCapacity()*0.9) {
            creep.memory.hauling = true;
            delete creep.memory.target;
            creep.say('🔄haul');
        } else if (creep.memory.hauling && creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = false;
            delete creep.memory.target;
            creep.say('🔄collect');
        }
    },
    
    collect: function(creep) {
        let target = Game.getObjectById(creep.memory.target);
        if (!target || !this.collectSourceTarget(creep, target)) {
            delete creep.memory.target;
            target = this.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
            } else {
                creep.say('!collect');
            }
        }
    },
    
    // Get object to collect from, with Hauler's piority list
    getSourceTarget: function(creep) {
            // First, try to find the closest target among dropped resources, tombstones, and ruins
            let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                            filter: (r) => r.amount > 40
                        }) ||
                         creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                             filter: (t) => t.store.getUsedCapacity() > 0
                         }) ||
                         creep.pos.findClosestByRange(FIND_RUINS, {
                             filter: (r) => r.store.getUsedCapacity() > 0
                         });
            if (!target) { // If no such target is found, look for containers
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER && 
                                    s.store.getUsedCapacity() >= 100 &&
                                    s.id != creep.room.memory.upgraderStructureID
                });
                // If there are containers, find the one with the maximum stored capacity
                if (containers.length > 0) {
                    target = _.max(containers, (c) => _.sum(c.store));
                    creep.say('container');
                }
            }
            if (!target) {// look for storage
                creep.say('storage');
                target = creep.room.storage;
            }
            return target;
    },

    // Move to and collect source from target, meant for Hauler
    collectSourceTarget: function(creep) {
        var target = Game.getObjectById(creep.memory.target);
        if (target) {
            if (target instanceof Resource/* && target.resourceType === RESOURCE_ENERGY*/) {
                helperFunctions.moveToPerform(creep, target, () => creep.pickup(target));
            } else { // If the target is a container, storage, tombstone, or ruin with energy
                if (target.store.getUsedCapacity() > 0) {
                    helperFunctions.moveToPerform(creep, target, () => helperFunctions.withdrawAllResource(creep, target));
                } else {
                    return false; // No energy to collect
                }
            }
            return true
        } else { // Target no longer exists
            delete creep.memory.target;
            return false;
        }
    },

    distrubute: function(creep, priorities){
        let target = null;
        for (let priority of priorities) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType === priority.type && priority.filter(s)
            });
            if (target) {
                break;
            }
        }
        if (target) {
            helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
        }else{
            creep.say('!haul');
        }
    },
};

module.exports = roleHauler;
