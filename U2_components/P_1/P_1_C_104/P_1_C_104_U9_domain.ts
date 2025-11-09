import { TracingDomain } from '@/U9_domain/Tracing';



export function getNodeTraceData(nodeId: string) {

  return TracingDomain.getNodeData(nodeId);

}