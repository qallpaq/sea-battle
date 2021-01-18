export class Mouse {
    element = null

    update = e => {
        this.x = e.clientX
        this.y = e.clientY
        this.delta = 0
        this.under = true
    }

    under = false
    pUnder = false

    x = null
    y = null

    pX = null
    pY = null

    left = null
    pLeft = false

    delta = 0
    pDelta = 0

    constructor(element) {
        this.element = element

        element.addEventListener('mousemove', e => {
            this.tick()
            this.update(e)
        })

        element.addEventListener('mouseenter', e => {
            this.tick()
            this.update(e)
        })

        element.addEventListener('mouseleave', e => {
            this.tick()
            this.update(e)

            this.under = false
        })

        element.addEventListener('mousedown', e => {
            this.tick()
            this.update(e)

            if (e.button === 0) {
                this.left = true
            }
        })

        element.addEventListener('mouseup', e => {
            this.tick()
            this.update(e)

            if (e.button === 0) {
                this.left = false
            }
        })

        element.addEventListener('wheel', e => {
            this.tick()

            this.x = e.clientX
            this.y = e.clientY
            this.under = true
            this.delta = e.deltaY > 0 ? 1 : -1
        })

    }

    tick() {
        this.pX = this.x
        this.pY = this.y
        this.pUnder = this.under
        this.pLeft = this.left
        this.pDelta = this.delta
        this.delta = 0
    }
}
