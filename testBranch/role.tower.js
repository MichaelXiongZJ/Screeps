var towerController = {
    run: function(tower) {
        // Attack foreign creeps first
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
            return; // Exit early if we found a hostile to attack
        }

        // Heal friendly creeps if no hostiles are present
        var closestDamagedFriendly = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => creep.hits < creep.hitsMax
        });
        if (closestDamagedFriendly) {
            tower.heal(closestDamagedFriendly);
            return; // Exit early if we found a friendly to heal
        }

        // Fix structures listed in room.memory.fix_list if no hostiles or damaged friendlies
        if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 200 && tower.room.memory.fix_list && tower.room.memory.fix_list.length > 0) {
            fixTarget = this.findClosestStructureByIds(tower, tower.room.memory.fix_list)
            if (fixTarget) {
                tower.repair(fixTarget);
            }
        }
    },
    
    findClosestStructureByIds: function(tower, ids) {
        const structures = ids.map(id => Game.getObjectById(id)).filter(s => s !== null);
        const closestStructure = tower.pos.findClosestByRange(structures);
        return closestStructure;
    }


};

module.exports = towerController;
