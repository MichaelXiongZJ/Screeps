var roleGuard = {

    run: function(creep) {
        if(creep.room.name != creep.memory.workRoom){
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }else{
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            var hostileStructures = creep.room.find(FIND_HOSTILE_SPAWNS);

            if(hostileStructures.length > 0){
                var closest = creep.pos.findClosestByRange(hostileStructures);
                if(creep.attack(closest) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closest);
                }
            }else if(hostiles.length > 0){//enemy detcted
                console.log('!!!!ENEMY DETECTED IN ROOM: ' + creep.room.name + '!!!!');
                var closest = creep.pos.findClosestByRange(hostiles);
                if(creep.attack(closest) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closest);
                }
            }else{
                if(creep.memory.workRoom == 'E33N35'){
                    creep.moveTo(35,16);
                }else{
                    var newController = creep.room.controller;
                    creep.moveTo(newController);
                }
            }
        }
    }
};
module.exports = roleGuard;

