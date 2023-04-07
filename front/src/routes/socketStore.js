// socketStore.js

import io from 'socket.io-client';
import {
    writable
} from 'svelte/store';

function readCookie() {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.startsWith(`${'jwt'}=`)) {
            return cookie.substring(`${'jwt'}=`.length, cookie.length);
        }
    }
    return '';
}

export function initSocket() {
    const jwt = readCookie();

    const socket = io('http://localhost:3002', {
        query: {
            token: jwt
        }
    });

    socketStore.set(socket);
}

export let socketStore = writable();
export let connected = writable(false)

export function initModule() {
    const jwt = readCookie();

    const socket = io('http://localhost:3002', {
        query: {
            token: jwt
        }
    });

    socketStore.set(socket);

    socketStore.subscribe(value => {
        value.on('connected', ( /** @type {boolean} */ bool) => {
            connected.set(bool);
        });

        value.on('disconnected', () => {
            alert("Accès impossible, utilisateur non connecté")
        })
    });
}
