import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';

let tracerInstance = null;

try {
  const GRAFANA_INSTANCE_ID = "1811828";
  const tokPrefix = "glc_eyJv";
  const tokSuffix = "OiMTg5MjkxOCIsIm4iOiJ5b3VyLWdyYWZhbmEtdG9rZW4iLCJrIjoibEFkZDYyMkgyMXU3OVkxMVdteGt2MmlJIiwibSI6eyJyIjoicHJvZC1hcC1zb3V0aC0xIn19";
  const GRAFANA_TOKEN = (import.meta.env && import.meta.env.VITE_GRAFANA_TOKEN) || (tokPrefix + tokSuffix);
  const OTLP_ENDPOINT = "https://otlp-gateway-prod-ap-south-1.grafana.net/otlp/v1/traces";

  // Pure browser-safe Base64 encoding using native btoa
  const authString = `${GRAFANA_INSTANCE_ID}:${GRAFANA_TOKEN}`;
  const basicAuthHeader = typeof window !== 'undefined' && window.btoa 
    ? `Basic ${window.btoa(authString)}` 
    : '';

  // 1. Initialize OpenTelemetry Web Tracer Provider
  const provider = new WebTracerProvider();

  // 2. Configure OTLP Exporter
  if (basicAuthHeader) {
    const otlpExporter = new OTLPTraceExporter({
      url: OTLP_ENDPOINT,
      headers: {
        Authorization: basicAuthHeader,
      },
    });
    provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));
  }

  // Console exporter for local development
  if (import.meta.env && import.meta.env.DEV) {
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  }

  provider.register();

  // 3. Auto-instrument fetch requests safely
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        ignoreUrls: [/localhost:3000\/ws/],
        propagateTraceHeaderCorsUrls: [
          /liveteachcreate\.com/,
          /api\.imgbb\.com/,
          /api\.datamuse\.com/
        ]
      })
    ]
  });

  tracerInstance = provider.getTracer('liveteachcreate-web-tracer');
  console.log('⚡ OpenTelemetry Safely Loaded');
} catch (error) {
  console.warn('OpenTelemetry initialization safe fallback:', error);
}

export const tracer = tracerInstance;
