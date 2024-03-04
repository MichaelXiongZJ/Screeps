var roleCrossCountry = {
    run: function(creep) {
        
        if(creep.store.getUsedCapacity() > 0){  //has cargo, go
        
            if(creep.room.name != creep.memory.homeRoom){
                var exit = creep.room.findExitTo(creep.memory.homeRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }else{  //dump energy at home
                var linkOut = Game.getObjectById('62bcea4bd78d6e4253d866c2');
                // if(linkOut.store.getFreeCapacity() < creep.store.getUsedCapacity){
                //     linkOut = Game.getObjectById('62bcea4bd78d6e4253d866c2');
                // }
                if(creep.transfer(linkOut, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkOut);
                }
            }
        }else{  //no cargo, back and get more
            if(creep.room.name != creep.memory.workRoom){   //not at work room, go to work
                var exit = creep.room.findExitTo(creep.memory.workRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }else{  //pick up cargo
                var src = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER;}
                });
                if(src.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                    if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(src);
                    } 
                }else{
                    var flag = creep.room.find(FIND_FLAGS);
                    if(flag[0]){
                        creep.say(':(');
                        creep.moveTo(flag[0]);
                    }
                }
            }
        }
        
    }
};
module.exports = roleCrossCountry;