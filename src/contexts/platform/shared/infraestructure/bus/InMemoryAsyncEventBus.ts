import { Service } from "diod";
import { DomainEvent } from "../../domain/bus/DomainEvent";
import { EventBus } from "../../domain/bus/EventBus";
import { IDomainEventSubscriber } from "../../domain/bus/IDomainEventSubscriber";

@Service()
export class InMemoryAsyncEventBus implements EventBus {
	private readonly subscriptions: Map<string, Function[]> = new Map();

	constructor(subscribers: IDomainEventSubscriber<DomainEvent>[]) {
		this.registerSubscribers(subscribers);
	}

	async publish(events: DomainEvent[]): Promise<void> {
		const executions: unknown[] = [];

		events.forEach((event) => {
			const subscribers = this.subscriptions.get(event.eventName);

			if (subscribers) {
				subscribers.forEach((subscriber) => {
					executions.push(subscriber(event));
				});
			}
		});

		await Promise.all(executions).catch((error) => {
			console.error("Executing subscriptions:", error);
		});
	}

	private registerSubscribers(subscribers: IDomainEventSubscriber<DomainEvent>[]): void {
		subscribers.forEach((subscriber) => {
			subscriber.subscribedTo().forEach((event) => {
				this.subscribe(event.EVENT_NAME, subscriber);
			});
		});
	}

	private subscribe(eventName: string, subscriber: IDomainEventSubscriber<DomainEvent>): void {
		const currentSubscriptions = this.subscriptions.get(eventName);
		const subscription = subscriber.on.bind(subscriber);

		if (currentSubscriptions) {
			currentSubscriptions.push(subscription);
		} else {
			this.subscriptions.set(eventName, [subscription]);
		}
	}
}