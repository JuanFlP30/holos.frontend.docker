<script setup>
import { ref } from 'vue';

import GoogleIcon      from '@Shared/GoogleIcon.vue'
import Label           from './Elements/Label.vue';
import SecondaryButton from '../Button/Secondary.vue';

/** Eventos */
const emit = defineEmits([
    'photoInput'
]);

/** Propiedades */
const props = defineProps({
    accept: {
        default: 'image/png, image/jpeg',
        type: String
    },
    class: String,
    required: Boolean,
    title: {
        default: 'photo.title',
        type: String
    }
});

const fileType     = ref(null);
const photoInput   = ref(null);
const photoPreview = ref(null);

/** Métodos */
const selectNewPhoto = () => {
    photoInput.value.click();
};

const updatePhotoPreview = () => {
    const image_file = photoInput.value.files[0];

    if (! image_file) return;

    emit('photoInput', image_file);
    
    fileType.value = image_file.type;
    
    if(image_file.type == "application/pdf"){
        photoPreview.value = image_file.name;
    }else{
    const reader = new FileReader();

    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };

    reader.readAsDataURL(image_file);
    }
};
</script>

<template>
    <div class="col-span-6">
        <input
            ref="photoInput"
            class="hidden"
            type="file"
            :accept="accept"
            :required="required"
            @change="updatePhotoPreview"
        >
        <Label
            id="image_file"
            class="dark:text-gray-800"
            :required="required"
            :title="title"
        />
        <div v-show="! photoPreview" class="mt-2">
            <!-- si existe una imagen cargada, entonces se muestra en este slot -->
            <slot />
        </div>
        <div v-show="photoPreview" class="mt-2">
            <div v-if="fileType == 'application/pdf'" class="flex overflow-hidden max-w-full">
                <GoogleIcon 
                    class="text-gray-400" 
                    name="picture_as_pdf"
                    :title="$t('crud.edit')"
                    outline 
                />
                <div class="ml-2 font-bold text-gray-400 flex-1">
                    {{ photoPreview }}
                </div>
            </div>
            <div v-else>
                <span
                    class="block rounded-lg h-40 bg-cover bg-no-repeat bg-center"
                    :class="class"
                    :style="'background-image: url(\'' + photoPreview + '\');'"
                />
            </div>
            
        </div>
        <SecondaryButton
            v-text="$t('photo.new')"
            class="mt-2 mr-2"
            type="button"
            @click.prevent="selectNewPhoto"
        />
    </div>
</template>