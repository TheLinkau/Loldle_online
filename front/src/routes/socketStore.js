import { writable } from 'svelte/store';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');

export const socketStore = writable(socket);
