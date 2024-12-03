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
    class: String,
    required: Boolean,
    accept: {
        default: 'image/png, image/jpeg',
        type: String
    },
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
            type="file"
            class="hidden"
            :accept="accept"
            :required="required"
            @change="updatePhotoPreview"
        >
        <Label
            class="dark:text-gray-800"
            id="image_file"
            :title="title"
            :required="required"
        />
        <div v-show="! photoPreview" class="mt-2">
            <!-- si existe una imagen cargada, entonces se muestra en este slot -->
            <slot />
        </div>
        <div v-show="photoPreview" class="mt-2">
            <div v-if="fileType == 'application/pdf'" class="flex overflow-hidden max-w-full">
                <GoogleIcon 
                    :title="$t('crud.edit')"
                    class="text-gray-400" 
                    name="picture_as_pdf"
                    outline 
                />
                <div class="ml-2 font-bold text-gray-400 flex-1">
                    {{ photoPreview }}
                </div>
            </div>
            <div v-else>
                <span
                    :class="class"
                    class="block rounded-lg h-40 bg-cover bg-no-repeat bg-center"
                    :style="'background-image: url(\'' + photoPreview + '\');'"
                />
            </div>
            
        </div>
        <SecondaryButton
            class="mt-2 mr-2"
            type="button"
            v-text="$t('photo.new')"
            @click.prevent="selectNewPhoto"
        />
    </div>
</template>