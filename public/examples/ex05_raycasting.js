/**
 * 05 - RAY CASTING
 * 
 * Graphics and Physics Engine (GPEngin) for Web3D Applications
 * Asst.Prof.Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory | ECC-Lab, INC-KMUTT
 * 
 * Description: Example of using the Ray Casting
 * Update: 05 April 2022
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
    'assets/models/floor_wall/floor_wall.gltf', 'assets/models/servo_motor/servo_motor_cp.gltf'];   // glTF models


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
let rayCaster = null;           // Raycast object
let speedFactor = 1;
/*******************************************************************************/


/**
 * Initialize
 */
function init(args) {

    /** [0] Set camera position ************************************************/
    engine.graphics.setCameraPosition(0, 2, 5);

    /** [1] Srt camera target **************************************************/
    engine.graphics.setCameraLookAt(0, 0, 0);

    /** [2] All local axes to all meshes/objects ******************************/
    //engine.graphics.addAxesToAllMeshes(0.8);

    /** [3] Show/hide object's label (name) ***********************************/
    //Engine.MeshUtils.toggleAllLabels(engine.graphics.scene);


    /** [4] Create a raycast object *******************************************/
    rayCaster = new Engine.RayCast(args.graphics, args.physics);

}


/**
 * Engine Loop
 */
function loop(args) {

    let objectTakenFlag = false;

    /** Ex1: Perform ray casting *****************************************/
    if (engine.keyboard.keyDown('1')) {
        let rayObject = rayCaster.performRaycast();
        if (rayObject) {
            targetObject = rayObject.mesh;
            objectTakenFlag = true;
            console.log(rayObject);     // { intersect, mesh, ray }
        }
    }

    /** Ex2: Get ray casting mesh ****************************************/
    if (engine.keyboard.keyDown('2')) {

        let rayMesh = rayCaster.getRaycastMesh();
        if (rayMesh) {
            targetObject = rayMesh;
            objectTakenFlag = true;
            console.log(rayMesh);
        }
    }

    /** Ex3: Get ray casting distance ************************************/
    if (objectTakenFlag == true) {
        objectTakenFlag = false;
        let rayDistance = rayCaster.getRaycastDistance();
        if (rayDistance) {
            speedFactor = rayDistance / 2;
            console.log(rayDistance);   // 
        }
    }


    /** [5] Set object's rotation **********************************************/
    if (targetObject == null) {
        return;
    }
    targetObject.rotation.y += speedFactor * args.deltaTime / 600;

}
