// Get object to collect from, NOT for hauler
var getSourceTarget = function(creep) {
    // First, try to find the closest target among dropped resources, tombstones, and ruins
    let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                    filter: (r) => r.resourceType === RESOURCE_ENERGY && r.amount > 40
                }) ||
                creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                    filter: (t) => t.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                }) ||
                creep.pos.findClosestByRange(FIND_RUINS, {
                    filter: (r) => r.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });
    if (!target) {  // If no such target is found, look for containers
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER && 
                            s.store.getUsedCapacity() >= 50 &&
                            s.id != creep.room.memory.upgraderStructureID
        });
        if (containers.length > 0) { // If there are containers, find the one with the maximum stored capacity
            target = this.getMaxStore(containers, RESOURCE_ENERGY);
            creep.say('container');
        }
    }
    if (!target) {            // look for storage
        if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            target = creep.room.storage;
            creep.say('storage');
        }
    }
    return target;
};

// Move to and collect source from target, meant NO LONGER for Hauler
var collectSourceTarget = function(creep) {
    var target = Game.getObjectById(creep.memory.target);
    if (target) {
        if (target instanceof Resource/* && target.resourceType === RESOURCE_ENERGY*/) {
            this.moveToPerform(creep, target, () => creep.pickup(target));
        } else { // If the target is a container, storage, tombstone, or ruin with energy
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                this.moveToPerform(creep, target, () => creep.withdraw(target, RESOURCE_ENERGY));
            } else {
                return false; // No energy to collect
            }
        }
        return true
    } else { // Target no longer exists
        delete creep.memory.target;
        return false;
    }
};

var selfRecycle = function(creep){
    var container = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_CONTAINER
    });
    if (container) {
        creep.say("unalive me");
        this.moveToPerform(creep, container, () => creep.suicide());
    }else{
        var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        if (creep.pos.isNearTo(spawn)) {
            spawn.recycleCreep(creep);
        } else {
            creep.say("recycle me");
            creep.moveTo(spawn);
        } 
    }
};

var moveToPerform = function(creep, target, action) {
    let result = action();
    if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {
            visualizePathStyle: {stroke: '#ffffff'},
            // ignoreCreeps: true  // testing
        });
    }else if (result !== OK){
        let errMsg = this.errorConstants[result.toString()] || 'UNKNOWN_ERROR';
        creep.say(`${errMsg}`);
    }
};

function withdrawAllResource(creep, target) {
    let result = OK;
    for (var resource in target.store) {
        result = creep.withdraw(target, resource);
        if (result != OK && result !== ERR_NOT_IN_RANGE){
            creep.say('withdraw failed');
        }
    }
    return result;
}

function transferAllResource(creep, target) {
    let result = OK;
    for (var resource in target.store) {
        result = creep.transfer(target, resource);
        if (result != OK && result !== ERR_NOT_IN_RANGE){
            creep.say('transfer failed');
        }
    }
    return result;
}

function getMaxStore(targetList, resourceType) {
    let maxStoreAmount = 0;
    var maxStoreTarget = null;
    for (let target of targetList) {
        if (target.store.getUsedCapacity(resourceType) > maxStoreAmount) {
            maxStoreAmount = target.store.getUsedCapacity(resourceType);
            maxStoreTarget = target;
        }
    }
    return maxStoreTarget;
}

var errorConstants = {
    '0': 'OK',
    '-1': 'NOT_OWNER',
    '-2': 'NO_PATH',
    '-3': 'NAME_EXISTS',
    '-4': 'BUSY',
    '-5': 'NOT_FOUND',
    '-6': 'NOT_ENOUGH_RESOURCES',
    '-7': 'INVALID_TARGET',
    '-8': 'FULL',
    '-9': 'NOT_IN_RANGE',
    '-10': 'INVALID_ARGS',
    '-11': 'TIRED',
    '-12': 'NO_BODYPART',
    '-14': 'RCL_NOT_ENOUGH',
    '-15': 'GCL_NOT_ENOUGH',
};

module.exports = {
    getSourceTarget,
    collectSourceTarget,
    selfRecycle,
    withdrawAllResource,
    transferAllResource,
    moveToPerform,
    getMaxStore,
    errorConstants,
};
