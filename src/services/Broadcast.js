import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { token } from '@Services/Api';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    authorizer: (channel, options) => {
        return {
            authorize: async (socketId, callback) => {
                try {
                    let { data } = await axios({
                        method: 'post',
                        url: import.meta.env.VITE_REVERB_SCHEME + '://' + import.meta.env.VITE_REVERB_HOST + '/broadcasting/auth',
                        data: {
                            socket_id: socketId,
                            channel_name: channel.name,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token.value}`
                        }
                    });

                    callback(null, data);
                } catch (err) {
                    callback(err);
                }
            }
        };
    },
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});
