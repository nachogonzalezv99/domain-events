export abstract class Monitoring {
  abstract incrementCounter(times: number): void;
  abstract incrementGauge(times: number): void;
  abstract decrementGauge(times: number): void;
  abstract observeHistogram(value: number, labels: string[]): void;
}
