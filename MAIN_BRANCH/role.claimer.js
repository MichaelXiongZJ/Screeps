var helperFunctions = require('util.helperFunctions');

var roleClaimer = {

    run: function(creep) {
        if(creep.room.name !== creep.memory.workRoom){
            creep.say("Exiting...");
            var exit = creep.room.findExitTo(creep.memory.workRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit),{visualizePathStyle: {stroke: 'COLOR_PURPLE'}});
        }else{
            var newController = creep.room.controller;
            if (newController){
                helperFunctions.moveToPerform(creep, newController, () => creep.claimController(newController));
            }else{  // room got no controller, move to center
                console.log("Claimer arrived, but room has no controller.")
            }  
        }
    }
};

module.exports = roleClaimer;
