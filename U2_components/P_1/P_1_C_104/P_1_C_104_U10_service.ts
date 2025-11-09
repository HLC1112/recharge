import { TraceSimulationService } from '@/U8_config/TraceSimulationService';



export function simulateApiCall(nodeData: any) {

  return TraceSimulationService.triggerApiCall(nodeData);

}