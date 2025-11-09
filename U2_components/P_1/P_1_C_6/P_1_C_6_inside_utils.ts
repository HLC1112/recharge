import { computed, onBeforeUnmount } from 'vue';
import type { IProps } from './P_1_C_6_inside_Obj';

/**
 * 仅在这里实现拖拽逻辑
 * 拖拽目标：P_1_C_7 的根节点（id = 'trace-simulator'）
 * 触发源：P_1_C_8 发出的 @drag-start 事件
 */
export function useContainer(_props: IProps) {
  const tag = computed(() => 'div');

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0;   // 已累计的 translateX
  let baseY = 0;   // 已累计的 translateY
  let raf = 0;

  const getTarget = (): HTMLElement | null =>
    document.getElementById('trace-simulator');

  const parseCurrent = (el: HTMLElement) => {
    const dx = Number(el.dataset.dx || '0');
    const dy = Number(el.dataset.dy || '0');
    return { dx, dy };
  };

  const apply = (el: HTMLElement, x: number, y: number) => {
    // 用 transform 不影响布局
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.dataset.dx = String(x);
    el.dataset.dy = String(y);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const el = getTarget();
    if (!el) return;
    const dx = baseX + (e.clientX - startX);
    const dy = baseY + (e.clientY - startY);
    // 使用 rAF 降抖
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => apply(el, dx, dy));
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  /** 供 P_1_C_8 调用 */
  const onDragStart = (e: MouseEvent) => {
    const el = getTarget();
    if (!el) {
      console.warn('[P_1_C_6] 未找到追踪器容器 #trace-simulator');
      return;
    }
    // 保证在最上层
    el.style.pointerEvents = 'auto';
    el.style.willChange = 'transform';

    const { dx, dy } = parseCurrent(el);
    baseX = dx;
    baseY = dy;
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    e.preventDefault();
    e.stopPropagation();
  };

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    cancelAnimationFrame(raf);
  });

  return { tag, onDragStart };
}
