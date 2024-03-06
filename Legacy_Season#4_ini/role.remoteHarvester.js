var roleRemoteHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }
        
        //harvest mode
        if(!creep.memory.upgrading){
            //if not in work room
            if(creep.room.name != creep.memory.workRoom){
                var exit = creep.room.findExitTo(creep.memory.workRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            //else fill self in work room
            else{
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
                }else{//harvest
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
        //upgrade mode, tower first, then controller
        else{
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {    //build new
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var exit = creep.room.findExitTo(creep.memory.homeRoom);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};
module.exports = roleRemoteHarvester;