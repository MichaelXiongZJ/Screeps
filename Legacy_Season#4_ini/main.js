var roleHarvester = require('role.harvester');
var roleHarvesterHelper = require('role.harvesterHelper');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSimpAttacker = require('role.simpAttacker');
var roleGuard = require('role.guard');
var roleHauler = require('role.hauler');
var roleCrossCountry = require('role.crossCountry');
var roleClaimer = require('role.claimer');
var roleNewClaimer = require('role.newClaimer');

module.exports.loop = function () {
    console.log('\n\n');

    //Outposts
    const ClaimerPop = 1;
    
    //1A
    const HarvesterPop1 = 1;
    const CrossCountry1Pop = 3;
    
    //2B
    const HarvesterPop2 = 1;
    const CrossCountry2Pop = 5;
    
    //3C
    const HarvesterPop3 = 1;
    const CrossCountry3Pop = 5;
    
    //4D
    const HarvesterPop4 = 0;
    const CrossCountry4Pop = 0;
    

    //Clean up
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    const mainRoom = 'E31N34';
    const outpost1 = 'E32N34';
    const outpost2 = 'E32N35';
    const outpost3 = 'E33N35';
    var storage = Game.getObjectById('62bcea4bd78d6e4253d866c2');
    var container1 = Game.getObjectById('62c14593a818bcd08f71f11c');
    var container2 = Game.getObjectById('62c14a773b7b109caf46a236');
    var container3 = Game.getObjectById('62c3370c6aa3db998daa21e1');
    var linkIn = Game.getObjectById('62c0cbe56bfd3585cf80005a');
    var linkOut = Game.getObjectById('62c0d9bb27a7f0dfd7e18be3');
    //for fixing walls
    var manualFix = '62bd500955ae8936468fb230';
    
    var storageRatio = 0;
    var container1Ratio = 0;
    var container2Ratio = 0;
    var container3Ratio = 0;
    
    storageRatio = storage.store.getUsedCapacity()/storage.store.getCapacity();
    if(container1){
        container1Ratio = container1.store.getUsedCapacity()/container1.store.getCapacity();
    }else{
        console.log('Container 1 OFFLINE');
    }
    if(container2){
        container2Ratio = container2.store.getUsedCapacity()/container2.store.getCapacity();
    }else{
        console.log('Container 2 OFFLINE');
    }
    if(container3){
        container3Ratio = container3.store.getUsedCapacity()/container3.store.getCapacity();
    }else{
        console.log('Container 3 OFFLINE');
    }

    //loop through each room's spawners
    for(let spawnName in Game.spawns){
        let spawn = Game.spawns[spawnName];
        let creepsInRoom = spawn.room.find(FIND_CREEPS);

        //Claimed Room
        var harvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'builder');
        var simpAttacker = _.filter(creepsInRoom, (creep) => creep.memory.role == 'simpAttacker');
        var remoteHarvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'remoteHarvester');
        var haulers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'hauler');
        var harvesterHelpers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvesterHelper');
        
        var allCreeps = Game.creeps;
        //Outpost 1
        var harvester1s = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester1');
        var crossCountry1s = _.filter(allCreeps, (creep) => creep.memory.role == 'crossCountry1');
        var claimer1s = _.filter(allCreeps, (creep) => creep.memory.role == 'claimer1');
        var harvesterHelper1s = _.filter(allCreeps, (creep) => creep.memory.role == 'harvesterHelper1');
        
        //Outpost 2
        var harvester2s = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester2');
        var crossCountry2s = _.filter(allCreeps, (creep) => creep.memory.role == 'crossCountry2');
        var claimer2s = _.filter(allCreeps, (creep) => creep.memory.role == 'claimer2');
        var harvesterHelper2s = _.filter(allCreeps, (creep) => creep.memory.role == 'harvesterHelper2');
        
        //Outpost3
        var harvester3s = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester3');
        var crossCountry3s = _.filter(allCreeps, (creep) => creep.memory.role == 'crossCountry3');
        var claimer3s = _.filter(allCreeps, (creep) => creep.memory.role == 'claimer3');
        var harvesterHelper3s = _.filter(allCreeps, (creep) => creep.memory.role == 'harvesterHelper3');
        
        //Auto Spawn Control
        var newName = 'None';
        if(haulers.length < spawn.memory.minHaulers){
            newName = 'Hauler' + Game.time;
            spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'hauler'}});
        }
        
        else if(harvesterHelpers.length < spawn.memory.minHarvesterHelpers){
            newName = 'harvesterHelper' + Game.time;
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'harvesterHelper', workRoom: mainRoom, codeRed: false}});
        }
        
        else if(harvesters.length < spawn.memory.minHarvesters) {
            newName = 'Harvester' + Game.time;
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'harvester', workRoom: mainRoom}});
        }

        else if(builders.length < spawn.memory.minBuilders) {
            newName = 'Builder' + Game.time;
            spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'builder'}});
        }

        else if(upgraders.length < spawn.memory.minUpgraders) {
            newName = 'Upgrader' + Game.time;
            spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], Game.time, 
                {memory: {role: 'upgrader'}});
        }
        
        if(spawn.name == 'Spawn' && !spawn.spawning){
            // if(true){
            //     spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], Game.time, 
            //         {memory: {role: 'harvesterHelperS', workRoom: 'E32N36', codeRed: false}}); 
            // }

            //Outpost 1
            if(harvesterHelper1s.length < spawn.memory.minHarvesterHelpers){
                newName = 'harvesterHelperA' + Game.time;
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvesterHelper1', workRoom: outpost1, codeRed: false}});
            }
            else if(harvester1s.length < HarvesterPop1){
                newName = 'HarvesterA' + Game.time;
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvester1', workRoom: outpost1}});
            }
                    
            else if(crossCountry1s.length < CrossCountry1Pop){
                newName = 'CrossCountryA' + Game.time;
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'crossCountry1', homeRoom: mainRoom, workRoom: outpost1}});
            }
            
            //Outpost 2
            else if(harvesterHelper2s.length < spawn.memory.minHarvesterHelpers){
                newName = 'harvesterHelperB' + Game.time;
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvesterHelper2', workRoom: outpost2, codeRed: false}});
            }
            
            else if(harvester2s.length < HarvesterPop2){
                newName = 'HarvesterB' + Game.time;
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvester2', workRoom: outpost2}});
            }
            
            else if(crossCountry2s.length < CrossCountry2Pop){
                newName = 'CrossCountryB' + Game.time;
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'crossCountry2', homeRoom: mainRoom, workRoom: outpost2}});
            }
            
            
            //Outpost 3
            else if(harvesterHelper3s.length < spawn.memory.minHarvesterHelpers){
                newName = 'harvesterHelperC' + Game.time;
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvesterHelper3', workRoom: outpost3, codeRed: false}});
            }
            
            else if(harvester3s.length < HarvesterPop3){
                newName = 'HarvesterC' + Game.time;
                spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'harvester3', workRoom: outpost3}});
            }
            
            else if(crossCountry3s.length < CrossCountry3Pop){
                newName = 'CrossCountryC' + Game.time;
                spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                    {memory: {role: 'crossCountry3', homeRoom: mainRoom, workRoom: outpost3}});
            }
            
            //All claimers
            else if(claimer3s.length < ClaimerPop){
                newName = 'ClaimerC' + Game.time;
                spawn.spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName, 
                    {memory: {role: 'claimer3', workRoom: 'E33N35'}});
            }
            
            else if(claimer2s.length < ClaimerPop){
                newName = 'ClaimerB' + Game.time;
                spawn.spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName, 
                    {memory: {role: 'claimer2', workRoom: 'E32N35'}});
            }
            
            else if(claimer1s.length < ClaimerPop){
                newName = 'ClaimerA' + Game.time;
                spawn.spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName, 
                    {memory: {role: 'claimer1', workRoom: 'E32N34'}});
            }
        }
        
        var spawningName = 'None';
        var timeLeft = 0;
        if(spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawningName = spawningCreep.name;
            timeLeft = spawn.spawning.remainingTime;
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }

        if(spawn.hits < (spawn.hitsMax*3/4)){
            Game.rooms.controller.activateSafeMode();
        }
    
        
        if(manualFix){
            var specialWall = Game.getObjectById(manualFix)
        }
        
        var towers = spawn.room.find(FIND_MY_STRUCTURES,{
            filter: (structure) => (structure.structureType == STRUCTURE_TOWER)});
        
        for(var towerName in towers){
            var tower = towers[towerName];
            if(tower) {
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }else{
                    var damagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter : (myCreep) => (myCreep.hits < myCreep.hitsMax)});
                    if(damagedCreep){
                        tower.heal(damagedCreep);
                    }
                    else{
                        var damagedRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => (structure.hits < 10000 && (structure.structureType == STRUCTURE_RAMPART))});
                        if(damagedRampart) {
                            tower.repair(damagedRampart);
                        }else{
                            damagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: (structure) => (structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART))});
                            if(damagedStructure) {
                                tower.repair(damagedStructure);
                            }else if(specialWall.hits < 10000){
                                tower.repair(specialWall);
                            }
                        }
                    }
                }
            }
        }
        
        console.log('Harvesters:    Have: ' + harvesters.length +
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + harvester1s.length + 
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + harvester2s.length + 
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + harvester3s.length + 
                    '   Want: ' + 1
                    );
        console.log('HarvesterHs:   Have: ' + harvesterHelpers.length +
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + harvesterHelper1s.length + 
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + harvesterHelper2s.length + 
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + harvesterHelper3s.length + 
                    '   Want: ' + 1
                    );
        console.log('Haulers:       Have: ' + haulers.length +
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + crossCountry1s.length + 
                    '   Want: ' + CrossCountry1Pop + 
                    '         |     ' +
                    '   Have: ' + crossCountry2s.length + 
                    '   Want: ' + CrossCountry2Pop + 
                    '         |     ' +
                    '   Have: ' + crossCountry3s.length + 
                    '   Want: ' + CrossCountry3Pop
                    );
        console.log('Claimer:                                 |        Have: ' + claimer1s.length +
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + claimer2s.length + 
                    '   Want: ' + 1 + 
                    '         |     ' +
                    '   Have: ' + claimer3s.length + 
                    '   Want: ' + 1);
        console.log('Upgraders:     Have: ' + upgraders.length +
                    '   Want: ' + 2);
        console.log('Builders:      Have: ' + builders.length +
                    '   Want: ' + 0);
        
        
    }


    //run creep behaviours
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;
        if(role == 'harvesterHelper' || role == 'harvesterHelper1' || role == 'harvesterHelper2' || role == 'harvesterHelper3'|| role == 'harvesterHelperS') {
            roleHarvesterHelper.run(creep);
            // if(creep.memory.codeRed == true){
            //     var atkers = creep.room.find(FIND_MY_CREEPS, {filter: (atk) => (atk.memory.role == 'simpAttacker')});
            //     if(atkers.length < 3) {
            //         newName = 'SimpAttacker' + Game.time;
            //         spawn.spawnCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK], newName, 
            //             {memory: {role:'simpAttacker', workRoom:creep.room.name}});
            //         console.log('Spawning new SimpAttacker: ' + newName + 'for room: ' + creep.room.name);
            //     }
            // }
        }
        else if(role == 'harvester' || role == 'harvester1' || role == 'harvester2' || role == 'harvester3') {
            roleHarvester.run(creep);
        }else if(role == 'upgrader') {
            roleUpgrader.run(creep);
        }else if(role == 'builder') {
            roleBuilder.run(creep);
        }else if(role == 'crossCountry1' || role == 'crossCountry2' || role == 'crossCountry3' || role == 'crossCountry4'){
            roleCrossCountry.run(creep);
        }else if(role == 'claimer1' || role == 'claimer2' || role == 'claimer3' || role == 'claimer4'){
            roleClaimer.run(creep);
        }else if(role == 'hauler'){
            roleHauler.run(creep);
        }else if(role == 'transferer'){
            roleTransferer.run(creep);
        }else if(role == 'simpAttacker'){
            roleSimpAttacker.run(creep);
        }else if(role == 'newClaimer'){
            roleNewClaimer.run(creep);
        }
    }

    
    // if(linkOut.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
    //     linkOut.transferEnergy(linkIn);
    // }
    
    //groth calculation
    var room = Game.rooms['E31N34'];
    if(!room.memory.lastRatio){
        room.memory.lastRatio = 0;
    }
    if(!room.memory.growthRatioList){
        room.memory.growthRatioList = new Array();   
    }
    
    if(Game.time % 30 == 0){
        var growthRatio = (storageRatio - room.memory.lastRatio) / room.memory.lastRatio;
        room.memory.lastRatio = storageRatio;
        if(room.memory.growthRatioList.length > 10){
            room.memory.growthRatioList.shift();
        }
        room.memory.growthRatioList.push(growthRatio);
        console.log('Growth Ratio Updated!');
    }
    
    var list =  room.memory.growthRatioList;
    var str = 'Growth of past every 30 ticks: ';
    for(i in list){
        var ratio = (list[i]*100).toFixed(2);
        str = str.concat(ratio, '%,    ');
    }
    console.log(str);
    
    //CONSOLE DISPLAY
    console.log('Currently Spawning: ' + spawningName + ', ' + timeLeft + ' ticks left.');
    console.log('Next Spawn is: ' + newName);
    
    console.log('***************Main_Room_E31N34**********|**********Outpost_E32N34**********|**********Outpost_E32N35**********|**********Outpost_E33N35**********');
    console.log('StoredEnergy:  Storage at:   ' + (storageRatio*100).toFixed(3) + '%' +
                '     |        ' +
                'Container at:  ' + (container1Ratio*100).toFixed(0) + '%' +
                '        |        ' +
                'Container at:  ' + (container2Ratio*100).toFixed(0) + '%' + 
                '        |        ' +
                'Container at:  ' + (container3Ratio*100).toFixed(0) + '%'
                );
    
}