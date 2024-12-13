import { ref } from 'vue';
import { api } from '@Services/Api.js';

/**
 * Controlador simple de las bandejas
 */
class SearcherController
{
    route = '';
    params = {};
    query = ref('');

    constructor({ route, model, params = {} }) {
        this.route = route;
        this.model = ref(model);
        this.params = params;
    }

    /**
     * Búsqueda simple
     */
    search = (q = '', params) => {
        this.query.value = q;
        api.get(this._getRoute(), {
            params: {
                q: this.query.value,
                ...params
            },
            onSuccess: (r) => {
                this.model.value = r.users;
            }
        });
    };

    /**
     * Paginación simple
     */
    withPagination = (page, params) =>  {
        api.get(this._getRoute(), {
            params: {
                page,
                ...params
            },
            onSuccess: (r) => {
                this.model.value = r.users;
            }
        });
    }

    /**
     * Búsqueda con Paginación en tablas
     */
    searchWithPagination = (page, params) =>  {
        api.get(page, {
            params: {
                q: this.query.value,
                ...params
            },
            onSuccess: (r) => {
                this.model.value = r.users;
            }
        });
    }

    /**
     * Búsqueda con Paginación en bandejas
     */
    searchWithInboxPagination = (page, params) =>  {
        api.get(page, {
            params: {
                q: this.query.value,
                ...params
            },
            onSuccess: (r) => {
                this.model.value = r.users;
            }
        });
    }

    /**
     * Obtiene la ruta según los parámetros
     */
    _getRoute = () => {
        return (this.params)
            ? route(this.route, this.params)
            : route(this.route);
    }
}

export default SearcherController;