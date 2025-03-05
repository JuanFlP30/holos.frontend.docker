<template>
    <li
        class="flex items-center rounded-sm border-y px-2 min-h-[35px] transition duration-300"
    >
        <div class="pl-5 w-full flex items-center justify-between cursor-pointer">
            <div class="flex items-center font-semibold">
                <slot />
            </div>
        </div>
    </li>
</template>