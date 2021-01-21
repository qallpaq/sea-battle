import {BattlefieldView} from "@/components/BattlefieldView"
import {Mouse} from "@/components/Mouse"


export class Application {
    constructor(scenes = {}) {
        this.mouse = new Mouse(document.body)

        this.player = new BattlefieldView(true)
        this.opponent = new BattlefieldView(false)

        this.activeScene = null
        this.scenes = {}

        this.appendTo(`[data-side="player"]`, this.player.root)
        this.appendTo(`[data-side="opponent"]`, this.opponent.root)

        for (const [sceneName, SceneClass] of Object.entries(scenes)) {
            this.scenes[sceneName] = new SceneClass(sceneName, this)
        }

        Object.values(this.scenes).forEach(scene => scene.init())

        requestAnimationFrame(() => this.tick())
    }

    tick() {
        requestAnimationFrame(() => this.tick())

        if (this.activeScene) {
            this.activeScene.update()
        }

        this.mouse.tick()
    }

    start(sceneName, ...args) {
        if (this.activeScene && this.activeScene.name === sceneName) {
            return false
        }

        if (!this.scenes.hasOwnProperty(sceneName)) {
            return false
        }

        if (this.activeScene) {
            this.activeScene.stop()
        }

        const scene = this.scenes[sceneName]
        this.activeScene = scene
        scene.start(...args)

        return true
    }

    appendTo(where, root) {
        document.querySelector(where).append(root)
    }
}
