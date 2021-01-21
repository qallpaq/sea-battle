import {Battlefield} from "@/components/Battlefield"
import {isUnderPoint} from "@/components/additional"


export class BattlefieldView extends Battlefield {
    constructor(showShips = true) {
        super()

        this.cells = []
        this.root = this.createTagWithClass('div', 'battlefield')
        this.table = this.createTagWithClass('div', 'battlefield-table')
        this.dock = this.createTagWithClass('div', 'battlefield-dock')
        this.polygon = this.createTagWithClass('div', 'battlefield-polygon')
        this.showShips = showShips

        this.root.append(this.table, this.dock, this.polygon)

        for (let y = 0; y < 10; y++) {
            const row = []
            const tr = this.createTagWithClass('tr', 'battlefield-row')
            tr.dataset.y = 'y'

            for (let x = 0; x < 10; x++) {
                const td = this.createTagWithClass('td', 'battlefield-item')

                Object.assign(td.dataset, {x, y})

                tr.append(td)
                row.push(td)
            }

            this.cells.push(row)
            this.table.append(tr)
        }

        for (let x = 0; x < 10; x++) {
            const cell = this.cells[0][x]
            const marker = this.createTagWithClass('div', ['marker', 'marker-column'])

            marker.textContent = 'АБВГДЕЖЗИК'[x]

            cell.append(marker)
        }

        for (let y = 0; y < 10; y++) {
            const cell = this.cells[y][0]
            const marker = this.createTagWithClass('div', ['marker', 'marker-row'])

            marker.textContent = y + 1

            cell.append(marker)
        }
    }

    createTagWithClass(tag, classes) {
        const div = document.createElement(tag)

        typeof classes === 'object'
            ? classes.forEach(clazz => div.classList.add(clazz))
            : div.classList.add(classes)

        return div
    }

    addShip(ship, x, y) {
        if (!super.addShip(ship, x, y)) {
            return false
        }

        if (this.showShips) {
            this.dock.append(ship.div)

            if (ship.placed) {
                const cell = this.cells[y][x]
                const cellRect = cell.getBoundingClientRect()
                const rootRect = this.root.getBoundingClientRect()

                ship.div.style.left = `${cellRect.left - rootRect.left}px`
                ship.div.style.top = `${cellRect.top - rootRect.top}px`
            } else {
                ship.setDirection('row')
                ship.div.style.left = `${ship.startX}px`
                ship.div.style.top = `${ship.startY}px`
            }
        }

        return true
    }

    removeShip(ship) {
        if (!super.removeShip(ship)) {
            return false
        }

        if (Array.prototype.includes.call(this.dock.children, ship.div)) {
            ship.div.remove()
        }

        return true
    }

    isUnder(point) {
        return isUnderPoint(point, this.root)
    }

    addShot(shot) {
        if (!super.addShot(shot)) {
            return false
        }

        this.polygon.append(shot.div)

        const cell = this.cells[shot.y][shot.x]
        const cellRect = cell.getBoundingClientRect()
        const rootRect = this.root.getBoundingClientRect()

        shot.div.style.left = `${cellRect.left - rootRect.left}px`
        shot.div.style.top = `${cellRect.top - rootRect.top}px`
        return true
    }

    removeShot(shot) {
        if (!super.removeShot(shot)) {
            return false
        }

        if (Array.prototype.includes.call(this.polygon.children, shot.div)) {
            shot.div.remove()
        }

        return true
    }
}
