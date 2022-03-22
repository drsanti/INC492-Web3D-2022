/**
 * GPEngine
 */
const Engine = GPEngine;


/**
 * EngineCore
 */
const EngineCore = Engine.EngineCore;



/**
 * Environment Map
 */
const ENV_MAP = 'pack';


/**
 * Initial Models
 */
MODELS = ['assets/models/test.gltf'];


/**
 * Create Engine
 */
const engine = new EngineCore();

/**
 * Initialize Engine
 */
engine.init({ envMap: 'park', models: MODELS }).then((args) => {
    init(args);                 // Call init function to initialize other stuffs 
    args.engine.start(loop);    // Start the engine
});


/**
 * Initialize
 */
function init(args) {
    console.dir(args);
}


/**
 * Engine Loop
 */
function loop(args) {
    console.dir(args);
}