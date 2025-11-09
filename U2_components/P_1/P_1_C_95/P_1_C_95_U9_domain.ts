import { TracingDomain } from '@/U9_domain/Tracing';



export function subscribeToDSVLogs(callback: (logEntry: any) => void) {

  // B-295: Listen for 'dsvInternalLog' event

  TracingDomain.subscribe('dsvInternalLog', callback);

}