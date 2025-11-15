/**
 * U3_api/successtraceApi.ts
 * * 专用于获取后端“成功追踪”路径的 API 模块。
 */

/**
 * 后端接口返回的追踪路径数据结构。
 * 假设它返回一个包含节点 ID 字符串的数组。
 */
export type BackendTracePath = string[];

/**
 * 从后端获取“成功”追踪路径。
 * @returns Promise<BackendTracePath> - 一个包含节点 ID 数组的 Promise。
 */
export async function fetchSuccessTracePath(): Promise<BackendTracePath> {
  // 
  // 替换为您的真实后端 API 地址
  // 
  const API_ENDPOINT = `https://api.your-backend.com/traces/success`;

  console.log(`[successtraceApi] 正在请求: ${API_ENDPOINT}`);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 如果需要，请在此处添加认证头
        // 'Authorization': 'Bearer YOUR_TOKEN' 
      }
    });

    if (!response.ok) {
      // 如果服务器返回非 2xx 状态码 (例如 404, 500), 抛出错误
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data: BackendTracePath = await response.json();

    // 验证返回的是否为数组
    if (!Array.isArray(data)) {
      throw new Error('API 返回的数据格式不是一个数组。');
    }

    // 假设后端直接返回一个字符串数组，例如:
    // ["FE_TRIGGER_UI", "FE_State_Idle", "FE_State_Requesting", ...]
    console.log(`[successtraceApi] 成功获取路径，共 ${data.length} 步`);
    return data;

  } catch (error: any) {
    console.error('[successtraceApi] fetchSuccessTracePath 失败:', error);
    // 将错误抛出，以便上层 (Orchestrator) 可以捕获并显示在日志中
    throw error;
  }
}