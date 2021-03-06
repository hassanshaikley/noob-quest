export default class Explosion extends PIXI.Container {
  constructor(props) {
    super(props)
    this.props = props
    // const { container } = props
    const texture = new PIXI.Texture.from('images/particle.png')

    this.pieces = new Array(8).fill(0).map(piece => {
      return {
        sprite: new PIXI.Sprite(texture),
        speed: Math.floor(1 + Math.random() * 2),
        rotation: Math.floor(Math.random() * Math.floor(4) * 90)
      }
    })

    this.pieces.forEach(piece => {
      piece.sprite.y = props.y
      piece.sprite.x = props.x
      //   piece.sprite.rotation = piece.rotation
      this.addChild(piece.sprite)
    })

    this.spawnTime = new Date()
    this.duration = 500
    // container.addChild(this)
  }

  update() {
    const percentDone = (new Date() - this.spawnTime) / 100

    this.alpha = 1 / percentDone

    if (new Date() - this.spawnTime >= this.duration + 0.5) {
      this.pieces.forEach(piece => {
        this.removeChild(piece.sprite)
      })
      return
    }
    this.pieces.forEach(piece => {
      const x = Math.cos(piece.rotation) * piece.speed
      const y = Math.sin(piece.rotation) * piece.speed

      piece.sprite.y += y
      piece.sprite.x += x
    })
  }
}
