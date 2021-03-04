import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Logger } from '@/services/logger/logger.service';

@Component
export class LoggerMixin extends Vue {
	protected logger: Logger;

	beforeCreate(): void {
		if (!this.logger) {
			this.logger = new Logger();
		}
	}
}
