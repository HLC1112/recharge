<template>
  <P_1_C_85
    :modelValue="props.visible"
    @update:modelValue="handleClose"
    id="db-detail-modal"
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
        <P_1_C_88 @click="handleClose" />
      </div>

      <div
        style="
          flex-grow: 1;
          display: grid;
          /* [ ★ 修改 ★ ] 布局改为 30% C42/C43, 70% 根节点 (移除日志) */
          grid-template-rows: 3fr 7fr;
          overflow: hidden;
          padding-top: 1rem;
          position: relative;
"
      >
        
        <P_1_C_129
          :nodes="allInternalNodes"
          :links="linksForSvg"
          :highlighted-links="highlightedLinks"
          :node-container-id="'db-modal-grid'"
        />
        <div
          id="db-modal-grid"
          style="
            position: relative;
            overflow: auto;
            grid-row: 1; /* 保持在第 1 行 (30% 高度) */
            display: grid;
            grid-template-columns: 1fr 1fr; 
            grid-template-rows: 1fr;
            gap: 1rem;
            height: 100%;
          "
        >
         
          
          <div style="border: 1px dashed #e0e0e0; border-radius: 8px; overflow-y: auto; padding: 8px; position: relative; min-height: 0;">
            <P_1_C_42
              :nodes="mysqlNodes"
               :highlightedNodes="highlightedNodes"
              @node-click="handleNodeClick"
            />
          </div>
           
          <div style="border: 1px dashed #e0e0e0; border-radius: 8px; overflow-y: auto; padding: 8px; position: relative; min-height: 0;">
            <P_1_C_43
              :nodes="mongoNodes"
               :highlightedNodes="highlightedNodes"
              @node-click="handleNodeClick"
            />
          </div>
         </div>

        <div
          style="
            grid-row: 2; /* 放在第 2 行 (70% 高度) */
            border: 1px dashed #455a64;
            border-radius: 8px;
            overflow-y: auto;
            padding: 8px;
            position: relative;
            min-height: 0;
            margin-top: 1rem; /* 增加间距 */
          "
        >
          <P_1_C_89
             :nodes="rootNodes"
            :highlighted-nodes="highlightedNodes"
            @node-click="handleNodeClick"
          />
        </div>
        
         </div>
      </div>
  </P_1_C_85>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IProps } from './P_1_C_128_inside_Obj';
import { useControl } from './P_1_C_128_control';
import { useComponentStyles } from './P_1_C_128_inside_UI';
import { useContainerLogic } from './P_1_C_128_inside_utils';

// 基础组件
import P_1_C_85 from '../P_1_C_85/P_1_C_85.vue';
import P_1_C_86 from '../P_1_C_86/P_1_C_86.vue';
// [ ★ 移除 ★ ]
// import P_1_C_87 from '../P_1_C_87/P_1_C_87.vue';
import P_1_C_88 from '../P_1_C_88/P_1_C_88.vue';
// [ ★ 移除 ★ ]
// import P_1_C_90 from '../P_1_C_90/P_1_C_90.vue';
// import P_1_C_95 from '../P_1_C_95/P_1_C_95.vue';

// [修改] 导入 P_1_C_129 (画布), P_1_C_42, P_1_C_43, 和 P_1_C_89 (根网格)
import P_1_C_129 from '../P_1_C_129/P_1_C_129.vue';
import P_1_C_42 from '../P_1_C_42/P_1_C_42.vue';
import P_1_C_43 from '../P_1_C_43/P_1_C_43.vue';
import P_1_C_89 from '../P_1_C_89/P_1_C_89.vue'; // [新增] 导入 P_1_C_89

const props = defineProps<IProps>();
// [ ★ 修改 ★ ] 移除 'execute-flow'
const emit = defineEmits(['update:visible', 'internal-node-click']);

const {
  handleClose,
  // [ ★ 移除 ★ ]
  // handleExecuteFlow,
  // isExecuting,
  title,
  allInternalNodes,
   mysqlNodes,
  mongoNodes,
  rootNodes, // [新增] 获取 rootNodes
  linksForSvg,
  highlightedNodes,
  highlightedLinks,
  // [ ★ 移除 ★ ]
  // eventIn,
  // eventOut,
  // fsmState,
  // logEntries,
} = useControl(props, emit);

const { componentStyle } = useComponentStyles(props);
const { containerTag } = useContainerLogic(props);

// [修改] 冒泡 internal-node-click 事件
const handleNodeClick = (payload: { nodeId: string; nodeData: any }) => {
  console.log(`[P_1_C_128] 内部节点点击: ${payload.nodeId}`);
  emit('internal-node-click', payload);
};
</script>