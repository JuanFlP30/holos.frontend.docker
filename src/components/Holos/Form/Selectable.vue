<script setup>
import { computed, ref } from 'vue';
import VueMultiselect from 'vue-multiselect';

import Error from './Elements/Error.vue';
import Label from './Elements/Label.vue';

/** Eventos */
const emit = defineEmits([
    'select',
    'update:modelValue'
]);

/** Propiedades */
const props = defineProps({
    customLabel: String,
    trackBy: {
        default: 'id',
        type: String
    },
    label: {
        default: 'name',
        type: String
    },
    modelValue: String | Number,
    title: String,
    options: Object,
    onError: String,
    placeholder: {
        default: 'Buscar ...',
        type: String
    },
    required: Boolean,
    multiple: Boolean,
    disabled: Boolean
});

const multiselect = ref();

/** Propiedades computadas */
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

/** Exposiciones */
defineExpose({
    clean: () =>  multiselect.value.removeLastElement()
});
</script>

<template>
    <div class="flex flex-col">
        <Label
            :title="title"
            :required="required"
        />
        <VueMultiselect
            ref="multiselect"
            v-model="value"
            deselectLabel="Remover"
            selectedLabel="Seleccionado"
            selectLabel="Seleccionar"
            :clear-on-select="false"
            :close-on-select="true"
            :custom-label="customLabel"
            :disabled="disabled"
            :multiple="multiple"
            :label="label"
            :options="options"
            :placeholder="placeholder"
            :preserve-search="true"
            :required="required && !value"
            :track-by="trackBy"
            @select="(x, y) => emit('select', x, y)"
        >
            <template #noOptions>
                {{ $t('noRecords') }}
            </template>
        </VueMultiselect>
        <Error
            :onError="onError"
        />
    </div>
</template>