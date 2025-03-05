<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { lang } from '@Lang/i18n';

import GoogleIcon    from '@Shared/GoogleIcon.vue';
import PrimaryButton from '../../Button/Primary.vue';
import Input         from '../../Form/Input.vue';
import Selectable    from '../../Form/Selectable.vue';

/** Eventos */
const emit = defineEmits([
    'update:modelValue'
]);

/** Propiedades */
const props = defineProps({
    itemATitle: String,
    itemBTitle: String,
    items: Object,
    modelValue: Object,
    title: String,
    type: {
        default: 'text',
        type: String
    }
})

// Elementos primarios (controlador)
const itemA            = ref()
const itemsASelected   = ref([]);
const itemsAUnselected = ref([]);

// Elementos secundarios
const itemB = ref();

/** Propiedades computadas */
const values = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

/** Métodos */
function add() {
    if (itemA.value) {
        if(itemB.value) {
            values.value.push({
                item: {
                    _id: itemA.value._id,
                    name: itemA.value.name,
                },
                value: itemB.value,
            });
    
            let x = itemsAUnselected.value.filter((o) => {
                return o._id != itemA.value._id
            })
    
            itemsAUnselected.value = x
            itemsASelected.value.push({...itemA.value}),
        
            itemA.value = null
            itemB.value = null
        } else {
            Notify.warning(Lang('todo.uniqueSub.b.required', {name:Lang('subclassification')}))
        }
    } else {
        Notify.warning(Lang('todo.uniqueSub.a.required', {name:Lang('classification')}))
    }
}

function remove(index, provider) {
    itemsAUnselected.value.push({...provider})
    itemsASelected.value.splice(itemsASelected.value.indexOf(provider), 1)
    values.value.splice(index, 1)
}

/** Exposiciones */
defineExpose({
    itemA,
    itemB,
    add,
})

/** Observadores */
watchEffect(() => {
    if(props.items.length > 0) {
        itemsAUnselected.value = props.items
    }
})

watch(itemA, () => {
    emit('updateItemsB', itemA.value?.id)

    if(!itemA.value) {
        itemB.value = null
    }
})

/** Ciclos */
onMounted(() => {
    if(values.value) {
        values.value.forEach((i) => {
            itemsASelected.value.push({...i})
        })
    }
})
</script>

<template>
    <div class="rounded-sm border border-primary dark:border-primary-d p-2">
        <p>{{ title }}</p>
        <div class="w-full grid gap-2 grid-cols-2 dark:bg-primary-d/50 rounded-md">
            <Selectable
                v-model="itemA"
                :title="itemATitle"
                :options="itemsAUnselected"
            />
            <Input
                v-model="itemB"
                :title="itemBTitle"
                :type="type"
                @keyup.enter="add"
            />
            <div class="col-span-2 flex justify-center">
                <PrimaryButton
                    type="button"
                    @click="add"
                >
                    {{ $t('add') }}
                </PrimaryButton>
            </div>
            <div class="col-span-2 text-sm">
                <p><b>{{ $t('items') }}</b> ({{ values.length }})</p>
            </div>
            <div class="col-span-2 space-y-2 ">
                <template v-for="item, index in values">
                    <div class="relative rounded-sm border border-primary/50">
                        <div class="grid gap-2 grid-cols-2 w-full items-center p-2 dark:bg-primary-d/50">
                            <Input
                                v-model="item.item.name"
                                :title="itemATitle"
                                disabled
                            />
                            <Input
                                v-model="item.value"
                                :title="itemBTitle"
                            />
                        </div>
                        <div class="absolute right-1 top-1">
                            <GoogleIcon
                                class="btn-icon-primary"
                                name="close"
                                @click="remove(index, item.item)"
                            />
                        </div>
                    </div>
                </template>
            </div>
            <slot />
        </div>
    </div>
</template>