<script setup>

defineProps({
    model: Object
})
</script>

<template>
    <span class="w-48 pr-2 truncate">
        {{ model.data.title }}
    </span>
    <span class="w-full pr-2 truncate">
        {{ model.data.description }}
    </span>
    <span class="w-28 pr-2 truncate">
        {{ model.data.type}}
    </span>
</template>