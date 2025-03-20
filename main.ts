let x = 0
let y = 0

// Representação do labirinto: 1 = parede, 0 = caminho
let labirinto = [
    [0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0]
]

function desenharLabirinto() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (labirinto[j][i] === 1) {
                led.plotBrightness(i, j, 100) // Parede
            }
        }
    }
}

function atualizarBolinha() {
    led.plotBrightness(x, y, 255) // Bolinha com brilho máximo
}

// Evento principal
basic.forever(function () {
    desenharLabirinto()
    atualizarBolinha()
    basic.pause(200)
    basic.clearScreen()
    desenharLabirinto()

    // Movimenta a bolinha com base na inclinação
    if (input.acceleration(Dimension.X) > 200 && x < 4 && labirinto[y][x + 1] === 0) {
        x++
    } else if (input.acceleration(Dimension.X) < -200 && x > 0 && labirinto[y][x - 1] === 0) {
        x--
    } else if (input.acceleration(Dimension.Y) > 200 && y < 4 && labirinto[y + 1][x] === 0) {
        y++
    } else if (input.acceleration(Dimension.Y) < -200 && y > 0 && labirinto[y - 1][x] === 0) {
        y--
    }

    // Verifica se chegou ao final
    if (x === 4 && y === 4) {
        basic.showString("Venceu!")
        control.reset() // Reinicia o jogo
    }
})
