<script setup>
import { ref } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';

import FormSection     from '@Holos/FormSection.vue';
import Input           from '@Holos/Form/Input.vue';
import Error           from '@Holos/Form/Elements/Error.vue';
import Label           from '@Holos/Form/Elements/Label.vue';
import PrimaryButton   from '@Holos/Button/Primary.vue';
import SecondaryButton from '@Holos/Button/Secondary.vue';

const props = defineProps({
    user: Object,
});

const form = useForm({
    _method: 'PUT',
    name: props.user.name,
    paternal: props.user.paternal,
    maternal: props.user.maternal,
    phone: props.user.phone,
    name: props.user.name,
    email: props.user.email,
    photo: null,
});

const verificationLinkSent = ref(null);
const photoPreview = ref(null);
const photoInput = ref(null);

const updateProfileInformation = () => {
    if (photoInput.value) {
        form.photo = photoInput.value.files[0];
    }

    form.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => {
            clearPhotoFileInput();
            Notify.success(lang('account.profile.updated'));
        },
    });
};

const sendEmailVerification = () => {
    verificationLinkSent.value = true;
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
    router.delete(route('current-user-photo.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
            photoPreview.value = null;
            clearPhotoFileInput();
        },
    });
};

const clearPhotoFileInput = () => {
    if (photoInput.value?.value) {
        photoInput.value.value = null;
    }
};
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
            <div v-if="$page.props.jetstream.managesProfilePhotos" class="col-span-6 sm:col-span-4">
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
                    <img :src="user.profile_photo_url" :alt="user.name" class="rounded-full h-20 w-20 object-cover">
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
                    v-if="user.profile_photo_path"
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

                <div v-if="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
                    <p class="text-sm mt-2">
                        {{ $t('account.email.unverify') }}

                        <Link
                            :href="route('verification.send')"
                            method="post"
                            as="button"
                            class="underline text-sm text-page-t/50 hover:text-page-t dark:text-page-dt/50 dark:hover:text-page-dt rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click.prevent="sendEmailVerification"
                        >
                            {{ $t('account.email.sendVerification') }}
                        </Link>
                    </p>

                    <div v-show="verificationLinkSent" class="mt-2 font-medium text-sm text-green-600">
                        {{ $t('account.email.notifySendVerification') }}
                    </div>
                </div>
            </div>
        </template>

        <template #actions>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ $t('save') }}
            </PrimaryButton>
        </template>
    </FormSection>
</template>
