
var roleRemoteBuilder = {

    run: function(creep) {
        
        if(creep.room.name == creep.memory.workRoom){

    	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
    	    }
    	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.building = true;
    	        creep.say('build');
    	    }
    
    	    if(creep.memory.building) {
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {    //build new
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{  //fix
                    var brokens = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE)
                                    && structure.hits<structure.hitsMax);
                        }
                    });
                    var clostest = creep.pos.findClosestByRange(brokens);
                    if(clostest) {
                        if(creep.repair(clostest) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(clostest, {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say(clostest.structureType);
                        }
                    }else{
                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_CONTAINER) && 
                                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                            }
                        });
                        var closest = creep.pos.findClosestByRange(targets);
                        if(closest) {
                            if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                    }
                }
    	    }else {
               var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
    	    }
        }else{
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit),{visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}
};

module.exports = roleRemoteBuilder;