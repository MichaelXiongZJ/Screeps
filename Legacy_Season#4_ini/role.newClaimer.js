var roleNewClaimer = {

    run: function(creep) {
        
        if(creep.room.name != creep.memory.workRoom){
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }else{
            var newController = creep.room.controller;
            if(creep.claimController(newController) == ERR_NOT_IN_RANGE){
                creep.moveTo(newController);
            }
        }
    }
};
module.exports = roleNewClaimer;