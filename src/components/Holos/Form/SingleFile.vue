<script setup>
import { ref } from 'vue';

import GoogleIcon      from '@Shared/GoogleIcon.vue'
import Label           from './Elements/Label.vue';
import SecondaryButton from '../Button/Secondary.vue';

/** Eventos */
const emit = defineEmits([
    'update:modelValue'
]);

/** Propiedades */
const props = defineProps({
    accept: {
        default: 'image/png, image/jpeg',
        type: String
    },
    class: String,
    modelValue:Object|String,
    required: Boolean,
    title: {
        default: 'photo.title',
        type: String
    }
});

const fileType     = ref(null);
const fileName     = ref(null);
const photoInput   = ref(null);
const photoPreview = ref(null);

/** Métodos */
const selectNewPhoto = () => {
    photoInput.value.click();
};

const updatePhotoPreview = () => {
    const image_file = photoInput.value.files[0];

    if (! image_file) return;

    emit('update:modelValue', image_file);
    
    fileType.value = image_file.type;
    fileName.value = image_file.name;
    
    const reader = new FileReader();

    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };

    reader.readAsDataURL(image_file);

};
</script>

<template>
    <div class="col-span-6">
        <input
            ref="photoInput"
            type="file"
            class="hidden"
            :accept="accept"
            :required="required"
            @change="updatePhotoPreview"
        >
        <Label
            id="image_file"
            :title="title"
            :required="required"
        />
        <div v-show="! photoPreview" class="mt-2">
            <!-- si existe una imagen cargada, entonces se muestra en este slot -->
            <slot name="previous"/>
        </div>
        <div v-show="photoPreview" class="mt-2">
            <div class="flex overflow-hidden max-w-full">
                <GoogleIcon 
                    class="text-gray-400" 
                    name="picture_as_pdf"
                    :title="$t('crud.edit')"
                    outline 
                />
                <div class="ml-2 font-bold text-gray-400 flex-1">
                    <a 
                        target="_blank"
                        :href="photoPreview"
                    >
                        {{ fileName }}
                    </a>
                </div>
            </div>
        </div>
        <SecondaryButton
            v-text="$t('files.select')"
            class="mt-2 mr-2"
            type="button"
            @click.prevent="selectNewPhoto"
        />
    </div>
</template>