import { ref, computed, onMounted, onUnmounted, CSSProperties } from 'vue';

declare const uni: any;

export function useViewportScaler(designWidth: number, designHeight: number) {
  // 1. 初始化屏幕尺寸为 null
  const viewportWidth = ref<number | null>(null);
  const viewportHeight = ref<number | null>(null); 

  onMounted(() => {
    const updateViewportSize = () => {
      try {
        const systemInfo = uni.getSystemInfoSync();
        viewportWidth.value = systemInfo.windowWidth;
        viewportHeight.value = systemInfo.windowHeight; 
      } catch (e) {
        console.error("获取系统信息失败", e);
      }
    };

    updateViewportSize();

    // 监听窗口大小变化
    const handleResize = (res: any) => {
        if (res.size) {
            viewportWidth.value = res.size.windowWidth;
            viewportHeight.value = res.size.windowHeight; 
        }
    };
    uni.onWindowResize(handleResize);

    // 3. 在组件卸载时移除监听器
    onUnmounted(() => {
      uni.offWindowResize(handleResize);
    });
  });

  // 4. 计算属性来生成样式
  const pageStyle = computed((): CSSProperties => {
    if (viewportWidth.value === null || viewportHeight.value === null) {
      return {
        width: `${designWidth}px`,
        height: `${designHeight}px`,
        visibility: 'hidden',
      };
    }
    const scaleX = viewportWidth.value / designWidth;
    const scaleY = viewportHeight.value / designHeight;
    const scale = Math.min(scaleX, scaleY);

    return {
      width: `${designWidth}px`,
      height: `${designHeight}px`,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`,
      visibility: 'visible',
    };
  });

  return {
    pageStyle,
  };
}