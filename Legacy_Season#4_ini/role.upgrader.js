var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.ticksToLive < 5){
            creep.say('💀');
        }


        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }   
        }else {
            var storageMain = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
            if(storageMain){
                if(creep.withdraw(storageMain, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storageMain);
                }
            }else{
                var sources = creep.pos.findClosestByRange(FIND_SOURCES, {
                    filter: (source) => {return source.energy > 0}
                });
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources);
                }
            }
        }
	}
};

module.exports = roleUpgrader;