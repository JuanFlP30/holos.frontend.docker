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
    disabled: Boolean,
    label: {
        default: 'name',
        type: String
    },
    modelValue: String | Number,
    multiple: Boolean,
    onError: String | Array,
    options: Object,
    placeholder: {
        default: 'Buscar ...',
        type: String
    },
    required: Boolean,
    trackBy: {
        default: 'id',
        type: String
    },
    title: String,
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
            :required="required"
            :title="title"
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
            :label="label"
            :multiple="multiple"
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