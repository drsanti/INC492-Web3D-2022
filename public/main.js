/**
 * 04 - KEYBOARD INPUT
 * 
 * Graphics and Physics Engine (GPEngin) for Web3D Applications
 * Asst.Prof.Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory | ECC-Lab, INC-KMUTT
 * 
 * Description: Example of using the GPEngin
 * Update: 29 March 2022
 */


/**
 * GPEngine
 */
const Engine = GPEngine;


/**
 * EngineCore
 */
const EngineCore = Engine.EngineCore;


/**
 * Environment Map/Skybox
 */
const ENV_MAP = 'snow';                             // 'bridge', 'canary', 'park', 'sky', 'snow'


/**
 * Initial Models
 */
const MODELS = [
    'assets/models/floor_wall/floor_wall.gltf',
    'assets/models/servo_motor/servo_motor.gltf'];   // glTF models


/**
 * Create Engine
 */
const engine = new EngineCore(
    {
        graphics: {
            envMap: ENV_MAP
        },
        physics: {
            enable: false       // Deactivate the physic engine
        }
    }
);


// /**
//  * Initialize Engine
//  */
// engine.init({ models: MODELS }).then((args) => {
//     init(args);                 // Call init function to initialize other stuffs 
//     args.engine.start(loop);    // Start the engine
// });




// /** Global Variables ***********************************************************/

// let targetObject = null;        // Used to store/point to a target object/mesh
// let alpha = 0;                  // Used for mathematics calculation
// let direction = 1;              // +1: rotate right, -1: rotate left


// /*******************************************************************************/



// /**
//  * Initialize
//  */
// function init(iargs) {                                      // iargs = {engine, graphics, physics, models}

//     /** [0] Set camera position ************************************************/
//     engine.graphics.setCameraPosition(4, 2, 2);             // Left/Right, Up/Down, Front/Back

//     engine.graphics.setCameraLookAt(0,0,0);

//     /** [1]  Get a target object (engine method) *******************************/
//     targetObject = engine.graphics.getMeshByName('wing');

//     //** [2] All local axes to all meshes/objects ******************************/
//     engine.graphics.addAxesToAllMeshes(0.8);


//     //** [4] Show/hide object's label (name) ***********************************/
//     Engine.MeshUtils.toggleAllLabels(engine.graphics.scene);

// }


// /**
//  * Engine Loop
//  */
// function loop(eargs) {          // eargs = {engine, graphics, physics, frameCount, deltaTime}

//     if (targetObject == null) {
//         return;
//     }

//     //** [5] Key down checking ************************************************/
//     let pressed = false;    // local variable

//     if (engine.keyboard.keyDown('a', 1000)) {
//         direction = -1;
//         pressed = true;
//     }
//     if (engine.keyboard.keyDown('d', 1000)) {
//         direction = +1;
//         pressed = true;
//     }
//     if (engine.keyboard.keyDown('t', 1000)) {
//         direction *= -1;
//         pressed = true;
//     }

//     if (pressed) {
//         // if (direction>0) {
//         //     console.log('Rotate Right');
//         // }  
//         // else {
//         //     console.log('Rotate Left');
//         // }

//         // Lines above can be replaced with this line.
//         console.log('Rotate', (direction > 0) ? "Right" : "Left");
//     }


//     /** [6 Set object's rotation **********************************************/
//     targetObject.rotation.y += (0.01 * direction); // +1, -1


//     alpha += 0.05;
// }



/**
 * Initialize Engine
 */
engine.init({ models: MODELS }).then((args) => {
    init(args);                 // Call init function to initialize other stuffs 
    args.engine.start(loop);    // Start the engine
});



/**
 * Initialize
 */
function init(iargs) {                                      // iargs = {engine, graphics, physics, models}

    /** [0] Set camera position ************************************************/
    engine.graphics.setCameraPosition(4, 2, 2);             // Left/Right, Up/Down, Front/Back

    engine.graphics.setCameraLookAt(0, 0, 0);

    /** [1]  Get a target object (engine method) *******************************/
    targetObject = engine.graphics.getMeshByName('wing');

    //** [2] All local axes to all meshes/objects ******************************/
    engine.graphics.addAxesToAllMeshes(0.8);


    //** [4] Show/hide object's label (name) ***********************************/
    Engine.MeshUtils.toggleAllLabels(engine.graphics.scene);

}


// Lines of code are well written above
let wing  = null;
let alpha = 0;
function loop(args) {   // Engine loop, called 60 times per second

    if (wing == null) {
        wing = engine.graphics.getMeshByName('wing');
    }
    else {
        wing.rotation.y -= Math.PI / 100;
        alpha += Math.PI / 100;
    }
}


