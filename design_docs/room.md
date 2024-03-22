## Room 

- Each room is responsible for recording its own state of structures and resources in memory. (includig towers)
- Each room is responsible for the local population creeps

# Memorys
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
- Room will run towers (To-Do: move to main)
- Room will run links (to-do: move to main)

# Features
- pre-deploy replacing units right before old ones die

# To-Do features
- Save structure list in memory, for auto-rebuild if destoried.
- alter creep design to be more damage obsorbant
- Links
    - each (Link, role) will be saved in memory
    - if there exist a link without a role:
        - run initiate_links, which will refresh role for every link
- Label spawns
    - label them as main/backup
- Reserved room

