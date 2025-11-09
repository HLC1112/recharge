<template>
  <div :class="['flow-node', computedClass]">
    <div v-if="isDiamond" class="flow-node-content">
      <span v-html="text"></span>
    </div>
    
    <span v-else v-html="text"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// 定义组件接收的 props
const props = defineProps({
  /**
   * 节点上显示的文本 (来自CSV: 显示文本/内容)
   * 支持HTML，例如 'FE_APPFSM<br>(前端主脑)'
   */
  text: {
    type: String,
    default: 'Node Text'
  },
  /**
   * 节点的样式类 (来自CSV: 样式类)
   * 例如: 'trigger', 'fsmbrain', 'db_component'
   */
  styleClass: {
    type: String,
    default: 'default' // 默认为 'default'
  }
});

/**
 * 将传入的 prop 'styleClass' 转换为我们CSS中定义的类名。
 * 例如: prop 'trigger' => CSS class '.style-trigger'
 */
const computedClass = computed(() => {
  return props.styleClass ? `style-${props.styleClass}` : 'style-default';
});

/**
 * 定义哪些样式类是菱形。
 * 这对于模板中的条件渲染至关重要。
 */
const diamondShapes = [
  'maintaskevent', 
  'fedecision', 
  'event_node', 
  'doc_node', 
  'fail_event'
];

/**
 * 计算属性，检查当前节点是否为菱形。
 */
const isDiamond = computed(() => {
  return diamondShapes.includes(props.styleClass);
});
</script>

<style scoped>
/* ================================================================== */
/* 1. 基础节点样式 (Base Node Style) */
/* ================================================================== */
.flow-node {
  /* 基础布局和字体 */
  display: inline-block;
  padding: 10px 15px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  box-sizing: border-box;
  position: relative;
  word-break: break-word;
  
  /* 默认样式 (对应 'component' 类或 '无显式类') */
  background-color: #f5f5f5;
  border: 2px solid #616161;
  color: #333;
}

/* ================================================================== */
/* 2. 形状转换 (Shape Transformations) */
/* ================================================================== */

/* --- 菱形 (Diamond) --- */
/*
  适用于: maintaskevent, fedecision, event_node, doc_node, fail_event
  策略: 旋转外部容器，然后反向旋转内部内容
*/
.style-maintaskevent,
.style-fedecision,
.style-event_node,
.style-doc_node,
.style-fail_event {
  transform: rotate(45deg);
  /* 菱形通常需要固定宽高比，可以根据内容调整 */
  min-width: 100px;
  min-height: 100px;
  padding: 10px;
  display: flex; /* 用于内部居中 */
  align-items: center;
  justify-content: center;
}
.flow-node .flow-node-content {
  /* 反向旋转文本内容 */
  transform: rotate(-45deg);
  max-width: 140%; /* 允许内容稍微超出旋转前的方框 */
}

/* --- 圆柱体/数据库 (Cylinder) --- */
/*
  适用于: cache, ufstore, uistore, db_component
  策略: 使用 border-radius 来模拟椭圆顶部和底部
*/
.style-cache,
.style-ufstore,
.style-uistore,
.style-db_component {
  /* 一个简单的CSS模拟。
    第一个值是水平半径 (50% = 椭圆)
    第二个值是垂直半径 (15px = 椭圆的高度)
  */
  border-radius: 50% / 15px;
}

/* --- 平行四边形 (Parallelogram) --- */
/*
  适用于: httpevent
  策略: 使用 transform: skew()
*/
.style-httpevent {
  transform: skew(-20deg);
}

/* ================================================================== */
/* 3. 样式类定义 (Style Class Definitions) */
/* ================================================================== */

/* --- 默认 (用于 '无显式类' 或 'component') --- */
.style-default,
.style-component {
  background-color: #f5f5f5;
  border-color: #616161;
  color: #333;
  border-style: solid;
}

/* --- trigger --- */
.style-trigger {
  background-color: #fff;
  border-color: #ff6600;
  color: #ff6600;
  border-width: 2px;
  border-style: solid;
}

/* --- fsmbrain --- */
.style-fsmbrain {
  background-color: #fce1e1;
  border-color: #d17c7c;
  border-width: 2px;
  border-style: solid;
  color: #333; /* 继承默认 */
}

/* --- feinfra --- */
.style-feinfra {
  background-color: #fff8e1;
  border-color: #b38600;
  color: #b38600;
  border-width: 2px;
  border-style: solid;
}

/* --- festate --- */
.style-festate {
  background-color: #fff3e0;
  border-color: #ff8f00;
  color: #333;
  border-width: 2px;
  border-style: solid;
}

/* --- endstate --- */
.style-endstate {
  background-color: #e6ffe6;
  border-color: #006600;
  color: #333;
  border-style: solid;
}

/* --- blockstate --- */
.style-blockstate {
  background-color: #ffe6e6;
  border-color: #cc0000;
  color: #333;
  border-style: solid;
}

/* --- cache (形状已在上方处理) --- */
.style-cache {
  background-color: #fff3e0;
  border-color: #b38600;
  color: #333;
  border-style: solid;
}

