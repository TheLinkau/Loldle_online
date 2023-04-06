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

    <table id="resultats-table" class="table mt-3 text-white">
    <thead>
        <tr>
            <th>Nom de la room</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        
    </tbody>
    </table>

</div>
</div>

<script>
	import { goto } from '$app/navigation';
    import { socketStore } from '../socketStore';
  
    let socket;
  
    socketStore.subscribe(value => {
        socket = value;

        socket.on('roomCreated', (roomid) => {
            goto('/game/' + roomid)
        });
    });

    function create() {
        socket.emit('createRoom');
    }

</script>
