<template>
  <P_1_C_85
    :modelValue="props.visible"
    @update:modelValue="handleClose"
    id="dsv-detail-modal"
  >
    <div
       style="
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      "
    >
       <div
        style="
           display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid #444;
           position: relative;
          z-index: 80;
        "
      >
         <P_1_C_86 :title="title" />
        <P_1_C_87 :disabled="isExecuting" @click="handleExecuteFlow" />
        <P_1_C_88 @click="handleClose" />
      </div>

      <div
        style="
           flex-grow: 1;
           display: grid;
          /* [ ★ 核心修改 ★ ] 更改为三行等高，并添加 1rem 的行间距 */
          grid-template-rows: 1.5fr 1fr 1fr;
          gap: 1rem;
          overflow: hidden;
          padding-top: 1rem;
          position: relative;
 "
      >
        <P_1_C_96
           :nodes="allInternalNodes"
           :links="linksForSvg"
           :highlighted-links="highlightedLinks"
           :node-container-id="'dsv-detail-grid'"
        />

        <div
          id="dsv-detail-grid"
           style="
            position: relative;
            overflow: hidden;
            grid-row: 1;
            display: grid;
            grid-template-rows: 3fr 7fr;
            gap: 1rem;
            height: 100%;
            min-height: 0; /* [ ★ 新增 ★ ] 确保 flex/grid 布局在缩小
时表现正常 */
          "
        >
          <div
             style="
              grid-row: 1;
              border: 1px dashed #d81b60;
              border-radius: 8px;
              overflow-y: auto;
              padding: 8px;
              position: relative;
              min-height: 0;
            "
          >
             <P_1_C_127
               :nodes="nodesForFsmContainer"
               :highlightedNodes="highlightedNodes"
               @node-click="handleNodeClick"
             />
           </div>

          <div
            style="
               grid-row: 2;
              border: 1px dashed #455a64;
              border-radius: 8px;
              overflow-y: auto;
              padding: 8px;
              position: relative;
              min-height: 0;
            "
          >
          <P_1_C_89
             :nodes="nodesForRootGrid"
             :highlighted-nodes="highlightedNodes"
             :nodesForDbsContainer="
                nodesForDbsContainer
              "
              :nodesForEventBusContainer="
                nodesForEventBusContainer
              "
              @node-click="handleNodeClick"
            />
          </div>
        </div>

        <div
           style="
            grid-row: 2;
            border-radius: 8px;
            overflow-y: auto;
            padding: 8px;
            position: relative;
            min-height: 0;
            /* [ ★ 移除 ★ ] 移除 margin-top，使用 gap 代替 */
            /* margin-top: 1rem; */
          "
        >
          <P_1_C_130
             :nodeData="dbsContainerNodeData"
             :nodes="nodesForDbsContainer"
             :highlightedNodes="highlightedNodes"
             :isHighlighted="isNodeHighlighted(dbsContainerNodeData.id)"
             @node-click="handleNodeClick"
          />
        </div>

        <div
          style="
            grid-row: 3;
            position: relative;
            padding: 8px 0;
            min-height: 0; /* [ ★ 新增 ★ ] */
            /* [ ★ 移除 ★ ] 移除 margin-top，使用 gap 代替 */
            /* margin-top: 1rem; */
          "
        >
          <P_1_C_139
            :nodeData="eventBusNodeData"
            :nodes="nodesForEventBusContainer"
            :highlightedNodes="highlightedNodes"
            :isHighlighted="isNodeHighlighted(eventBusNodeData.id)"
            @node-click="handleNodeClick"
          />
        </div>

        </div>

    </div>
  </P_1_C_85>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps, DsvNode } from './P_1_C_84_inside_Obj';
import { useControl } from './P_1_C_84_control';
import { useComponentStyles } from './P_1_C_84_inside_UI';
import { useContainerLogic } from './P_1_C_84_inside_utils';

import P_1_C_85 from '../P_1_C_85/P_1_C_85.vue';
import P_1_C_86 from '../P_1_C_86/P_1_C_86.vue';
import P_1_C_87 from '../P_1_C_87/P_1_C_87.vue';
import P_1_C_88 from '../P_1_C_88/P_1_C_88.vue';
import P_1_C_89 from '../P_1_C_89/P_1_C_89.vue';
// import P_1_C_90 from '../P_1_C_90/P_1_C_90.vue'; // 已移除
// import P_1_C_95 from '../P_1_C_95/P_1_C_95.vue'; // 已移除
import P_1_C_96 from '../P_1_C_96/P_1_C_96.vue';

import P_1_C_127 from '../P_1_C_127/P_1_C_127.vue';
import P_1_C_130 from '../P_1_C_130/P_1_C_130.vue';
import P_1_C_139 from '../P_1_C_139/P_1_C_139.vue';

const props = defineProps<IProps>();
const emit = defineEmits(['update:visible', 'execute-flow', 'internal-node-click']);

const {
   handleClose,
  handleExecuteFlow,
  isExecuting,
  title,
  allInternalNodes,
  nodesForFsmContainer,
  nodesForDbsContainer,
  dbsContainerNodeData,
  isNodeHighlighted,
  nodesForRootGrid,
  eventBusNodeData,
  nodesForEventBusContainer,
  linksForSvg,
  highlightedNodes,
  highlightedLinks,
} = useControl(props, emit); // 移除了 eventIn, eventOut, fsmState, logEntries

const { componentStyle } = useComponentStyles(props);
const { containerTag } = useContainerLogic(props);

const handleNodeClick = (payload: { nodeId: string; nodeData: any }) => {
  console.log(`[P_1_C_84] 内部节点点击: ${payload.nodeId}`);
  emit('internal-node-click', payload);
};
</script>