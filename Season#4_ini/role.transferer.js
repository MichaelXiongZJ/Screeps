var roleTransferer = {

    run: function(creep) {
        const pos = '[room E31N34 pos 14,41]';
        if(creep.pos != pos){
            creep.moveTo(creep.pos);
        }else{
            var link = Game.getObjectById('62c0cbe56bfd3585cf80005a');
            var storage = Game.getObjectById('62bcea4bd78d6e4253d866c2');
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){ //if empty, draw from link
                creep.withdraw(link, RESOURCE_ENERGY);
            }else{
                creep.transfer(storage, RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleTransferer;