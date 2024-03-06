## Harvester

# Body parts
- [WORK], [WORK], [MOVE]
- Cost = 250

# Population
- The number of harversters should be equal to the number of resource spots in the room.

# Static mining logics
- Harvester will be assigned a memory.target at birth.
- Harvester will move on top of the container near the spot and mine
    - Harvester will first move to its spot.
    - Then the harvester will look for a container in the range of 3.
    - If container found, work_pos in memory will be updated accordingly, and harvester will move to it.
    - If container DNE, the harvester will mine at the place it pleases.
- Since harvester has no [CARRY] component, resource wil drop right into the container
- Pick a pot to leave a construction site for container

# todo
- give the harvester carry body part