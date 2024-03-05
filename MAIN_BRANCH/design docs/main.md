## Main 

# Each Tick
- Memory cleanup for creeps
- Get a list of all rooms I can control, and run room code through them
- Get all my creeps, and run code through them
- Manage console log status display

# Todo
- figure out how to automatically expand
    - manually plant flags for new spawn locations
- get defense up, design soldiers and trigger mechanisms, safe mode
- optimize code
    - make creeps change mode and start with it in the same tick
    - lower CPU usage
        - path
        - more mmeory items
- Link behaviors (urgent)
    - Two kinds of room - spawn closer with controller (controller_spawn), and closer with source (source_spawn)
    - controller_spawn:
        - A Link will be next to controller, and marked as reciever, and only upgraders can withdraw from it
        - A link will be next to storage, and marked as sender, and hauler can transfer to it. (piority after extensions)
    - source_spawn: ???



