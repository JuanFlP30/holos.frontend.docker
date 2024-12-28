<script setup>
import { onUpdated, ref } from 'vue';
import { api } from '@Services/Api';

import Header     from '@Holos/Modal/Elements/Header.vue';
import EditModal  from '@Holos/Modal/Edit.vue';
import Checkbox   from '@Holos/Form/Checkbox.vue';

/** Eventos */
const emit = defineEmits([
    'close', 
]);

/** Propiedades */
const props = defineProps({
    show: Boolean,
    model: Object
});

const permissionTypes = ref([]);
const permissions = ref([]);

/** Métodos */
function update() {
    api.put(route('roles.permissions', { role: props.model.id }), {
        data: {
            permissions: permissions.value
        },
        onSuccess: () => {
            Notify.success(Lang('register.edit.onSuccess'))

            emit('close');
        }
    });
}

/** Ciclos */
onUpdated(() => {
    api.get(route('permission-types.all-with-permissions'), {
        onSuccess: (r) => permissionTypes.value = r.models
    });

    api.get(route('roles.permissions', { role: props.model.id }), {
        onSuccess: (r) => {
            if(r.permissions) {
                permissions.value = r.permissions.map(p => p.id);
            }
        }
    });
});
</script>
<template>
    <EditModal
        :show="show"
        @update="update"
        @close="$emit('close')"
    >
        <Header
            :title="model.description"
        />
        <div class="p-4 border-b">
            <div class="grid gap-4 grid-cols-2">
                <div v-for="permissionType in permissionTypes">
                    <div>
                        <p class="font-bold">{{ permissionType.name}}</p>
                        <ul class="space-y-0.5 list-none">
                            <li v-for="permission in permissionType.permissions">
                                <Checkbox
                                    v-model="permissions"
                                    :title="permission.description"
                                    :value="permission.id"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </EditModal>
</template>