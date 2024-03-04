var helperFunctions = require('util.helperFunctions');

var roleHarvester = {
    run: function(creep) {

        if (!creep.memory.target || !Game.getObjectById(creep.memory.target)) {
            console.log(creep.name, "born without a target source");
            creep.memory.target = creep.pos.findClosestByPath(FIND_SOURCES).id;
        }
        var target = Game.getObjectById(creep.memory.target);

        if (!creep.memory.work_pos) {
            creep.memory.work_pos = this.getWorkPos(creep, target);
        }
        
        if (!creep.memory.work_pos){
            var result = creep.harvest(target);
            if (result === ERR_NOT_IN_RANGE){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }else if (result === OK){   // build a container here
                creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
            }else{
                creep.say(`Err: ${result}`);
            }
        }else{
            var work_pos = new RoomPosition(creep.memory.work_pos.x, creep.memory.work_pos.y, creep.memory.work_pos.roomName);
            if (!creep.pos.isEqualTo(work_pos)) { // Move to work_pos
                creep.moveTo(work_pos);
            } else{
                helperFunctions.moveToPerform(creep, target, () => creep.harvest(target));     
            }
        }
    },
    
    getWorkPos: function(creep, target) {
        var container = target.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
        });
        if (container && target.pos.inRangeTo(container, 2)) {
            return {x: container.pos.x, 
                    y: container.pos.y, 
                    roomName: container.pos.roomName };
        } else {
            var container_construction = target.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
            });
            if (container_construction && target.pos.inRangeTo(container_construction, 2)) {  
                return {x: container_construction.pos.x, 
                        y: container_construction.pos.y, 
                        roomName: container_construction.pos.roomName };
            }else {
                return null;
            }
        }
    }
};

module.exports = roleHarvester;
