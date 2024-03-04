var roleHarvesterHelper = {

    run: function(creep) {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
	        creep.memory.working = true;
	    }
	    
	    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0){//enemy detcted
            console.log('!!!!ENEMY DETECTED IN ROOM: ' + creep.room.name + '!!!!');
            creep.memory.codeRed = true;
        }else{
            creep.memory.codeRed = false;
        }
        
        if(creep.room.name == creep.memory.workRoom){
            if(!creep.memory.working){ //harvest
                var tombs = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                    filter: (tomb) => {return (tomb.store.getUsedCapacity() > 0)}});
                var dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                    filter: (droppedEnergy) => {return (droppedEnergy.amount > 5)}});
                if(tombs){
                    if(creep.withdraw(tombs, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.say('clean tombs');
                        creep.moveTo(tombs);
                    }
                }else if(dropped){
                    if(creep.pickup(dropped) == ERR_NOT_IN_RANGE){
                        creep.say('clean drops');
                        creep.moveTo(dropped);
                    }
                }else{
                    var sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    if(creep.harvest(sources) == ERR_NOT_IN_RANGE){
                        creep.moveTo(sources);
                    }
                }

            }else{
                if(creep.room.name != 'E31N34'){
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {    //build new
                        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }else{
                        var brokens = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return ((structure.structureType == STRUCTURE_CONTAINER || (structure.structureType == STRUCTURE_ROAD))
                                        && (structure.hits<structure.hitsMax));
                            }
                        });
                        var clostest = creep.pos.findClosestByRange(brokens);
                        if(clostest) {
                            if(creep.repair(clostest) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(clostest);
                                creep.say(clostest.structureType);
                            }
                        }else{
                            var container = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return structure.structureType == STRUCTURE_CONTAINER;
                                }
                            });
                            if(creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(container[0]);
                            }
                        }
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
        }
        else{ //go to work room
            creep.say('ops');
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
	}
};

module.exports = roleHarvesterHelper;