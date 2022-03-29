/**
 * 03 - OBJECT MANIPULATION/TRANSFORMATION
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
const MODELS = ['assets/models/floor_wall/floor_wall.gltf',
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


/**
 * Initialize Engine
 */
engine.init({ models: MODELS }).then((args) => {
    init(args);                 // Call init function to initialize other stuffs 
    args.engine.start(loop);    // Start the engine
});




/** Global Variables ***********************************************************/

let targetObject = null;        // Used to store/point to a target object/mesh
let alpha = 0;                  // Used for mathematics calculation

/*******************************************************************************/



/**
 * Initialize
 */
function init(iargs) {                                      // iargs = {engine, graphics, physics, models}

    /** [0] Set camera position ************************************************/
    engine.graphics.setCameraPosition(2, 3, 5);             // Left/Right, Up/Down, Front/Back

    //** [1] Check variables ***************************************************/
    // console.dir(iargs);                                  // Object
    // console.dir(iargs.models);                           // Array
    // console.dir(iargs.models[0].scene);                  // Group
    // console.dir(iargs.models[0].scene.children);         // Array

    //** [2] Get a target object (classical method) ****************************/
    // targetObject = iargs.models[0].scene.children[0];    // First object
    // console.log(targetObject);

    /** [3]  Get a target object (engine method) *******************************/
    targetObject = engine.graphics.getMeshByName('wing');
    console.log(targetObject);

    //** [4] All local axes to all meshes/objects ******************************/
    engine.graphics.addAxesToAllMeshes(0.5);


    //** [5] Show/hide object's label (name) ***********************************/
    Engine.MeshUtils.toggleAllLabels(engine.graphics.scene);
}


/**
 * Engine Loop
 */
function loop(eargs) {          // eargs = {engine, graphics, physics, frameCount, deltaTime}

    /** [6 Set object's rotation **********************************************/
    if (targetObject != null) {
        targetObject.rotation.y += 0.1;
    }


    /** [7] Set object's position **********************************************/
    // if (targetObject != null) {
    //     targetObject.position.x = Math.sin(alpha)*5;
    // }


    /** [8] Set object's scale *************************************************/
    // if (targetObject != null) {
    //     let scale =  Math.sin(alpha);
    //     targetObject.scale.set(scale, scale, scale);
    // }


    alpha += Math.PI / 100;
}
