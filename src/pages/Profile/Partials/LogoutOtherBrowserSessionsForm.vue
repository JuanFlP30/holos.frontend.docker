<script setup>
import { ref } from 'vue';
import { useForm } from '@Services/Api';

import ActionSection   from '@Holos/ActionSection.vue';
import DialogModal     from '@Holos/DialogModal.vue';
import PrimaryButton   from '@Holos/Button/Primary.vue';
import SecondaryButton from '@Holos/Button/Secondary.vue';
import Input           from '@Holos/Form/Input.vue';

defineProps({
    sessions: {
        type: Array,
        default: () => [],
    },
});

const confirmingLogout = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmLogout = () => {
    confirmingLogout.value = true;

    setTimeout(() => passwordInput.value.focus(), 250);
};

const logoutOtherBrowserSessions = () => {
    form.delete(route('other-browser-sessions.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            Notify.success(Lang('account.sessions.done'));
        },
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingLogout.value = false;

    form.reset();
};
</script>

<template>
    <ActionSection>
        <template #title>
            {{ $t('account.sessions.title') }}
        </template>

        <template #description>
            {{ $t('account.sessions.description') }}
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-page-d/60 dark:text-page-dt/50">
                {{ $t('account.sessions.onLogout') }}
            </div>

            <!-- Other Browser Sessions -->
            <div v-if="sessions.length > 0" class="mt-5 space-y-6">
                <div v-for="(session, i) in sessions" :key="i" class="flex items-center">
                    <div>
                        <svg v-if="session.agent.is_desktop" class="w-8 h-8 text-primary-d dark:text-primary-dt" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>

                        <svg v-else class="w-8 h-8 text-primary-d dark:text-primary-dt" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                    </div>

                    <div class="ms-3">
                        <div class="text-sm text-page-d/60 dark:text-page-dt/50">
                            {{ session.agent.platform ? session.agent.platform : $t('unknown') }} - {{ session.agent.browser ? session.agent.browser : $t('unknown') }}
                        </div>

                        <div>
                            <div class="text-xs text-page-d/60 dark:text-page-dt/50">
                                {{ session.ip_address }},

                                <span v-if="session.is_current_device" class="text-success dark:text-success-d font-semibold">{{ $t('account.sessions.this') }}</span>
                                <span v-else>{{ $t('account.sessions.last') }} {{ session.last_active }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center mt-5">
                <PrimaryButton @click="confirmLogout">
                    {{ $t('account.sessions.logout') }}
                </PrimaryButton>
            </div>

            <!-- Log Out Other Devices Confirmation Modal -->
            <DialogModal :show="confirmingLogout" @close="closeModal">
                <template #title>
                    {{ $t('account.sessions.logout') }}
                </template>

                <template #content>
                    {{ $t('account.sessions.confirm') }}

                    <div class="mt-4">
                        <Input
                            ref="passwordInput"
                            v-model="form.password"
                            id="password"
                            type="password"
                            :onError="form.errors.password"
                        />
                    </div>
                </template>

                <template #footer>
                    <SecondaryButton @click="closeModal">
                        {{ $t('cancel') }}
                    </SecondaryButton>

                    <PrimaryButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="logoutOtherBrowserSessions"
                    >
                        {{ $t('account.sessions.logout') }}
                    </PrimaryButton>
                </template>
            </DialogModal>
        </template>
    </ActionSection>
</template>
