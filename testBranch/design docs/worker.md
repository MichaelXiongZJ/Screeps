## Hauler

# Body parts
- [WORK],[WORK],[WORK],[WORK],[CARRY],[CARRY],[CARRY],[CARRY],[MOVE],[MOVE],[MOVE],[MOVE]
- Cost = 800
- If room has capacity < 400: 
    - [WORK],[CARRY],[MOVE] 
    - cost = 200

# Worker logics
- Worker has two modes: Constructing mode and Upgrading mode.
- Mode of the work is dependent on the build_list variable of the room.
    - If build_list is empty: Upgrade mode
    - If build_list has element: Constructing mode

# Population
- The population of workers is determined by the growth of resources in the storage unit of the room.
- If growth is high (>???%) -> the population will be higher (max: ???)
- If growth is low (<-???%) -> the population will be lower (min: 1)

# Constructing Mode 
- If the worker has empty storage, then it will collect resource ftom the storage unit of the room.
    - If a storage unit is DNE, the it will follow the hauler's collecting mode logic.
- If the worker has storage, then it will find work to do in the following order:
    - Building:
        - The worker will find the closest constructionSite in the room's build_list
    - Fixing: (removed cuz i forgo towers)

# Upgrading Mode
- If the worker has empty storage, it will follow the same behavior as the Constructing mode to collect resources
- If the worker has storage, then it will go upgrade the room controller. 
- Just run upgrader
