import { TraceSimulationService } from '@/U10_service/TraceSimulationService';



export function getDSVLogHistory() {

  return TraceSimulationService.getLogHistory('dsv');

}