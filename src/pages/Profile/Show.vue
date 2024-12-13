<script setup>
import SectionBorder                  from '@Holos/SectionBorder.vue';
import DeleteUserForm                 from '@Pages/Profile/Partials/DeleteUserForm.vue';
import TwoFactorAuthenticationForm    from '@Pages/Profile/Partials/TwoFactorAuthenticationForm.vue';
import UpdatePasswordForm             from '@Pages/Profile/Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm   from '@Pages/Profile/Partials/UpdateProfileInformationForm.vue';
import LogoutOtherBrowserSessionsForm from '@Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue';
import PageHeader                     from '@Holos/PageHeader.vue';

defineProps({
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array,
});
</script>

<template>
    <PageHeader :title="$t('profile')" />
    <div>
        <div>
            <UpdateProfileInformationForm :user="$page.user" />
            <SectionBorder />
        </div>
        <div>
            <UpdatePasswordForm class="mt-10 sm:mt-0" />
            <SectionBorder />
        </div>
        <!-- <div>
            <TwoFactorAuthenticationForm
                :requires-confirmation="confirmsTwoFactorAuthentication"
                class="mt-10 sm:mt-0"
            />
            <SectionBorder />
        </div> -->
        <!-- <LogoutOtherBrowserSessionsForm :sessions="sessions" class="mt-10 sm:mt-0" /> -->
        <SectionBorder />
        <DeleteUserForm class="mt-10 sm:mt-0" />
    </div>
</template>
