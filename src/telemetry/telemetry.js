import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';

// 1. Initialize OpenTelemetry Web Tracer Provider
const provider = new WebTracerProvider();

// 2. Configure OTLP Exporter (Outputs to Grafana / OpenTelemetry Collector or Console)
const otlpExporter = new OTLPTraceExporter({
  url: 'https://otlp-gateway-prod-us-east-0.grafana.net/v1/traces', // Default Grafana OTLP Endpoint
  headers: {},
});

// Fallback Console exporter for local development monitoring
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Register provider globally
provider.register();

// 3. Auto-instrument all fetch() API calls (Seologic, ImgBB, SendEmail)
registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      ignoreUrls: [/localhost:3000\/ws/], // Ignore dev HMR websockets
      propagateTraceHeaderCorsUrls: [
        /liveteachcreate\.com/,
        /api\.imgbb\.com/,
        /api\.datamuse\.com/
      ]
    })
  ]
});

console.log('⚡ OpenTelemetry Observability Initialized for Liveteachcreate Platform');

export const tracer = provider.getTracer('liveteachcreate-web-tracer');
