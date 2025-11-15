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

			<P_1_C_14 v-model:visible="showFileDialog" @load-module="handleLoadModule" />

			<P_1_C_24
				:nodes="orchestrator.nodes"
				:links="orchestrator.links"
				:highlighted-nodes="[orchestrator.activeNodeId, orchestrator.errorNodeId].filter((id): id is string => Boolean(id))"
				:highlighted-links="[orchestrator.activeEdge, orchestrator.errorEdge].filter((id): id is string => Boolean(id))"
				@node-click="onNodeClick"
			/>

			<P_1_C_46
				:nodes="orchestrator.nodes"
				:links="orchestrator.links.map((l) => ({ id: `edge-${l.from}-to-${l.to}`, source: l.from, target: l.to }))"
				:highlighted-links="[orchestrator.activeEdge, orchestrator.errorEdge].filter((id): id is string => Boolean(id))"
				:dsv-node-ids="dsvNodeIds"
				:db-node-ids="dbNodeIds"
				:is-dsv-modal-open="showDsvModal"
				:is-db-modal-open="showDbModal"
			/>
		</div>

		<aside class="side-panel" v-show="orchestrator.sidePanelOpen">
			<div class="panel-title">运行日志</div>
			<div class="logs">
				<div v-for="(l, i) in orchestrator.logs" :key="i">{{ l }}</div>
			</div>
		</aside>

		<P_1_C_84
			v-if="showDsvModal && dsvModalData"
			:visible="showDsvModal"
			:dsvNodeData="dsvModalData"
			:flowState="modalFlowState"
			@update:visible="onCloseDsvModal"
			@execute-flow="() => orchestrator.addLog('DSV 流程执行... (未实现)', 'warn')"
			@internal-node-click="onNodeClick"
		/>

		<P_1_C_128 v-if="showDbModal && dbModalData" :visible="showDbModal" :dsvNodeData="dbModalData" :flowState="modalFlowState" @update:visible="onCloseDbModal" />
	</div>
</template>

<script setup lang="ts">
	import P_1_C_24 from "../U2_components/P_1/P_1_C_24/P_1_C_24.vue";
	import P_1_C_46 from "../U2_components/P_1/P_1_C_46/P_1_C_46.vue";
	import P_1_C_6 from "../U2_components/P_1/P_1_C_6/P_1_C_6.vue";
	import P_1_C_14 from "../U2_components/P_1/P_1_C_14/P_1_C_14.vue";
	import P_1_C_84 from "../U2_components/P_1/P_1_C_84/P_1_C_84.vue";
	import P_1_C_128 from "../U2_components/P_1/P_1_C_128/P_1_C_128.vue";

	import { useP1Page } from "../U7_utils/useP1Page";
	import { watch, computed } from "vue";
	import type { DsvFlowState } from "../U2_components/P_1/P_1_C_84/P_1_C_84_inside_Obj";

	const {
		showFileDialog,
		isTracing,
		traceId,
		orchestrator,
		onNodeClick,
		handleStartTrace,
		handleLoadModule,
		openModuleDialog,
		onUpdateTraceId,
		showDsvModal,
		dsvModalData,
		onCloseDsvModal,
		showDbModal,
		dbModalData,
		onCloseDbModal,

		dsvNodeIds,
		dbNodeIds,
	} = useP1Page();

	// [ ★★★ 核心修改 ★★★ ]
	const modalFlowState = computed((): DsvFlowState => {
		return {
			status: isTracing.value ? "running" : "idle",

			highlightedNodes: [orchestrator.activeNodeId, orchestrator.errorNodeId].filter(Boolean) as string[],
			highlightedLinks: [orchestrator.activeEdge, orchestrator.errorEdge].filter(Boolean) as string[],

			// [ ★ 移除 ★ ]
			// fsmState: orchestrator.activeNodeId || '?',
			// logs: orchestrator.logs.slice(-5),
			// eventIn: orchestrator.activeNodeId ? { id: orchestrator.activeNodeId } : undefined,
			// eventOut: orchestrator.activeEdge ? { id: orchestrator.activeEdge } : undefined,
		};
	});
	// [ ★★★ 修正结束 ★★★ ]

	watch(
		() => orchestrator.ready,
		(newVal) => {
			console.log(`[P_1] orchestrator.ready 更新: ${newVal}`);
		},
		{ immediate: true }
	);
</script>

<style scoped>
	.page-root {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #0b1120;
	}
	.canvas-holder {
		position: absolute;
		inset: 0;
	}

	.side-panel {
		position: absolute;
		right: 0;
		top: 0;
		width: 360px;
		height: 100%;
		background: rgba(2, 6, 23, 0.9);
		border-left: 1px solid #1f2a44;
		padding: 12px;
		overflow: auto;
		z-index: 999;
	}
	.panel-title {
		color: #67e8f9;
		font-weight: 700;
		margin-bottom: 8px;
	}
	.logs {
		font-size: 12px;
		color: #cbd5e1;
		line-height: 1.4;
	}
</style>
