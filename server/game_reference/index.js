module.exports = {
    game_types: ["demo"],
    "demo": {
        "game_length": 60000,
        "valid_action_ids": [0,1],
        "description": `This is the description of the game. You have 60 seconds to compete`
    },
    "squat_race": {
        "game_length": 60000,
        "valid_action_ids": [3],
        "description": `Race to do the most squats`
    },
    "actions": {
        0: { "action_name": "jump", "threshold": 0 },
        1: { "action_name": "crouch", "threshold": 0 },
        2: { "action_name": "plank", "threshold": 0 },
        3: { "action_name": "squat", "threshold": 0}
    }
}