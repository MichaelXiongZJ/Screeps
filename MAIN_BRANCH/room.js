var roleTower = require('role.tower');

var roomController = {
    run: function(room) {
        this.updateRoomMemory(room);
        this.controlTowers(room);
        this.managePopulation(room);
    },

    updateRoomMemory: function(room) {
        // Update fix_list with structures that need repair
        room.memory.fix_list = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < structure.hitsMax)
                    && !(structure.structureType === STRUCTURE_WALL && structure.hits > 3000) 
                    && !(structure.structureType === STRUCTURE_RAMPART && structure.hits > 3000)
            }
        }).map(structure => structure.id);

        // Update build_list with construction sites
        room.memory.build_list = room.find(FIND_CONSTRUCTION_SITES).map(site => site.id);

        if (room.memory.sources) {
            room.memory.sources.forEach(sourceAssignment => {
                if (sourceAssignment.harvester) {
                    const harvesterCreep = Game.creeps[sourceAssignment.harvester];
                    // Check if the harvester exists, has more than 50 ticks to live, and is in the same room as the source
                    if (!harvesterCreep || harvesterCreep.ticksToLive < 50 || harvesterCreep.room.name !== room.name) {
                        sourceAssignment.harvester = null;
                    }
                }
            });
        } else {
            this.initializeRoomSources(room);
        }
        if (room.controller){   // if this room has a controller
            if (!room.memory.upgraderStructureID || !Game.getObjectById(room.memory.upgraderStructureID)){
                room.memory.upgraderStructureID = this.getUpgraderStructure(room);
            }
        }
    },

    initializeRoomSources(room) {
        room.memory.sources = room.find(FIND_SOURCES).map(source => ({
            id: source.id, 
            harvester: null
        }));
    },

    controlTowers: function(room) {
        const towers = room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_TOWER}
        });
        towers.forEach(tower => {
            roleTower.run(tower);
        });
    },

    managePopulation: function(room) {  // prepare stats for spawn to read
        const numSources = room.memory.sources.length;
        const roomPowerLevel = this.calculateRoomLevel(room); 
        const targetPopulations = {
            harvester: numSources,
            hauler: this.calculateHaulersNeeded(room, numSources, roomPowerLevel),
            worker: this.calculateWorkersNeeded(room, numSources, roomPowerLevel),
            upgrader: this.calculatedUpgradersNeeded(room, numSources, roomPowerLevel),
            jumpStarter: this.calculateJumpStartersNeeded(room),
        };
        const currentPopulations = this.getCurrentPopulation(room);
        room.memory.targetPopulations = targetPopulations;
        room.memory.currentPopulations = currentPopulations;
    },
    
    
    getUpgraderStructure: function(room) {
        var struct = room.controller.pos.findInRange(FIND_STRUCTURES, 5, {
            filter: (structure) => structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK
        })[0];
        if (struct) {
            return struct.id;
        }
        return null;
    },

    calculateRoomLevel: function(room) {
        const avaliableEnergy = room.energyCapacityAvailable;
        if (avaliableEnergy < 550){    //  RCL 1
            room.memory.level = 1;
            return 1
        }else if (avaliableEnergy < 800) {  //  RCL 2
            room.memory.level = 2;
            return 2
        }else if (avaliableEnergy < 1300) {  //  RCL 3
            room.memory.level = 3;
            return 3
        }else if (avaliableEnergy < 1800) {  // RCL 4
            room.memory.level = 4;
            return 4
        }else if (avaliableEnergy < 2300) { // RCL 5
            room.memory.level = 5;
            return 5
        }else {     // RCL 6
            room.memory.level = 6;
            return 6
        }
    },

    getCurrentPopulation: function(room) {
        var totalPopulation = 0;
        const population = room.find(FIND_MY_CREEPS).reduce((pop, creep) => {
            if (creep.memory.role) {
                if (!pop[creep.memory.role]) {
                    pop[creep.memory.role] = 0;
                }
                if (creep.ticksToLive > 35){
                    pop[creep.memory.role]++;
                }
                totalPopulation++;
            }
            return pop;
        }, {});
        room.memory.totalPopulation = totalPopulation;
        return population
    }, 
    
    calculatedUpgradersNeeded: function(room, numSources, roomLevel) {
        var struct = Game.getObjectById(room.memory.upgraderStructureID);
        if(struct){
            // if (struct.store.getFreeCapacity() === 0){
            //     return 2;
            //     // return 1;
            // }else if (struct.store.getUsedCapacity() > 0){
            //     return 1;
            // }      
            // if (roomLevel > 4 && struct.store.getUsedCapacity() > 0) {
            //     return 1;
            // }else if (struct.store.getFreeCapacity() === 0) {
            //     return 2;
            // }else if (struct.store.getUsedCapacity() > 0){
            //     return 1;
            // }
            if (struct.store.getUsedCapacity() > 0){
                return 1;
            }
        }
        return 0;
    },

    calculateWorkersNeeded: function(room, numSources, roomLevel) {
        let effectiveLength = 0;
        let wallCounted = false;
        room.memory.build_list.forEach(s => {
            if (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) {
                if (!wallCounted) {
                    effectiveLength += 1;
                    wallCounted = true;
                }
            } else if (s.structureType === STRUCTURE_ROAD) {
                effectiveLength += 0.5;
            } else {
                effectiveLength += 1;
            }
        });
        var wanted = Math.ceil(effectiveLength / 2);
        
        if (roomLevel < 2){
            return 10
        }
        
        if (wanted === 0){    // tmp
            return 0;
        } else if (wanted < 3){
            return 1;
        }else {
            return 2;
        }
    },

    calculateJumpStartersNeeded: function(room) {
        if ((!room.memory.totalPopulation || room.memory.totalPopulation === 0) // no creep left
            || (room.memory.currentPopulations['harvester']) === room.memory.totalPopulation){  // if harvester is all we have
            return 1;
        }
        return 0;
    },
    
    calculateHaulersNeeded: function(room, numSources, roomLevel) {
        if (roomLevel < 2){
            return Math.max(numSources - 1, 1);
        }
        return numSources;
    },

};

module.exports = roomController;
