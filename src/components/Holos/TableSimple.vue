<script setup>
/** Eventos */
const emit = defineEmits([
  'send-pagination'
]);

/** Propiedades */
const props = defineProps({
    items: Object,
});
</script>

<template>
    <section class="py-4">
        <div class="w-full overflow-hidden rounded-md shadow-lg">
            <div class="w-full overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr>
                            <slot name="head" />
                        </tr>
                    </thead>
                    <tbody class="">
                        <slot
                            name="body"
                            :items="items"
                        />
                        <tr>
                            <slot name="empty" />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>