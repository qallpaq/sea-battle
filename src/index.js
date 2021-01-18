import './styles/index.scss'
import {Application} from "@/components/Application"
import {PreparationScene} from "@/components/scenes/PreparationScene"


const app = new Application({
    preparation: PreparationScene
})

app.start('preparation')
