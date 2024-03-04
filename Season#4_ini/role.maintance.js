var roleMaintance = {
    run: function(creep) {
        
        if(creep.ticksToLive < 5){
            creep.say('💀');
        }
        //switch to collecting mode
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.fixing = false;
        }
        //switch to fixing mode
        if((!creep.memory.fixing) && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
	        creep.memory.fixing = true;
	    }
	    
	    
	    
        if(creep.memory.fixing){//fix
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
        }else{
            //pickup stuff
            var tombs = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                filter: (tomb) => {return (tomb.store.getUsedCapacity() > 0)}});
            var dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: (droppedEnergy) => {return (droppedEnergy.amount > 5)}});
            if(tombs){
                if(creep.withdraw(tombs, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.say('clean tombs');
                    creep.moveTo(tombs, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else if(dropped){
                if(creep.pickup(dropped) == ERR_NOT_IN_RANGE){
                    creep.say('clean drops');
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        
    }
};



module.exports = roleMaintance;