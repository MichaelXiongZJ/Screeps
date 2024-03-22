## Link

Link is needed for long distance harvesting and long distance controller upgrade

# types of links
- harvester link
    - anyone can transfer to it
    - forbidden for hauling works
- controller link
    - anyone can withdraw from it
    - forbidden for hauling works
- Home link
    - role depends on the other existing link
    - if harvester link exists
        - Home link will be receiver, and anyone can withdraw from it
    - if controller link exists
        - Home link will be sender, and hauler will transfer to it
    - if harvester link AND controller link exists
        - harvester link will pioritize transfer to controller link, then home link

# Initiating link roles
    - Handeled by the room


    note: for every link exists, hauler needed - 1, but min: 1