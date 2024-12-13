<script setup>
import { onMounted, ref } from 'vue';
import { api, useForm } from '@Services/Api';
import { reloadUser } from '@Services/Page';
import FormSection     from '@Holos/FormSection.vue';
import Input           from '@Holos/Form/Input.vue';
import Error           from '@Holos/Form/Elements/Error.vue';
import Label           from '@Holos/Form/Elements/Label.vue';
import PrimaryButton   from '@Holos/Button/Primary.vue';
import SecondaryButton from '@Holos/Button/Secondary.vue';

/** Propiedades */
const form = useForm({
    _method: 'PUT',
    name: '',
    paternal: '',
    maternal: '',
    phone: '',
    email: '',
    photo: null,
});

const photoInput   = ref(null);
const photoPreview = ref(null);

/** Métodos */
const updateProfileInformation = () => {
    if (photoInput.value) {
        form.photo = photoInput.value.files[0];
    }

   form.post(route('user.update'), {
        onFinish: () => {
            reloadUser();
            clearPhotoFileInput();
        }
    });

    Notify.success(Lang('account.profile.updated'));
};

const selectNewPhoto = () => {
    photoInput.value.click();
};

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (! photo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };

    reader.readAsDataURL(photo);
};

const deletePhoto = () => {
    api.delete(route('user.photo'), {
        onFinish: () => {
            photoPreview.value = null;
            reloadUser();
            clearPhotoFileInput();
        }
    });
};

const clearPhotoFileInput = () => {
    if (photoInput.value?.value) {
        photoInput.value.value = null;
    }
};

onMounted(() => {
    api.get(route('user.show'), {
        onSuccess: (r) => {
            form.fill(r.user);
        }
    });
});
</script>

<template>
    <FormSection @submitted="updateProfileInformation">
        <template #title>
            {{ $t('account.profile.title') }}
        </template>

        <template #description>
            {{ $t('account.profile.description') }}
        </template>

        <template #form>
            <!-- Profile Photo -->
            <div v-if="$page.user" class="col-span-6 sm:col-span-4">
                <!-- Profile Photo File Input -->
                <input
                    id="photo"
                    ref="photoInput"
                    type="file"
                    class="hidden"
                    @change="updatePhotoPreview"
                >

                <Label
                    id="photo"
                    title="photo.title"
                />

                <!-- Current Profile Photo -->
                <div v-show="! photoPreview" class="mt-2">
                    <img :src="$page.user.profile_photo_url" :alt="$page.user.name" class="rounded-full h-20 w-20 object-cover">
                </div>

                <!-- New Profile Photo Preview -->
                <div v-show="photoPreview" class="mt-2">
                    <span
                        class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                        :style="'background-image: url(\'' + photoPreview + '\');'"
                    />
                </div>

                <SecondaryButton class="mt-2 me-2" type="button" @click.prevent="selectNewPhoto">
                    {{ $t('photo.new') }}
                </SecondaryButton>

                <SecondaryButton
                    v-if="$page.user.profile_photo_path"
                    type="button"
                    class="mt-2"
                    @click.prevent="deletePhoto"
                >
                    {{ $t('photo.remove') }}
                </SecondaryButton>

                <Error :onError="form.errors.photo" class="mt-2" />
            </div>

            <!-- Name -->
            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.name"
                    id="name"
                    :onError="form.errors.name"
                    required
                />
            </div>
            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.paternal"
                    id="paternal"
                    :onError="form.errors.paternal"
                    required
                />
            </div>
            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.maternal"
                    id="maternal"
                    :onError="form.errors.maternal"
                />
            </div>
            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.phone"
                    id="phone"
                    :onError="form.errors.phone"
                />
            </div>

            <!-- Email -->
            <div class="col-span-6 sm:col-span-4">
                <Input
                    v-model="form.email"
                    id="email"
                    title="email.title"
                    type="email"
                    :onError="form.errors.email"
                    required
                />
            </div>
        </template>

        <template #actions>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ $t('save') }}
            </PrimaryButton>
        </template>
    </FormSection>
</template>
