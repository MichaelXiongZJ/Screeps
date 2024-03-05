const helperFunctions = require('util.helperFunctions');

const roleHarvester = {
    run(creep) {
        if (!creep.memory.target || !Game.getObjectById(creep.memory.target)) {
            console.log(`${creep.name} born without a target source`);
            creep.memory.target = creep.pos.findClosestByPath(FIND_SOURCES).id;
        }

        const target = Game.getObjectById(creep.memory.target);

        if (!creep.memory.work_pos) {
            creep.memory.work_pos = this.findWorkPosition(creep, target);
        }

        if (!creep.memory.work_pos) {
            this.harvestResource(creep, target);
        } else {
            this.moveToWorkPosition(creep, target);
        }
    },

    findWorkPosition(creep, target) {
        const container = target.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        });

        if (container && target.pos.inRangeTo(container, 2)) {
            return container.pos;
        } else {
            const constructionSite = target.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (constructionSite && target.pos.inRangeTo(constructionSite, 2)) {
                return constructionSite.pos;
            }
        }
        return null;
    },

    harvestResource(creep, target) {
        const result = creep.harvest(target);
        if (result === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else if (result === OK) {
            creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
        } else {
            creep.say(`Err: ${result}`);
        }
    },

    moveToWorkPosition(creep, target) {
        const workPos = new RoomPosition(creep.memory.work_pos.x, creep.memory.work_pos.y, creep.memory.work_pos.roomName);
        if (!creep.pos.isEqualTo(workPos)) {
            creep.moveTo(workPos);
        } else {
            helperFunctions.moveToPerform(creep, target, () => creep.harvest(target));
        }
    }
};

module.exports = roleHarvester;
