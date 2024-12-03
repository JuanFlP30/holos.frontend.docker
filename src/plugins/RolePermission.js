import { ref } from 'vue';

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
    if (!permissionsInit.value) {
        axios.get(route('system.permissions')).then((res) => {
            loadPermissions(res.data.data.permissions)
            
            permissionsInit.value = true;
        })
    }
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

export {
    bootPermissions,
    hasPermission,
    resetPermissions
};