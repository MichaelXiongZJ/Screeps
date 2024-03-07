var creepConfigurations = require('creepConfigurations');

var roleSpawn = {

    run: function(spawn){

        // Prepare info
        var room = spawn.room;
        var level = room.memory.level;
        var targetPopulations = room.memory.targetPopulations;
        var currentPopulations = room.memory.currentPopulations;
        var spawnOrder = creepConfigurations.spawnOrder;
        var creepConfigs =  creepConfigurations.creepConfigs;
        
        // Handle respawning creeps
        if (!spawn.spawning){
            this.spawnCreeps(spawn, room, level, targetPopulations, currentPopulations, spawnOrder, creepConfigs);
        }
    },


    spawnCreeps: function(spawn, room, level, targetPopulations, currentPopulations, spawnOrder, creepConfigs) {
        for (let i = 0; i < spawnOrder.length; i++) {
            let role = spawnOrder[i];
            if (targetPopulations[role] && (!currentPopulations[role] || currentPopulations[role] < targetPopulations[role])) {
                let config = creepConfigs[role] && creepConfigs[role][level];
                if (config) {
                    let body = config.body;
                    let name = `${role}_${Game.time}`;
                    let memory = Object.assign({}, config.memory, {role: role});
                    if (role === 'harvester') { // harvester needs special initial memory: target
                        let unassignedSource = room.memory.sources.find(s => !s.harvester);
                        if (unassignedSource) {
                            memory.target = unassignedSource.id;
                            unassignedSource.harvester = name; // Update room memory
                        }else{
                            break;  // if can't assign a source target, skip it
                        }
                    }
                    let result = spawn.spawnCreep(body, name, {memory: memory});
                    if (result === OK){
                        console.log(spawn.name + ' at ' + room.name + ' spawning: ' + name);
                        break;
                    }else if (result === ERR_NOT_ENOUGH_ENERGY){
                        console.log(spawn.name + ' at ' + room.name + ' waiting for energy to spawn: ' + name);
                        break;
                    }
                }
            }
        }
    },


};

module.exports = roleSpawn;