import { computed, onBeforeUnmount } from 'vue'
import type { IProps } from './P_1_C_7_inside_Obj'

/** 仅在这里实现拖拽逻辑，目标是 #trace-simulator */
export function useContainer(_props: IProps) {
  const tag = computed(() => 'div')

  let isDragging = false
  let startX = 0
  let startY = 0
  let baseX = 0
  let baseY = 0
  let raf = 0

  const getTarget = () => document.getElementById('trace-simulator') as HTMLElement | null
  const parseCurrent = (el: HTMLElement) => {
    const dx = Number(el.dataset.dx || '0')
    const dy = Number(el.dataset.dy || '0')
    return { dx, dy }
  }
  const apply = (el: HTMLElement, x: number, y: number) => {
    el.style.transform = `translate(${x}px, ${y}px)`
    el.dataset.dx = String(x)
    el.dataset.dy = String(y)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const el = getTarget()
    if (!el) return
    const dx = baseX + (e.clientX - startX)
    const dy = baseY + (e.clientY - startY)
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => apply(el, dx, dy))
  }

  const onMouseUp = () => {
    if (!isDragging) return
    isDragging = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  /** 提供给 P_1_C_8 句柄调用 */
  const onDragStart = (e: MouseEvent) => {
    const el = getTarget()
    if (!el) return
    el.style.willChange = 'transform'
    const { dx, dy } = parseCurrent(el)
    baseX = dx
    baseY = dy
    startX = e.clientX
    startY = e.clientY
    isDragging = true
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    e.preventDefault()
    e.stopPropagation()
  }

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    cancelAnimationFrame(raf)
  })

  return { tag, onDragStart }
}
