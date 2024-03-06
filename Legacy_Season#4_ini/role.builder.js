var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {    //build new
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
                creep.suicide();
            }
	    }else {
            var storageMain = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}});
            if(creep.withdraw(storageMain, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(storageMain);
            }
	    }
        
	}
};

module.exports = roleBuilder;