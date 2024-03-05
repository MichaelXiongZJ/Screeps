## Room 

- Each room is responsible for recording its own state of structures and resources in memory. (includig towers)
- Each room is responsible for the local population creeps

# Memory:s
- fix_list
    - all structures that has less than target health
- build_list
    - all constructionSites
- sources
    - save resource spots in a list of tuple, (spot, assigned harvester)
- Numbers of target population of each type
    - Depended on the room
- Current population


# Each tick
- Room will update the states in memory (also cleanup memory)
- Room will loop through its towers
- Room will queue spawning of creeps

# To-Do features
- Save structure list in memory, for auto-rebuild if destoried.
- figure out how to predeploy replacing units right before old ones die
- clean up code
- alter creep design to be more damage obsorbant
