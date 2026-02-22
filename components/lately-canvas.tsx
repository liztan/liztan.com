"use client"

import { useRef, useEffect, useCallback } from "react"
import type { LatelyItem } from "@/content/lately"

interface Props {
  items: LatelyItem[]
}

interface Dot {
  homeX: number
  homeY: number
  x: number
  y: number
  targetX: number
  targetY: number
  baseRadius: number
  radius: number
  targetRadius: number
  phase: number
  breathSpeed: number
  vx: number
  vy: number
}

// Measure text lines for clearing and rendering
function layoutText(
  ctx: CanvasRenderingContext2D,
  phrase: string,
  fontSize: number,
  maxWidth: number,
  centerX: number,
  centerY: number
) {
  ctx.font = `${fontSize}px "Geist Mono", "SF Mono", "Menlo", monospace`
  const words = phrase.toUpperCase().split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const test = currentLine ? `${currentLine} ${word}` : word
    if (ctx.measureText(test).width > maxWidth) {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = test
    }
  }
  if (currentLine) lines.push(currentLine)

  const lineHeight = fontSize * 2.2
  const totalHeight = lines.length * lineHeight
  const startY = centerY - totalHeight / 2

  return { lines, lineHeight, startY, totalHeight }
}

export function LatelyCanvas({ items }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const timeRef = useRef(0)
  const isMobileRef = useRef(false)
  const canvasSizeRef = useRef({ w: 0, h: 0 })
  const spacingRef = useRef(16)

  const activeIndexRef = useRef(-1)
  const formationProgressRef = useRef(0)
  const textOpacityRef = useRef(0)
  const thinkingRef = useRef(false)
  const thinkingStartRef = useRef(0)
  const thinkingDuration = 1.2 // seconds before phrase appears
  const pendingIndexRef = useRef(-1)

  // Text clear zone — a rectangle the dots avoid
  const textBoundsRef = useRef({ x: 0, y: 0, w: 0, h: 0 })

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = []
    const spacing = isMobileRef.current ? 20 : 16
    spacingRef.current = spacing
    const cols = Math.ceil(width / spacing)
    const rows = Math.ceil(height / spacing)

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing + spacing / 2
        const y = row * spacing + spacing / 2
        dots.push({
          homeX: x,
          homeY: y,
          x,
          y,
          targetX: x,
          targetY: y,
          baseRadius: 0.8,
          radius: 0.8,
          targetRadius: 0.8,
          phase: Math.random() * Math.PI * 2,
          breathSpeed: 0.15 + Math.random() * 0.2,
          vx: 0,
          vy: 0,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  const getFormationTarget = useCallback(
    (
      dot: Dot,
      formation: string,
      width: number,
      height: number,
      progress: number
    ): { x: number; y: number; r: number } => {
      const cx = width / 2
      const cy = height / 2
      const dx = dot.homeX - cx
      const dy = dot.homeY - cy
      const distFromCenter = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const spacing = spacingRef.current

      switch (formation) {
        case "wave": {
          const waveAmp = 14 * progress
          const freq = 0.07
          const rowOffset =
            Math.sin(dot.homeX * freq + dot.homeY * 0.015) * waveAmp
          return {
            x: dot.homeX,
            y: dot.homeY + rowOffset,
            r: 0.8 + Math.abs(Math.sin(dot.homeX * freq)) * 0.7 * progress,
          }
        }
        case "scatter": {
          const pushDist = 35 * progress
          const scatter =
            distFromCenter < 10
              ? 0
              : pushDist / Math.max(distFromCenter, 1)
          return {
            x: dot.homeX + dx * scatter * 0.18,
            y: dot.homeY + dy * scatter * 0.18,
            r:
              0.4 +
              (1 - Math.min(distFromCenter / (width * 0.4), 1)) *
                1.4 *
                progress,
          }
        }
        case "uniform": {
          const gridX =
            Math.round(dot.homeX / spacing) * spacing + spacing / 2
          const gridY =
            Math.round(dot.homeY / spacing) * spacing + spacing / 2
          return {
            x: dot.homeX + (gridX - dot.homeX) * progress * 0.5,
            y: dot.homeY + (gridY - dot.homeY) * progress * 0.5,
            r: 0.8 + 0.4 * progress,
          }
        }
        case "geometric": {
          const bandSpacing = spacing * 6
          const nearestBandX =
            Math.round(dot.homeX / bandSpacing) * bandSpacing
          const nearestBandY =
            Math.round(dot.homeY / bandSpacing) * bandSpacing
          const distToBandX = Math.abs(dot.homeX - nearestBandX)
          const distToBandY = Math.abs(dot.homeY - nearestBandY)
          const onBand = Math.min(distToBandX, distToBandY) < spacing * 2

          if (onBand) {
            return {
              x:
                distToBandX < distToBandY
                  ? dot.homeX +
                    (nearestBandX - dot.homeX) * progress * 0.6
                  : dot.homeX,
              y:
                distToBandY <= distToBandX
                  ? dot.homeY +
                    (nearestBandY - dot.homeY) * progress * 0.6
                  : dot.homeY,
              r: 1.0 + 0.6 * progress,
            }
          }
          return {
            x: dot.homeX,
            y: dot.homeY,
            r: Math.max(0.15, 0.8 - 0.6 * progress),
          }
        }
        case "spiral": {
          const spiralAngle = angle + distFromCenter * 0.008 * progress
          const spiralDist = distFromCenter * (1 + progress * 0.1)
          return {
            x: cx + Math.cos(spiralAngle) * spiralDist,
            y: cy + Math.sin(spiralAngle) * spiralDist,
            r:
              0.6 +
              Math.sin(distFromCenter * 0.03) * 0.6 * progress,
          }
        }
        default:
          return { x: dot.homeX, y: dot.homeY, r: dot.baseRadius }
      }
    },
    []
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { w: width, h: height } = canvasSizeRef.current
    timeRef.current += 0.016
    const time = timeRef.current
    const mouse = mouseRef.current

    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const dots = dotsRef.current
    const activeIdx = activeIndexRef.current
    const activeItem = activeIdx >= 0 ? items[activeIdx] : null

    // Handle thinking → reveal transition
    if (thinkingRef.current) {
      const elapsed = time - thinkingStartRef.current
      if (elapsed >= thinkingDuration) {
        // Thinking done, reveal the pending item
        thinkingRef.current = false
        activeIndexRef.current = pendingIndexRef.current
        pendingIndexRef.current = -1
        formationProgressRef.current = 0
        textOpacityRef.current = 0
      }
    }

    // Re-read active item after possible thinking transition
    const currentActiveIdx = activeIndexRef.current
    const currentActiveItem = currentActiveIdx >= 0 ? items[currentActiveIdx] : null

    // Animate formation progress
    if (currentActiveItem && !thinkingRef.current) {
      formationProgressRef.current = Math.min(
        1,
        formationProgressRef.current + 0.006
      )
      textOpacityRef.current = Math.min(
        1,
        textOpacityRef.current + 0.015
      )
    } else if (!thinkingRef.current) {
      formationProgressRef.current = Math.max(
        0,
        formationProgressRef.current - 0.01
      )
      textOpacityRef.current = Math.max(
        0,
        textOpacityRef.current - 0.03
      )
    }

    const fProg = formationProgressRef.current
    const tAlpha = textOpacityRef.current

    // Calculate text bounds for dot clearing
    const tb = textBoundsRef.current
    const padding = 30

    // Spring physics
    const stiffness = 0.005
    const damping = 0.93

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]

      // Start with formation target or home
      let tx = dot.homeX
      let ty = dot.homeY
      let tr = dot.baseRadius

      if (currentActiveItem && fProg > 0) {
        const target = getFormationTarget(
          dot,
          currentActiveItem.formation,
          width,
          height,
          fProg
        )
        tx = target.x
        ty = target.y
        tr = target.r
      }

      // Text clearing: repel dots away from the text area
      if (tAlpha > 0.05 && tb.w > 0) {
        const tbCx = tb.x + tb.w / 2
        const tbCy = tb.y + tb.h / 2
        const halfW = tb.w / 2 + padding
        const halfH = tb.h / 2 + padding

        // Check if target position is inside text bounds
        const insideX = Math.abs(tx - tbCx) < halfW
        const insideY = Math.abs(ty - tbCy) < halfH

        if (insideX && insideY) {
          // Push dot to nearest edge of the clearing
          const distLeft = tx - (tbCx - halfW)
          const distRight = (tbCx + halfW) - tx
          const distTop = ty - (tbCy - halfH)
          const distBottom = (tbCy + halfH) - ty

          const minDist = Math.min(distLeft, distRight, distTop, distBottom)
          const clearStrength = tAlpha

          if (minDist === distLeft) {
            tx = (tbCx - halfW) - 2
          } else if (minDist === distRight) {
            tx = (tbCx + halfW) + 2
          } else if (minDist === distTop) {
            ty = (tbCy - halfH) - 2
          } else {
            ty = (tbCy + halfH) + 2
          }

          tx = dot.homeX + (tx - dot.homeX) * clearStrength
          ty = dot.homeY + (ty - dot.homeY) * clearStrength
          tr = Math.max(0.3, tr * (0.6 + 0.4 * (1 - clearStrength)))
        }
      }

      dot.targetX = tx
      dot.targetY = ty
      dot.targetRadius = tr

      // Spring
      const ax = (dot.targetX - dot.x) * stiffness
      const ay = (dot.targetY - dot.y) * stiffness
      dot.vx = (dot.vx + ax) * damping
      dot.vy = (dot.vy + ay) * damping
      dot.x += dot.vx
      dot.y += dot.vy
      dot.radius += (dot.targetRadius - dot.radius) * 0.025

      // Breathing
      const centerX = width / 2
      const centerY = height / 2
      const distFromCenter = Math.sqrt(
        (dot.homeX - centerX) ** 2 + (dot.homeY - centerY) ** 2
      )
      const breathWave = Math.sin(
        time * dot.breathSpeed + dot.phase + distFromCenter * 0.005
      )
      const breathRadius = dot.radius + breathWave * 0.15

      // Mouse proximity
      const mdx = mouse.x - dot.x
      const mdy = mouse.y - dot.y
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
      const mInfluence = Math.max(0, 1 - mDist / 80)

      const finalRadius = breathRadius + mInfluence * 1.5
      const alpha = 0.38 + breathWave * 0.05 + mInfluence * 0.3
      const grey = Math.round(100 + mInfluence * 80 + breathWave * 15)

      ctx.beginPath()
      ctx.arc(dot.x, dot.y, Math.max(0.2, finalRadius), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${grey}, ${grey}, ${grey}, ${alpha})`
      ctx.fill()
    }

    // All text centered in the grid
    const fontSize = isMobileRef.current ? 10 : 11
    const cx = width / 2
    const cy = height / 2
    const labelGap = fontSize * 2.5

    // "MUSINGS LATELY" — always centered, acts as eyebrow
    ctx.font = `${fontSize}px "Geist Mono", "SF Mono", "Menlo", monospace`
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.letterSpacing = "4px"

    const isShowingPhrase = currentActiveItem && tAlpha > 0.01 && !thinkingRef.current
    const isThinking = thinkingRef.current
    // Label always stays at the same position, slightly above center
    const labelY = cy - labelGap
    ctx.fillStyle = "rgba(80, 80, 80, 0.55)"
    ctx.fillText("MUSINGS LATELY", cx, labelY)

    // Measure label for clearing
    const labelWidth = ctx.measureText("MUSINGS LATELY").width
    let clearX = cx - labelWidth / 2
    let clearY = labelY - fontSize
    let clearW = labelWidth
    let clearH = fontSize * 2

    // Draw thinking dots OR the active phrase below the label
    if (isThinking) {
      // Three dots that match the grid dots exactly
      const elapsed = time - thinkingStartRef.current
      const gridSpacing = spacingRef.current
      const dotY = cy + fontSize * 0.8
      const dotRadius = 0.8 // same as grid baseRadius

      for (let d = 0; d < 3; d++) {
        const dotDelay = d * 0.3
        const dotAlpha = elapsed > dotDelay
          ? Math.min(0.38, (elapsed - dotDelay) * 0.6)
          : 0
        // Subtle breath matching the grid
        const breathWave = elapsed > dotDelay
          ? Math.sin((elapsed - dotDelay) * 2) * 0.15
          : 0

        ctx.beginPath()
        ctx.arc(
          cx + (d - 1) * gridSpacing,
          dotY,
          dotRadius + breathWave,
          0,
          Math.PI * 2
        )
        const grey = Math.round(120 + breathWave * 15)
        ctx.fillStyle = `rgba(${grey}, ${grey}, ${grey}, ${dotAlpha})`
        ctx.fill()
      }

      // Expand clear zone for thinking dots
      const thinkingWidth = gridSpacing * 4
      clearX = cx - thinkingWidth / 2
      clearY = labelY - fontSize
      clearW = thinkingWidth
      clearH = (dotY + fontSize * 2) - clearY
    } else if (isShowingPhrase && currentActiveItem) {
      const maxWidth = isMobileRef.current ? width * 0.75 : width * 0.5
      const phraseStartY = cy + fontSize * 0.5

      const layout = layoutText(
        ctx,
        currentActiveItem.phrase,
        fontSize,
        maxWidth,
        cx,
        phraseStartY
      )

      // Render phrase lines below the label
      ctx.font = `${fontSize}px "Geist Mono", "SF Mono", "Menlo", monospace`
      ctx.textBaseline = "top"
      ctx.textAlign = "center"
      ctx.letterSpacing = "4px"

      let widestLine = 0
      for (let l = 0; l < layout.lines.length; l++) {
        const lw = ctx.measureText(layout.lines[l]).width
        if (lw > widestLine) widestLine = lw
        ctx.fillStyle = `rgba(80, 80, 80, ${tAlpha * 0.55})`
        ctx.fillText(
          layout.lines[l],
          cx,
          phraseStartY + l * layout.lineHeight
        )
      }

      // Expand clear zone to include both label and phrase
      const phraseBottom = phraseStartY + layout.totalHeight
      const totalWidth = Math.max(labelWidth, widestLine)
      clearX = cx - totalWidth / 2
      clearY = labelY - fontSize
      clearW = totalWidth
      clearH = phraseBottom - clearY + fontSize
    }

    // Update text bounds for dot clearing
    textBoundsRef.current = {
      x: clearX,
      y: clearY,
      w: clearW,
      h: clearH,
    }

    if (!isShowingPhrase && !isThinking) {
      // Just clear around the centered label
      textBoundsRef.current = {
        x: cx - labelWidth / 2,
        y: cy - fontSize,
        w: labelWidth,
        h: fontSize * 2,
      }
    }

    ctx.restore()
    animFrameRef.current = requestAnimationFrame(animate)
  }, [items, getFormationTarget])

  // Setup and resize
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()
      isMobileRef.current = rect.width < 768
      canvasSizeRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      activeIndexRef.current = -1
      formationProgressRef.current = 0
      textOpacityRef.current = 0
      textBoundsRef.current = { x: 0, y: 0, w: 0, h: 0 }
      initDots(rect.width, rect.height)
    }

    resize()
    window.addEventListener("resize", resize)
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [initDots, animate])

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    const onMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener("mousemove", onMouse)
    canvas.addEventListener("touchmove", onTouch, { passive: true })
    canvas.addEventListener("mouseleave", onLeave)

    return () => {
      canvas.removeEventListener("mousemove", onMouse)
      canvas.removeEventListener("touchmove", onTouch)
      canvas.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  // Click/tap anywhere cycles through items
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleTap = () => {
      // Ignore taps while thinking
      if (thinkingRef.current) return

      const current = activeIndexRef.current
      const next = current + 1

      if (next >= items.length) {
        // Reset to idle
        activeIndexRef.current = -1
        textOpacityRef.current = 0
        formationProgressRef.current = 0
      } else {
        // Start thinking, then reveal
        thinkingRef.current = true
        thinkingStartRef.current = timeRef.current
        pendingIndexRef.current = next
        // Fade out current text immediately
        textOpacityRef.current = 0
        formationProgressRef.current = 0
      }
    }

    const onClick = () => handleTap()
    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      handleTap()
    }

    canvas.addEventListener("click", onClick)
    canvas.addEventListener("touchend", onTouchEnd)

    return () => {
      canvas.removeEventListener("click", onClick)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-crosshair select-none"
      style={{ height: "60vh" }}
      role="img"
      aria-label="An interactive dot grid. Tap or click to discover what I'm thinking about lately."
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
