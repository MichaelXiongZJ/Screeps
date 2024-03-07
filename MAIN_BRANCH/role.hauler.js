var helperFunctions = require('util.helperFunctions');

var roleHauler = {
    run: function(creep) {

        this.updateStates(creep);
        
        if (creep.memory.recycle){
            helperFunctions.selfRecycle(creep);
            return;
        }


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
            
            // Distributing logic
            const priorities = [
                {type: STRUCTURE_SPAWN, filter: s => s.store.getFreeCapacity() > 0},
                {type: STRUCTURE_EXTENSION, filter: s => s.store.getFreeCapacity() > 0},
                {type: STRUCTURE_TOWER, filter: s => s.store.getFreeCapacity() > 200},
                {type: STRUCTURE_CONTAINER, 
                    filter: s => s.store.getFreeCapacity() > 100
                            && s.id === creep.room.memory.upgraderStructureID},
                {type: STRUCTURE_STORAGE, filter: s => s.store.getFreeCapacity() > 0}
            ];

            let target = null;
            for (let priority of priorities) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType === priority.type && priority.filter(s)
                });
                if (target) break;
            }
            if (target) {
                helperFunctions.moveToPerform(creep, target, () => creep.transfer(target, RESOURCE_ENERGY));
            }else{
                creep.say('!haul');
            }
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
        if (!target || !helperFunctions.collectSourceTarget(creep, target)) {
            delete creep.memory.target;
            target = helperFunctions.getSourceTarget(creep);
            if (target) {
                creep.memory.target = target.id;
            } else {
                creep.say('!collect');
            }
        }
    }
};

module.exports = roleHauler;
