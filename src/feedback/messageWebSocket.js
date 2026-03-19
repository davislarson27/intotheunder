import { likeCommentRequest, sendComment, getComments } from '../service';

const userNames = [
    "PixelMiner01",
    "ArcticCoder",
    "BlockBuilderX",
    "ShadowRunner",
    "NovaExplorer",
    "IronForgeDev",
    "SkylineGamer",
    "QuantumQuest",
    "DesertDrifter",
    "ForestByte",
    "GlacierKnight",
    "EchoStriker",
    "CrimsonCraft",
    "NeonNavigator",
    "SilentSyntax",
    "CodeVoyager",
    "LunarLogic",
    "CopperCore",
    "VelocityVibes",
    "StormAssembler",
    "BestUserEver23",
    "WhatAboutBob",
    "HappyFlamingo",
    "StarWarsInBlocks",
    "HungryAnt",
    "SlipperySnow",
    "SandyOceans",
    "JohnCena123",
    "NotAPolitician1"
];


export async function generateMessage () {
    
    const possibleMessages = [
        "You should add a volcano biome with lava lakes and obsidian caves.",
        "It would be cool if diamonds only spawned below a certain depth.",
        "Can we get different colored torches for different light vibes?",
        "Please add a minimap in the top corner of the screen.",
        "What about adding weather like snowstorms in the glacier biome?",
        "You should add underground abandoned structures with loot.",
        "It would be awesome if water flowed more realistically.",
        "Can we name our worlds when we create them?",
        "Add a boss mob that spawns deep underground.",
        "You should add music that changes depending on the biome.",
        "What about adding armor crafting?",
        "Please add controller support for the game.",
        "It would be cool if trees dropped different wood types.",
        "Add a desert temple with traps.",
        "Maybe add hunger or stamina for survival mode?",
        "Could you add multiplayer LAN support?",
        "Make caves larger and more varied.",
        "Add rare glowing mushrooms underground.",
        "Can we get custom keybind settings?",
        "It would be cool if ice was slippery to walk on.",
        "Add more enemy types in the forest biome.",
        "Maybe add a crafting guide in the inventory screen.",
        "You should add falling sand physics in the desert.",
        "Add an emerald ore that only spawns in mountains.",
        "What about adding underground rivers?",
        "It would be cool if mobs dropped unique loot.",
        "Add world difficulty settings when creating a new game.",
        "Maybe add a day/night cycle that affects enemies.",
        "You should add dynamic shadows from torches.",
        "Add a rare crystal cave biome.",
        "Can we get achievements or unlockables?",
        "Add different pickaxe tiers that mine faster.",
        "Maybe add friendly NPC traders.",
        "It would be cool if blocks had slight texture variations.",
        "Add a hardcore mode where death deletes the world.",
        "Could we get better world generation for mountains?",
        "Add background ambient sounds in each biome.",
        "Maybe add an inventory sort button.",
        "You should add secret underground labs with robots.",
        "Add a boss in the glacier biome like a frost titan."
    ];

    const possibleVersions = [ // weighted
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.4.0",
        "v1.3.2",
        "v1.3.2",
        "v1.3.2",
        "v1.3.2",
        "v1.3.2",
        "v1.3.2",
        "v1.3.1",
        "v1.3.0"
    ];

    const userName = userNames[Math.floor(Math.random() * userNames.length)];
    const message = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
    const version = possibleVersions[Math.floor(Math.random() * possibleVersions.length)];

    const userObjectPartial = {
        "userName": userName,
        "lastVersionDownloaded": version
    }

    await sendComment(message, userObjectPartial);

}

export async function likeCommmentsSimulator () {
    // choose user to like a comment with
    const userObjectPartial = {
        "userName": userNames[Math.floor(Math.random() * userNames.length)],
    }

    // get the comments from that user's perspective
    let commentsList = await getComments(userObjectPartial);

    if (commentsList.length == 0) { return ; }

    // select a comment
    let shortenList = Math.floor(Math.random() * 2);
    let commentIdIndex = Math.floor(Math.random() * commentsList.length * ( 1 - (shortenList * 0.5)) );
    if (!Object.hasOwn(commentsList[commentIdIndex], "commentID")) { return; }
    let curCommentID = commentsList[commentIdIndex].commentID;

    // attempt to like the comment
    likeCommentRequest(curCommentID, true, userObjectPartial.userName)

}