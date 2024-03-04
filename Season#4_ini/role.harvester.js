var roleHarvester = {

    run: function(creep) {
      
        if(creep.room.name == creep.memory.workRoom){
            if(creep.store.getFreeCapacity() > 0){ //harvest
                var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources);
                }
            }else{
                if(creep.room.name != 'E31N34'){
                    var container = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_CONTAINER;
                        }
                    });
                    if(creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0]);
                    }
                }else{
                    var storage = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_STORAGE;
                        }
                    });
                    if(creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0]);
                    }
                }
            }
        }else{ //go to work room
            creep.say('ops');
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
	}
};

module.exports = roleHarvester;