var helperFunctions = require('util.helperFunctions');

var roleUpgrader = {
    run: function(creep) {

        if (!creep.memory.structID){
            if (creep.room.memory.upgraderStructureID){
                creep.memory.structID = creep.room.memory.upgraderStructureID;
            }
            else{
                creep.say('no struct')
                return;
            }
        }

        struct = Game.getObjectById(creep.memory.structID);

        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            helperFunctions.moveToPerform(creep, struct, () => creep.withdraw(struct, RESOURCE_ENERGY));
        }else{
            helperFunctions.moveToPerform(creep, creep.room.controller, () => creep.upgradeController(creep.room.controller));
        }
    },
    
};

module.exports = roleUpgrader;