/* --- ufstore (形状已在上方处理) --- */
.style-ufstore {
  background-color: #663399;
  border-color: #330066;
  color: #ffffff;
  border-style: solid;
}

/* --- uistore (形状已在上方处理) --- */
.style-uistore {
  background-color: #e3d4f5;
  border-color: #a486c9;
  color: #333;
  border-style: solid;
}

/* --- appevent --- */
.style-appevent {
  background-color: #e6f3ff;
  border-color: #0066cc;
  color: #333;
  border-style: solid;
}

/* --- httpevent (形状已在上方处理) --- */
.style-httpevent {
  background-color: #f5f5f5;
  border-color: #555;
  color: #333;
  border-style: solid;
}

/* --- beinfra --- */
.style-beinfra {
  background-color: #e3f2fd;
  border-color: #004080;
  color: #004080;
  border-width: 2px;
  border-style: solid;
}

/* --- maintaskevent (形状已在上方处理) --- */
.style-maintaskevent {
  background-color: #fff;
  border-color: #cc0000;
  color: #cc0000;
  border-width: 2px;
  border-style: solid;
}

/* --- da_orchestrator --- */
.style-da_orchestrator {
  background-color: #e0f2f1;
  border-color: #004d40;
  color: #004d40;
  border-width: 2.5px;
  border-style: solid;
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- fsm_state --- */
.style-fsm_state {
  background-color: #fff0f5;
  border-color: #d81b60;
  color: #d81b60;
  border-width: 2.5px;
  border-style: solid;
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- bus --- */
.style-bus {
  background-color: #fafafa;
  border-color: #455a64;
  color: #263238;
  border-style: dashed; /* stroke-dasharray:5 4 */
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- dsv --- */
.style-dsv {
  background-color: #fff0f5;
  border-color: #d81b60;
  color: #d81b60;
  border-width: 2px;
  border-style: solid;
}

/* --- dc_component --- */
.style-dc_component {
  background-color: #e0f7fa;
  border-color: #006064;
  color: #333;
  border-width: 2px;
  border-style: solid;
}

/* --- l_component --- */
.style-l_component {
  background-color: #f9fbe7;
  border-color: #827717;
  color: #333;
  border-width: 2px;
  border-style: solid;
}

/* --- da0_component --- */
.style-da0_component {
  background-color: #e3f2fd;
  border-color: #0d47a1;
  color: #333;
  border-width: 2px;
  border-style: solid;
}

/* --- adapter_component --- */
.style-adapter_component {
  background-color: #f3e5f5;
  border-color: #4a148c;
  color: #333;
  border-width: 2px;
  border-style: solid;
}

/* --- repo_iface --- */
.style-repo_iface {
  background-color: #fffde7;
  border-color: #8d6e63;
  color: #5d4037;
  border-width: 2px;
  border-style: solid;
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- event_node (形状已在上方处理) --- */
.style-event_node {
  background-color: #fff;
  border-color: #ff8c00;
  color: #d2691e;
  border-width: 2px;
  border-style: solid;
}

/* --- doc_node (形状已在上方处理) --- */
.style-doc_node {
  background-color: #e6ffe6;
  border-color: #2e8b57;
  color: #2e8b57;
  border-width: 2px;
  border-style: solid;
}

/* --- fail_event (形状已在上方处理) --- */
.style-fail_event {
  background-color: #ffe6e6;
  border-color: #cc0000;
  color: #b30000;
  border-width: 2px;
  border-style: solid;
}

/* --- repo_impl --- */
.style-repo_impl {
  background-color: #fff3e0;
  border-color: #6d4c41;
  color: #4e342e;
  border-width: 2px;
  border-style: solid;
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- db_component (形状已在上方处理) --- */
.style-db_component {
  background-color: #e0e0e0;
  border-color: #333;
  color: #333;
  border-width: 2px;
  border-style: solid;
}

/* --- dat_component --- */
.style-dat_component {
  background-color: #fff8e1;
  border-color: #b38600;
  color: #b38600;
  border-width: 2px;
  border-style: solid;
}

/* --- dlq --- */
.style-dlq {
  background-color: #ffe6e6;
  border-color: #cc0000;
  color: #b30000;
  border-width: 2px;
  border-style: solid;
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- monitor --- */
.style-monitor {
  background-color: #fffbe6;
  border-color: #8d6e63;
  color: #5d4037;
  border-width: 2px;
  border-style: solid;
  border-radius: 8px; /* rx:8,ry:8 */
}

/* --- note --- */
.style-note {
  background-color: #eef7ff;
  border-color: #1976d2;
  color: #1976d2;
  border-style: dashed; /* stroke-dasharray:4 3 */
  border-radius: 6px; /* rx:6,ry:6 */
}

/* --- fedecision (形状已在上方处理) --- */
.style-fedecision {
  background-color: #fff;
  border-color: #ff8f00;
  color: #333;
  border-width: 2px;
  border-style: solid;
}
</style>