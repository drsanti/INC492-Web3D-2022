/**
 * 01 - GETTING STARTED
 * 
 * Graphics and Physics Engine (GPEngin) for Web3D Applications
 * Asst.Prof.Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory | ECC-Lab, INC-KMUTT
 * 
 * Description: Example of using the GPEngin
 * Update: 22 March 2022
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
const ENV_MAP = 'park';                      // 'bridge', 'canary', 'park', 'sky', 'snow'


/**
 * Initial Models
 */
const MODELS = ['assets/models/startup.gltf'];   // glTF models


/**
 * Create Engine
 */
const engine = new EngineCore(
    {
        graphics: {
            envMap: ENV_MAP
        },
        physics: {
            enable: true
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


/**
 * Initialize
 */
function init(iargs) {          // iargs = {engine, graphics, physics, models}    
    console.dir(iargs);
}


/**
 * Engine Loop
 */
function loop(eargs) {          // iargs = {engine, graphics, physics, frameCount, deltaTime}    
    if (eargs.frameCount % 100 == 0) {
        console.log(eargs);
    }
}
