import { defineStore } from 'pinia'

// Identificador de la página
const page = document.getElementById('main-page');

// Almacén del modo oscuro
const useDarkMode = defineStore('dark-mode', {
    state: () => ({
        isActive: true
    }),
    getters: {
        getTheme(state) {
            return state.isActive
                ? 'dark'
                : 'light';
        },
        isDark(state) {
            return state.isActive === true;
        },
        isLight(state) {
            return state.isActive === false;
        }
    },
    actions: {
        boot() {
            this.apply((localStorage.darkMode == 'true'));
        },
        applyDark() {
            this.apply(true);
        },
        applyLight() {
            this.apply(false);
        },
        apply(state) {
            this.isActive = state;
            localStorage.darkMode = state

            if(state) {
                page.classList.add('dark');
            } else {
                page.classList.remove('dark');
            }
        }
    },
})

export default useDarkMode