## Claimer

# Body parts
- [CLAIM,MOVE]

# Logics
- Spawn with a memory prepared: Target room
- If not in target room
    - Traverse to target room
- If in target room
    - Claim controller



Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE], 'claimer' + Game.time, {memory: {role: 'claimer',workRoom: 'E39S28',}});


Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'jumpStarter' + Game.time, {memory: {role: 'jumpStarter',workRoom: 'E39S28',}});

