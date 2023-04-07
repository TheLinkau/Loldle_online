<div class="bg-image d-flex align-items-center justify-content-center text-white">
<div class="container">

    <div class="d-flex justify-content-center">
        <img alt="logo" class="logo">
    </div>
    
    <div class="d-flex justify-content-center">
        <form id="recherche-form">
        <div class="mb-3">
            <button on:click={create}>Créer une room</button>
        </div>
        </form>
    </div>

    <ul class="list-group">
    {#each sessions as session}
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Session ID: {session.roomId}</span>
        <span>Player count: {session.nbPlayer}/2 </span>
        <button 
            class="btn btn-primary" 
            disabled={session.nbPlayer >= 2}
            on:click={() => join(session.roomId)}
        >
            Join
        </button>
        </li>
    {/each}
    </ul>

</div>
</div>

<script>
	import { goto } from '$app/navigation';
    import { socketStore } from '../socketStore';
  
    /**
	 * @type {import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>}
	 */
    let socket;
    
    /**
	 * @type {any[]}
	 */
    let sessions = []
  
    socketStore.subscribe(value => {
        socket = value;

        if (socket) {
            socket.emit('getSessions');

            socket.on('roomCreated', (roomid) => {
                goto('/game/' + roomid)
            });

            socket.on('roomJoined', (roomid) => {
                goto('/game/' + roomid)
            });

            socket.on('majListSessions', (list) => {
                sessions = list;
            });
        }

    });

    function create() {
        socket.emit('createRoom');
    }

    /**
	 * @param {string} roomId
	 */
    function join(roomId) {
        socket.emit('JoinRoom', roomId);
    }

</script>
