// /U5_router/U5_router.ts
import { navigationMap } from './U5_map';

/**
 * 将一个对象转换成 URL 查询字符串的辅助函数
 */
function objectToQueryString(obj?: Record<string, any>): string {
  if (!obj || Object.keys(obj).length === 0) {
    return '';
  }
  const queryString = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
  return `?${queryString}`;
}

/**
 * 全局应用导航函数
 */
export function appNavigate(componentId: string, params?: Record<string, any>) {
  const targetPageId = navigationMap[componentId];

  if (!targetPageId) {
    console.warn(`[U5_router] WARN: 未在 navigationMap 中找到组件ID "${componentId}" 的导航目标。`);
    return;
  }

  if (targetPageId === 'GO_BACK') {
    // --- [DEBUG LOG 3] ---
    console.log(`[U5_router] 3. 路由解析为 "GO_BACK"，正在执行 uni.navigateBack() ...`);
    // --- [DEBUG LOG 3] ---
    uni.navigateBack();
  } else if (targetPageId === 'EXTERNAL_LINK') {
    console.warn(`[U5_router] WARN: 组件 "${componentId}" 触发了一个外部链接/弹窗操作。请自行实现。`);
  } else {
    const queryString = objectToQueryString(params);
    const url = `/U1_pages/${targetPageId}${queryString}`;

    console.log(`[U5_router] 3. 路由解析为 "${targetPageId}"，正在导航到: ${url}`); 

    uni.navigateTo({
      url: url,
      fail: (err) => {
        console.error(`[U5_router] ERROR: 导航到 ${url} 失败`, err);
      }
    });
  }
}