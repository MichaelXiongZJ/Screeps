var roleHauler = {

    run: function(creep) {
        if(creep.store.getUsedCapacity() > 0){//has cargo, transfer
            var dst = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(!dst){
                dst = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
            }
            if(creep.transfer(dst, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(dst);
            }
        }
        
        else{//pick up cargo
            var src = Game.getObjectById('62c0cbe56bfd3585cf80005a'); 
            if(src.store.getUsedCapacity(RESOURCE_ENERGY) < creep.store.getFreeCapacity()){
                src = Game.getObjectById('62bcea4bd78d6e4253d866c2');                
            }
            if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(src);
            } 
        }
    }
};

module.exports = roleHauler;