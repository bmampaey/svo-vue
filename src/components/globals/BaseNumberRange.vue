<template>
	<b-form-group :label="label">
		<b-form-row>
			<b-col>
				<b-form-group :label="minLabel" :label-for="minInputId" label-size="sm" :state="minInputState" :invalid-feedback="minInputFeedback">
					<b-input-group :append="unit">
						<b-form-input :id="minInputId" v-model="minValue" @change="checkInput" :state="minInputState" no-wheel type="number" number autocomplete="off"></b-form-input>
					</b-input-group>
				</b-form-group>
			</b-col>

			<b-col>
				<b-form-group :label="maxLabel" :label-for="maxInputId" label-size="sm" :state="maxInputState" :invalid-feedback="maxInputFeedback">
					<b-input-group :append="unit">
						<b-form-input :id="maxInputId" v-model="maxValue" @change="checkInput" :state="maxInputState" no-wheel type="number" number autocomplete="off"></b-form-input>
					</b-input-group>
				</b-form-group>
			</b-col>
		</b-form-row>
	</b-form-group>
</template>

<script>
let baseInputIdCounter = 0;

export default {
	props: {
		value: {
			type: Object,
			required: true
		},
		inputId: {
			type: String,
			default: null
		},
		label: {
			type: String,
			required: true
		},
		minLabel: {
			type: String,
			default: 'Min'
		},
		maxLabel: {
			type: String,
			default: 'Max'
		},
		unit: {
			type: String,
			default: null
		}
	},
	data: function() {
		// if inputId has not been specified explicitly, we generate one with an increasing counter to avoid duplicates
		let baseInputId = this.inputId;
		if (baseInputId == null) {
			baseInputId = 'base-number-range-' + baseInputIdCounter.toString();
			baseInputIdCounter += 1;
		}
		return {
			minValue: null,
			maxValue: null,
			minInputId: baseInputId + '-min',
			maxInputId: baseInputId + '-max',
			minInputFeedback: '',
			maxInputFeedback: '',
			minInputState: null,
			maxInputState: null
		};
	},
	methods: {
		checkInput: function() {
			// Check that minValue < maxValue
			if (typeof this.minValue == 'number' && typeof this.maxValue == 'number' && this.minValue > this.maxValue) {
				this.maxInputState = false;
				this.maxInputFeedback = this.maxLabel + ' must be larger than ' + this.minLabel;
			} else {
				this.maxInputState = null;
			}
		},
		onChange: function() {
			this.$emit('input', { min: this.minValue, max: this.maxValue });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
