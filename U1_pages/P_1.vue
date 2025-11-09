<!-- 文件：U1_pages/P_1.vue -->
<template>
  <div class="page-root">
    <div class="canvas-holder">
      <P_1_C_6
        :is-tracing="isTracing"
        :trace-id="traceId"
        :module-ready="orchestrator.ready"
        @update:traceId="onUpdateTraceId"
        @start-trace="handleStartTrace"
        @open-module-loader="openModuleDialog"
      />

      <!-- 文件选择弹窗 -->
      <P_1_C_14 v-model:visible="showFileDialog" @load-module="handleLoadModule" />

      <P_1_C_24
        :nodes="orchestrator.nodes"
        :links="orchestrator.links"
        :highlighted-nodes="[orchestrator.activeNodeId, orchestrator.errorNodeId].filter(Boolean)"
        :highlighted-links="[orchestrator.activeEdge, orchestrator.errorEdge].filter(Boolean)"
        @node-click="onNodeClick"
      />

      <P_1_C_46
              :nodes="orchestrator.nodes"  :links="orchestrator.links"
              :active-edge="orchestrator.activeEdge"
              :error-edge="orchestrator.errorEdge"
            />
    </div>

    <aside class="side-panel" v-show="orchestrator.sidePanelOpen">
      <div class="panel-title">运行日志</div>
      <div class="logs">
        <div v-for="(l, i) in orchestrator.logs" :key="i">{{ l }}</div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import P_1_C_24 from '../U2_components/P_1/P_1_C_24/P_1_C_24.vue'
import P_1_C_46 from '../U2_components/P_1/P_1_C_46/P_1_C_46.vue'
import P_1_C_6  from '@/U2_components/P_1/P_1_C_6/P_1_C_6.vue'
import P_1_C_14 from '../U2_components/P_1/P_1_C_14/P_1_C_14.vue'

import { useP1Page } from '../U7_utils/useP1Page'

const {
  showFileDialog, isTracing, traceId, orchestrator,
  onNodeClick, handleStartTrace, handleLoadModule, openModuleDialog, onUpdateTraceId,
} = useP1Page()
</script>

<style scoped>
.page-root { position: relative; width: 100vw; height: 100vh; overflow: hidden; background: #0b1120; }
.canvas-holder { position: absolute; inset: 0; }

.side-panel {
  position: absolute; right: 0; top: 0; width: 360px; height: 100%;
  background: rgba(2, 6, 23, .9); border-left: 1px solid #1f2a44;
  padding: 12px; overflow: auto; z-index: 999;
}
.panel-title { color: #67e8f9; font-weight: 700; margin-bottom: 8px; }
.logs { font-size: 12px; color: #cbd5e1; line-height: 1.4; }
</style>
