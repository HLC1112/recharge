<template>
  <div :style="componentStyle" :class="containerClasses" data-container-id="InternalEventBus">
    <span :style="planeTitleStyle">Internal EventBus</span>
    <div :style="nodeContainerStyle">
      <div v-for="node in renderedNodes" :key="node.id" :id="node.id" :style="[nodeStyle, node.isHighlighted ? { filter: 'drop-shadow(0 0 6px #f59e0b)' } : {}]">
        <component :is="pickComp(node)" v-bind="propsFor(node)" @click="handleNodeClick(node.id, node)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, withDefaults } from 'vue'
import { IProps, INode } from './P_1_C_139_inside_Obj'
import { useControl } from './P_1_C_139_control'
import { useComponentStyles, useChildStyles } from './P_1_C_139_inside_UI'
import P_1_C_124 from '../P_1_C_124/P_1_C_124.vue'
import P_1_C_117 from '../P_1_C_117/P_1_C_117.vue'
import P_1_C_118 from '../P_1_C_118/P_1_C_118.vue'
import P_1_C_133 from '../P_1_C_133/P_1_C_133.vue'

const props = withDefaults(defineProps<IProps>(), { nodes: () => [], highlightedNodes: () => [] })
const emit = defineEmits(['node-click'])

const { componentStyle, containerClasses } = useComponentStyles(props)
const { planeTitleStyle, nodeContainerStyle, nodeStyle } = useChildStyles(props)
const { handleNodeClick, renderedNodes } = useControl(props, emit)

const compMap: Record<string, any> = { P_1_C_117: P_1_C_117, P_1_C_118: P_1_C_118, P_1_C_133: P_1_C_133, P_1_C_124: P_1_C_124 }

function pickComp(node: INode) {
  const id = String(node.componentId || '')
  if (id && compMap[id]) return compMap[id]
  const sc = String(node.styleClass || node.type || '')
  if (sc === 'doc_node') return P_1_C_133
  if (sc === 'fail_event') return P_1_C_118
  if (sc === 'event_node' || sc === 'appevent') return P_1_C_117
  return P_1_C_124
}

function toNodeData(node: INode) {
  return { id: node.id, label: node.label || node.id, type: String(node.styleClass || node.type || 'event_node') }
}

function propsFor(node: INode) {
  const sc = String(node.styleClass || node.type || '')
  if (sc === 'doc_node') return { nodeData: toNodeData(node), isHighlighted: node.isHighlighted }
  if (sc === 'fail_event') return { nodeData: toNodeData(node), isHighlighted: node.isHighlighted, isFailure: true }
  if (sc === 'event_node' || sc === 'appevent') return { nodeData: toNodeData(node), isHighlighted: node.isHighlighted }
  return { text: node.label || node.id, styleClass: sc || 'default' }
}
</script>