var roleTower = require('role.tower');
var linkOperations = require('role.link');

var roomController = {
    run: function(room) {
        this.updateRoomMemory(room);
        this.controlTowers(room);
        this.managePopulation(room);
        // linkOperations.manageLinks(room);
    },

    updateRoomMemory: function(room) {
        this.updateRepairList(room);
        this.updateConstructionList(room);
        this.updateSourceAssignments(room);
        this.updateUpgraderStructure(room);
    },

    updateRepairList: function(room) {
        room.memory.fix_list = room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax &&
                                    structure.structureType !== STRUCTURE_WALL &&
                                    structure.structureType !== STRUCTURE_RAMPART
        }).map(structure => structure.id);
    },

    updateConstructionList: function(room) {
        room.memory.build_list = room.find(FIND_CONSTRUCTION_SITES).map(site => site.id);
    },

    updateSourceAssignments: function(room) {
        if (!room.memory.sources) {
            this.initializeRoomSources(room);
            return;
        }

        room.memory.sources.forEach(source => {
            const harvester = Game.creeps[source.harvester];
            if (!harvester || harvester.ticksToLive < 20 || harvester.room.name !== room.name) {
                source.harvester = null;  // Reset if harvester is invalid
            }
        });
    },

    initializeRoomSources: function(room) {
        room.memory.sources = room.find(FIND_SOURCES).map(source => ({
            id: source.id,
            harvester: null
        }));
    },

    updateUpgraderStructure: function(room) {
        if (!room.controller) return;

        const upgraderStructures = room.controller.pos.findInRange(FIND_STRUCTURES, 5, {
            filter: ({structureType}) => structureType === STRUCTURE_CONTAINER || structureType === STRUCTURE_LINK
        });

        room.memory.upgraderStructureID = upgraderStructures[0]?.id || null;
    },

    controlTowers: function(room) {
        const towers = room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_TOWER}
        });

        towers.forEach(tower => roleTower.run(tower));
    },

    managePopulation: function(room) {
        const numSources = room.memory.sources.length;
        const roomLevel = this.calculateRoomLevel(room);

        room.memory.targetPopulations = {
            harvester: numSources,
            hauler: this.calculateHaulersNeeded(roomLevel, numSources),
            worker: this.calculateWorkersNeeded(room),
            upgrader: this.calculateUpgradersNeeded(room),
            jumpStarter: this.calculateJumpStartersNeeded(room)
        };

        room.memory.currentPopulations = this.getCurrentPopulation(room);
    },

    calculateRoomLevel: function(room) {
        const energyLevels = [550, 800, 1300, 1800, 2300];
        const level = energyLevels.findIndex(level => room.energyCapacityAvailable < level) + 1;
        return room.memory.level = level || 6;
    },

    getCurrentPopulation: function(room) {
        const population = room.find(FIND_MY_CREEPS).reduce((acc, creep) => {
            if (creep.memory.role && creep.ticksToLive >= 20) {
                acc[creep.memory.role] = (acc[creep.memory.role] || 0) + 1;
            }
            return acc;
        }, {});

        room.memory.totalPopulation = Object.values(population).reduce((sum, count) => sum + count, 0);
        return population;
    },

    calculatedUpgradersNeeded: function(room) {
        var struct = Game.getObjectById(room.memory.upgraderStructureID);
        if(struct){
            if (struct.store.getFreeCapacity() === 0){
                return 2;
            }else if (struct.store.getUsedCapacity() > 0){
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
            return numSources*2;
        }else if (roomLevel < 5){
            return Math.min(wanted, 3);
        }
        return wanted;
    },

    calculateJumpStartersNeeded: function(room) {
        if (!room.memory.totalPopulation || room.memory.totalPopulation === 0){
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
