/**
 * Usuarios autenticados
 */

import { ref } from 'vue';

const users = ref([]);

function boot(x) {
    users.value = x;
}

function addUser(user) {
    users.value.push(user);
}

function removeUser(user) {
    users.value = users.value.filter(u => u.id !== user.id);
}

export {
    users,
    boot,
    addUser,
    removeUser
};