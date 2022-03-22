/**
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
const ENV_MAP = 'sky';                  // 'bridge', 'canary', 'park', 'sky', 'snow'


/**
 * Initial Models
 */
MODELS = ['assets/models/test.gltf'];   // glTF models


/**
 * Create Engine
 */
const engine = new EngineCore({ graphics: { envMap: 'snow' }, physics: { enable: false } });



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
function init(args) {

    /** Load assets, the *.gltf */
    load_assets(args);

    /** Get graphic object */
    const g = args.graphics;

    /** Load GLTF models */
    g.loadGLTF('assets/models/parented_objects.gltf').then((models) => {
        let gltfModel = models[0].scene;
        gltfModel.position.x = 3;
        console.dirxml(gltfModel);
    });
}


/**
 * Main loop
 */
function loop(args) {
    const g = args.graphics;    // Graphics
    const p = args.physics;     // Physics
    const e = args.engine;      // Engine


    //** 'a': Axes helper
    if (e.keyboard.keyDown('a', 100)) {
        g.toggleAxesHelper();
    }

    //** 'd': Debug
    if (e.keyboard.keyDown('d', 1000)) {
        p.toggleDebug();
    }

    //** 'g' Grids helper
    if (e.keyboard.keyDown('g', 1000)) {
        g.toggleGridHelper();
    }

    //** 'w': Print world bodies
    if (e.keyboard.keyDown('w', 1000)) {
        console.dir(p.world.bodies);
    }

    //** 'l': Show labels
    if (e.keyboard.keyDown('l', 1000)) {
        console.dir(g.scene);
        Engine.MeshUtils.toggleAllLabels(g.scene);
    }
}



let target;
function load_assets(args) {


    const g = args.graphics;
    const p = args.physics;
    const e = args.engine;

    new Engine.Asset(engine).load('assets/models/asset.gltf').then((asset) => {


        const N = 20;
        const arr = [];
        arr.push(asset);
        asset.setPosition(new Engine.THREE.Vector3(10, 10, -10));

        for (let i = 1; i < N; i++) {

            let d = i * 1;
            let actor = asset.spawn(new Engine.THREE.Vector3(20 - d, 10, 20 - d), new Engine.THREE.Vector3(0, -Math.PI + i, 0));
            arr.push(actor);


            actor.changeName('actor #' + i);

            actor.rotationY = -Math.PI + Math.random() * Math.PI;

            let sc = .5 + Math.random();

            actor.setScale(new Engine.THREE.Vector3(sc, sc, sc));

            actor.setAngularVelocity(new Engine.THREE.Vector3(0, 3 - Math.random() * 10, 0))

            actor.body.angularDamping = Math.random() / 50;

            actor.body.mass = sc * 2;

            // actor.hideLabel();

            // actor.hideDebug();

            if (i % 2) {
                // actor.hideDebug();
            }

            if (i == 10) {
                target = actor.body;
                target.angularDamping = 0.8;
            }
        }

        let cnt = 0;
        e.on('update', () => {
            cnt++;
            if (cnt > 10000 / 60) {
                cnt = 0;
                arr.forEach(a => {
                    a.setAngularVelocity(new Engine.THREE.Vector3(0, 3 - Math.random() * 16, 0))

                    if (Math.random() > 0.5) {
                        //** Apply force to body */
                        // a.body.applyLocalForce(
                        //     new Engine.CANNON.Vec3( 0, 1000+Math.random()*10000, 0 ),
                        //     new Engine.CANNON.Vec3( 0, 0, 0 )
                        // );

                        a.setAngularVelocity(new Engine.THREE.Vector3(0, 3 - Math.random() * 5, 0))
                    }
                });
            }
        });


        //** Add axes to all meshes */
        // g.addAxesToAllMeshes(1.5);

        //** Toggle debugging visualization */
        // p.toggleDebug();

    });
}
