"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RotateCcw, Pause } from "lucide-react"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

type Position = { x: number; y: number }
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [coins, setCoins] = useState<Position[]>([])
  const [obstacles, setObstacles] = useState<Position[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const directionRef = useRef(direction)

  // 生成随机位置
  const generateRandomPosition = useCallback((exclude: Position[]): Position => {
    let pos: Position
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (exclude.some((p) => p.x === pos.x && p.y === pos.y))
    return pos
  }, [])

  // 初始化游戏
  const initGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setDirection("RIGHT")
    directionRef.current = "RIGHT"
    setScore(0)
    setGameOver(false)
    setIsPaused(true)
    setSpeed(INITIAL_SPEED)

    // 生成初始金币
    const initialCoins: Position[] = []
    for (let i = 0; i < 3; i++) {
      initialCoins.push(generateRandomPosition([...initialSnake, ...initialCoins]))
    }
    setCoins(initialCoins)

    // 生成初始障碍物
    const initialObstacles: Position[] = []
    for (let i = 0; i < 5; i++) {
      initialObstacles.push(
        generateRandomPosition([...initialSnake, ...initialCoins, ...initialObstacles])
      )
    }
    setObstacles(initialObstacles)
  }, [generateRandomPosition])

  useEffect(() => {
    initGame()
  }, [initGame])

  // 绘制游戏
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = "#1a1a2e"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制网格线
    ctx.strokeStyle = "#2a2a4e"
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // 绘制障碍物
    obstacles.forEach((obstacle) => {
      ctx.fillStyle = "#ff4757"
      ctx.shadowColor = "#ff4757"
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.roundRect(
        obstacle.x * CELL_SIZE + 2,
        obstacle.y * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4,
        4
      )
      ctx.fill()
      ctx.shadowBlur = 0

      // 绘制 X 标记
      ctx.strokeStyle = "#1a1a2e"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(obstacle.x * CELL_SIZE + 6, obstacle.y * CELL_SIZE + 6)
      ctx.lineTo(obstacle.x * CELL_SIZE + CELL_SIZE - 6, obstacle.y * CELL_SIZE + CELL_SIZE - 6)
      ctx.moveTo(obstacle.x * CELL_SIZE + CELL_SIZE - 6, obstacle.y * CELL_SIZE + 6)
      ctx.lineTo(obstacle.x * CELL_SIZE + 6, obstacle.y * CELL_SIZE + CELL_SIZE - 6)
      ctx.stroke()
    })

    // 绘制金币
    coins.forEach((coin) => {
      ctx.fillStyle = "#ffd700"
      ctx.shadowColor = "#ffd700"
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(
        coin.x * CELL_SIZE + CELL_SIZE / 2,
        coin.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 3,
        0,
        Math.PI * 2
      )
      ctx.fill()
      ctx.shadowBlur = 0

      // 金币内部
      ctx.fillStyle = "#ffec8b"
      ctx.beginPath()
      ctx.arc(
        coin.x * CELL_SIZE + CELL_SIZE / 2,
        coin.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 4,
        0,
        Math.PI * 2
      )
      ctx.fill()
    })

    // 绘制蛇
    snake.forEach((segment, index) => {
      const isHead = index === 0
      const gradient = ctx.createRadialGradient(
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      )

      if (isHead) {
        gradient.addColorStop(0, "#7cfc00")
        gradient.addColorStop(1, "#32cd32")
        ctx.shadowColor = "#7cfc00"
        ctx.shadowBlur = 12
      } else {
        const colorIntensity = 1 - index / (snake.length + 5)
        gradient.addColorStop(0, `rgba(124, 252, 0, ${colorIntensity})`)
        gradient.addColorStop(1, `rgba(50, 205, 50, ${colorIntensity})`)
        ctx.shadowBlur = 0
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        isHead ? 6 : 4
      )
      ctx.fill()
      ctx.shadowBlur = 0

      // 蛇头眼睛
      if (isHead) {
        ctx.fillStyle = "#1a1a2e"
        const eyeSize = 3
        let eye1X, eye1Y, eye2X, eye2Y

        switch (directionRef.current) {
          case "UP":
            eye1X = segment.x * CELL_SIZE + 5
            eye1Y = segment.y * CELL_SIZE + 5
            eye2X = segment.x * CELL_SIZE + CELL_SIZE - 8
            eye2Y = segment.y * CELL_SIZE + 5
            break
          case "DOWN":
            eye1X = segment.x * CELL_SIZE + 5
            eye1Y = segment.y * CELL_SIZE + CELL_SIZE - 8
            eye2X = segment.x * CELL_SIZE + CELL_SIZE - 8
            eye2Y = segment.y * CELL_SIZE + CELL_SIZE - 8
            break
          case "LEFT":
            eye1X = segment.x * CELL_SIZE + 5
            eye1Y = segment.y * CELL_SIZE + 5
            eye2X = segment.x * CELL_SIZE + 5
            eye2Y = segment.y * CELL_SIZE + CELL_SIZE - 8
            break
          case "RIGHT":
          default:
            eye1X = segment.x * CELL_SIZE + CELL_SIZE - 8
            eye1Y = segment.y * CELL_SIZE + 5
            eye2X = segment.x * CELL_SIZE + CELL_SIZE - 8
            eye2Y = segment.y * CELL_SIZE + CELL_SIZE - 8
            break
        }

        ctx.beginPath()
        ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2)
        ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // 游戏结束遮罩
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#ff4757"
      ctx.font = "bold 24px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("游戏结束!", canvas.width / 2, canvas.height / 2 - 20)
      ctx.fillStyle = "#ffd700"
      ctx.font = "18px sans-serif"
      ctx.fillText(`得分: ${score}`, canvas.width / 2, canvas.height / 2 + 15)
    }
  }, [snake, coins, obstacles, gameOver, score])

  // 游戏循环
  useEffect(() => {
    if (isPaused || gameOver) return

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] }
        const currentDirection = directionRef.current

        switch (currentDirection) {
          case "UP":
            head.y -= 1
            break
          case "DOWN":
            head.y += 1
            break
          case "LEFT":
            head.x -= 1
            break
          case "RIGHT":
            head.x += 1
            break
        }

        // 边界检测（穿墙）
        if (head.x < 0) head.x = GRID_SIZE - 1
        if (head.x >= GRID_SIZE) head.x = 0
        if (head.y < 0) head.y = GRID_SIZE - 1
        if (head.y >= GRID_SIZE) head.y = 0

        // 撞到障碍物
        if (obstacles.some((o) => o.x === head.x && o.y === head.y)) {
          setGameOver(true)
          if (score > highScore) {
            setHighScore(score)
          }
          return prevSnake
        }

        // 撞到自己
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true)
          if (score > highScore) {
            setHighScore(score)
          }
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]

        // 吃到金币
        const coinIndex = coins.findIndex((c) => c.x === head.x && c.y === head.y)
        if (coinIndex !== -1) {
          setScore((prev) => prev + 10)
          setCoins((prevCoins) => {
            const newCoins = prevCoins.filter((_, i) => i !== coinIndex)
            newCoins.push(generateRandomPosition([...newSnake, ...obstacles, ...newCoins]))
            return newCoins
          })

          // 每50分增加一个障碍物
          if ((score + 10) % 50 === 0) {
            setObstacles((prevObstacles) => {
              const newObstacle = generateRandomPosition([
                ...newSnake,
                ...coins,
                ...prevObstacles,
              ])
              return [...prevObstacles, newObstacle]
            })
            // 加快速度
            setSpeed((prev) => Math.max(prev - 10, 80))
          }
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [isPaused, gameOver, coins, obstacles, score, highScore, speed, generateRandomPosition])

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (directionRef.current !== "DOWN") {
            directionRef.current = "UP"
            setDirection("UP")
          }
          break
        case "ArrowDown":
        case "s":
        case "S":
          if (directionRef.current !== "UP") {
            directionRef.current = "DOWN"
            setDirection("DOWN")
          }
          break
        case "ArrowLeft":
        case "a":
        case "A":
          if (directionRef.current !== "RIGHT") {
            directionRef.current = "LEFT"
            setDirection("LEFT")
          }
          break
        case "ArrowRight":
        case "d":
        case "D":
          if (directionRef.current !== "LEFT") {
            directionRef.current = "RIGHT"
            setDirection("RIGHT")
          }
          break
        case " ":
          e.preventDefault()
          if (!gameOver) {
            setIsPaused((prev) => !prev)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameOver])

  // 方向控制按钮
  const handleDirectionClick = (newDirection: Direction) => {
    if (gameOver || isPaused) return

    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    }

    if (directionRef.current !== opposites[newDirection]) {
      directionRef.current = newDirection
      setDirection(newDirection)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* 分数面板 */}
      <div className="flex gap-8">
        <Card className="px-6 py-3 bg-card border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">当前得分</p>
            <p className="text-3xl font-bold text-secondary">{score}</p>
          </div>
        </Card>
        <Card className="px-6 py-3 bg-card border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">最高分</p>
            <p className="text-3xl font-bold text-primary">{highScore}</p>
          </div>
        </Card>
      </div>

      {/* 游戏画布 */}
      <Card className="p-4 bg-card border-border">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="rounded-lg"
        />
      </Card>

      {/* 控制按钮 */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button
            onClick={() => {
              if (gameOver) {
                initGame()
              } else {
                setIsPaused((prev) => !prev)
              }
            }}
            className="gap-2"
            variant={isPaused ? "default" : "secondary"}
          >
            {gameOver ? (
              <>
                <RotateCcw className="w-4 h-4" /> 重新开始
              </>
            ) : isPaused ? (
              <>
                <Play className="w-4 h-4" /> 开始游戏
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" /> 暂停
              </>
            )}
          </Button>
          {!gameOver && !isPaused && (
            <Button variant="outline" onClick={initGame} className="gap-2">
              <RotateCcw className="w-4 h-4" /> 重来
            </Button>
          )}
        </div>

        {/* 方向控制 */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDirectionClick("UP")}
            disabled={isPaused || gameOver}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDirectionClick("LEFT")}
            disabled={isPaused || gameOver}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDirectionClick("RIGHT")}
            disabled={isPaused || gameOver}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDirectionClick("DOWN")}
            disabled={isPaused || gameOver}
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
          <div />
        </div>
      </div>

      {/* 操作说明 */}
      <Card className="p-4 bg-card border-border max-w-md">
        <h3 className="font-semibold text-foreground mb-2">游戏说明</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            <span className="text-secondary">● 金币</span> - 吃掉获得 10 分
          </li>
          <li>
            <span className="text-destructive">● 障碍物</span> - 碰到游戏结束
          </li>
          <li>
            <span className="text-primary">● 蛇身</span> - 撞到自己游戏结束
          </li>
          <li className="pt-2 border-t border-border">
            <span className="text-foreground">键盘:</span> 方向键 / WASD 控制方向，空格暂停
          </li>
          <li>
            <span className="text-foreground">手机:</span> 点击下方方向按钮
          </li>
        </ul>
      </Card>
    </div>
  )
}
