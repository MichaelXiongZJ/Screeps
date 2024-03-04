var roleSimpAttacker = {
    run: function(creep) {
        
        if(creep.room.name != creep.memory.workRoom){
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit), {ignoreCreeps: true});
        }else{
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            var hostileStructures = creep.room.find(FIND_HOSTILE_SPAWNS);
            var closest;
            if(hostiles.length > 0){//enemy detcted
                closest = creep.pos.findClosestByRange(hostiles);
            }else if(hostileStructures.length > 0){
                closest = creep.pos.findClosestByRange(hostileStructures);
            }
            if(creep.attack(closest) == ERR_NOT_IN_RANGE){
                creep.moveTo(closest, {ignoreCreeps: true});
            }
        }
        
    }
};
module.exports = roleSimpAttacker;