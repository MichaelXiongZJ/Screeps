## Hauler

# Body parts
- [CARRY],[CARRY],[CARRY],[CARRY],[CARRY],[CARRY],[CARRY],[CARRY],[CARRY],[CARRY],[MOVE],[MOVE],[MOVE],[MOVE],[MOVE]
- If room has capacity < 750:
- [CARRY],[CARRY],[CARRY],[CARRY],[MOVE],[MOVE]
- Cost = 300

# Population
- The number of Haulers should be equal to the number of harvesters in the room.

# Hauling logics
- Hauler has two modes: Collecting mode and Distrubuting mode.
- When Hauler is in Collecting mode and has full cargo, it will changes to distrubuting mode.
- When Hauler is in Distrubuting mode and has no resource left, it will change to Collecting mode

# Collecting mode
- Hauler will follow the following order of piority to collect:
    - Dropped Resources
    - Tomb Resources
    - Ruin Resources
    - The largest capacity container

# Distrubuting mode
- Hauler will follow the following order of piority to distrubute:
    - Extensions
    - Towers
    - Spawn (only if spawn has <3/4 stored)
    - Storage

