import './styles/index.scss'
import {Application} from "@/components/Application"
import {PreparationScene} from "@/components/scenes/PreparationScene"
import {ComputerScene} from "@/components/scenes/ComputerScene"


const app = new Application({
    preparation: PreparationScene,
    computer: ComputerScene
})

app.start('preparation')
