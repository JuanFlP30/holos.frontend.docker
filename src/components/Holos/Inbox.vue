<script setup>
import { ref } from 'vue';

import GoogleIcon from '@Shared/GoogleIcon.vue';
import InboxItem  from './Inbox/Item.vue';

/** Propiedades */
const props = defineProps({
    inboxCtl: Object,
    items: Object,
    searcherCtl: Object,
    withMultiSelection: Boolean 
});

/** Propiedades */
const check          = ref(false);
const filterMessages = ref(false);

const selectThisPage   = () => props.inboxCtl.onSelectAll(props.items, false);
const unselectThisPage = () => props.inboxCtl.onUnselectAll(props.items)

const search = url => props.searcherCtl.searchWithInboxPagination(url);

</script>

<template>
    <div v-if="inboxCtl.inboxNumberSelected.value.length"
        class="w-full p-1 rounded-b-md bg-primary text-white"
    >
        <span>
            ({{ inboxCtl.inboxNumberSelected.value.length }}) Seleccionados: {{ inboxCtl.inboxNumberSelected.value.join(", ") }}.
        </span>
    </div>
    <div class="w-full flex overflow-x-auto">
        <div class="w-fit">
            <div v-if="$slots['main-menu']"
                class="w-48 xl:w-64"
            >
                <slot
                    name="main-menu"
                />
            </div>
            <div v-if="$slots['menu']"
                class="w-48 xl:w-64 pr-2 pb-8 border-r border-gray-300"
                :class="{'mt-16':!$slots['main-menu']}"
            >
                <ul class="space-y-1">
                    <slot
                        name="menu"
                    />
                </ul>
            </div>
        </div>
        <div class="flex-1">
            <div v-if="$slots['actions']"
                class="h-16 flex items-center justify-between py-2"
            >
                <div class="flex items-center">
                    <div v-if="withMultiSelection"
                        class="relative flex items-center px-0.5 space-x-0.5"
                     >
                        <button class="px-2 pt-1" @click="filterMessages = !filterMessages">
                           <GoogleIcon
                           class="text-xl"
                            name="checklist"
                            outline
                           />
                        </button>
                        <div
                            @click.away="filterMessages = false"
                            class="bg-gray-200 shadow-2xl absolute left-0 top-6 w-32 py-2 text-gray-900 rounded z-10"
                            :class="{'hidden':!filterMessages}"
                        >
                            <button
                                type="button"
                                class="inbox-check-all-option"
                                @click="selectThisPage()"
                            >
                                Seleccionar toda esta página
                            </button>
                            <button
                                type="button"
                                class="inbox-check-all-option"
                                @click="unselectThisPage()"
                            >
                                Deseleccionar toda esta página
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <slot name="actions" />
                    </div>
                </div>
                <template v-if="items.links">
                    <div v-if="items.links.length > 3"
                        class="flex w-full justify-end"
                    >
                        <div class="flex w-full justify-end flex-wrap space-x-1 -mb-1">
                          <template v-for="(link, k) in items.links" :key="k">
                            <div v-if="link.url === null && k == 0"
                                class="px-2 py-1 text-sm leading-4 text-gray-400 border rounded"
                            >
                                <GoogleIcon
                                    name="arrow_back"
                                />
                            </div>
                            <button v-else-if="k === 0"
                                class="px-2 py-1 text-sm leading-4 border rounded" 
                                :class="{ 'bg-primary text-white': link.active }"
                                @click="search(link.url)"
                            >
                                <GoogleIcon
                                    name="arrow_back"
                                />
                            </button>
                            <div v-else-if="link.url === null && k == (items.links.length - 1)"
                                class="px-2 py-1 text-sm leading-4 text-gray-400 border rounded"
                            >
                                <GoogleIcon
                                    name="arrow_forward"
                                />
                            </div>
                            <button v-else-if="k === (items.links.length - 1)"
                                class="px-2 py-1 text-sm leading-4 border rounded" 
                                :class="{ 'bg-primary text-white': link.active }"
                                @click="search(link.url)"
                            >
                                <GoogleIcon
                                    name="arrow_forward"
                                />
                            </button>
                            <button v-else class="px-2 py-1 text-sm leading-4 border rounded" 
                                v-html="link.label"
                                :class="{ 'bg-primary text-white': link.active }"
                                @click="search(link.url)"
                            ></button>
                          </template>
                        </div>
                    </div>
                </template>
            </div>
            <div v-else class="w-full mt-4"></div>
            <div v-if="items.total > 0"
                class="bg-gray-100 "
            >
                <ul class="ml-1">
                    <slot
                        name="head"
                        :items="items.data"
                    />
                </ul>
                <ul class="ml-1">
                    <slot
                        name="items"
                        :items="items.data"
                    />
                </ul>
            </div>
            <template v-else>
                <InboxItem>
                    <template #item>
                        <span class="w-28 pr-2 truncate">-</span>
                        <span class="w-96 truncate">Sin resultados</span>
                    </template>
                    <template #date>
                       -
                    </template>
                </InboxItem> 
            </template>
        </div>
    </div>
</template>