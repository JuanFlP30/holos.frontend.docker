import { ref } from 'vue';
import { api } from '@Services/Api';

const permissionsInit = ref(false)
const allPermissions  = ref([])

/**
 * Permite consultar si un usuario tiene un permiso especifico
 */
const hasPermission = (can) => {
    let verifyPermissions = can.split('|');

    for (let permision in verifyPermissions) {
        if(allPermissions.value.length != 0) {
            if(allPermissions.value.indexOf(verifyPermissions[permision]) != -1) {
                return true;
            }
        }
    }
    
    return false;
}

const bootPermissions = () => {
    return new Promise((resolve, reject) => {
        if (!permissionsInit.value) {
            api.get(route('user.permissions'), {
                onSuccess: (res) => {
                    loadPermissions(res.permissions)

                    resolve(true)
                },
                onFinish: () => {
                    permissionsInit.value = true;
                },
                onError: () => {
                    reject(false)
                }
            })
        }
    })
}

const resetPermissions = () => {
    allPermissions.value = [];
    permissionsInit.value = false;
}

const loadPermissions = (permissionList = []) => {
    if (permissionList.length > 0) {
        permissionList.forEach(element => {
            allPermissions.value.push(element.name)
        });
    }
}

const getAllPermissions = () => {
    return allPermissions.value;
}

export {
    bootPermissions,
    hasPermission,
    resetPermissions,
    getAllPermissions
};