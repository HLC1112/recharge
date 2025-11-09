/**
 * 这是一个模拟的全局跟踪服务。
 * 它的职责是处理跟踪流程中的 API 调用模拟。
 */
const TraceSimulationService = {

  /**
   * P_1_C_104 组件会调用此方法。
   * @param nodeData 从 P_1_C_104 节点传递过来的数据
   */
  triggerApiCall(nodeData: any) {
    
    // --- 真正的模拟逻辑应该写在这里 ---
    
    console.log(`[TraceSimulationService] 正在触发 API 调用: ${nodeData.label || nodeData.id}`);
    
    // 示例：您可以返回一个 Promise 来模拟一个异步网络请求
    return Promise.resolve({
      status: 'success',
      message: `API call for ${nodeData.id} simulated.`,
      data: nodeData
    });
  }
  
  // 您未来可能还会添加其他服务方法
  // e.g., resetSimulation() { ... }
};

// 导出该服务，以便 P_1_C_104_U10_service.ts 可以导入它
export { TraceSimulationService };