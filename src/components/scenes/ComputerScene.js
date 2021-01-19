import {Scene} from "@/components/Scene"


export class ComputerScene extends Scene {
    start() {
        this.removeEventListeners = []

        document
            .querySelectorAll('.app-actions')
            .forEach(element => element.classList.add('hidden'))

        document
            .querySelector(`[data-scene="computer"]`)
            .classList.remove('hidden')
    }
}
