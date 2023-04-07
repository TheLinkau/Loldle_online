<div class="bg-image d-flex align-items-center justify-content-center text-white">
  <div class="container">
    <div class="d-flex justify-content-center">
      <img alt="logo" class="logo">
    </div>

    <div class="d-flex justify-content-center mt-3">
      <button on:click={start} class="btn btn-primary start-button">Start</button>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <form id="recherche-form">
        <div class="mb-3">
          <input id="champion" placeholder="Type champion name ..." type="text" autocomplete="new-password">
          <button type="submit" class="btn btn-primary" disabled={currentPlayer != currentUser || !play}>Jouer</button>
        </div>
      </form>
    </div>

    <table id="resultats-table" class="table mt-3 text-white">
      <thead>
        <tr>
          <th>Champion</th>
          <th>Gender</th>
          <th>Positions</th>
          <th>Species</th>
          <th>Resource</th>
          <th>Range type</th>
          <th>Region(s)</th>
          <th>Release year</th>
          <th>À qui de jouer ?</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>

  </div>
</div>


<script>
	import { page } from '$app/stores';
    import { onDestroy, onMount } from 'svelte';
    import { socketStore } from '../../socketStore';
	import { goto } from '$app/navigation';
  
    /**
	 * @type {import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>}
	 */
    let socket;
    let currentPlayer = "";
    let currentUser = "";
    let play = false;

    socketStore.subscribe(value => {
        socket = value;

        socket.on('nextPlayer', (player) => {
            currentPlayer = player;
        });

        socket.on('close', () => {
            goto('/home/')
        });

        socket.on('feedbackChamp', (res) => {
                        
            const table = document.getElementById("resultats-table");
            // @ts-ignore
            const row = table.insertRow(-1);
            
            const nameCell = row.insertCell(0);
            nameCell.innerHTML = res.name;
            
            const genderCell = row.insertCell(1);
            genderCell.innerHTML = res.gender;
            
            const positionCell = row.insertCell(2);
            positionCell.innerHTML = res.position;
            
            const speciesCell = row.insertCell(3);
            speciesCell.innerHTML = res.species;
            
            const resourceCell = row.insertCell(4);
            resourceCell.innerHTML = res.ressource;
            
            const rangeTypeCell = row.insertCell(5);
            rangeTypeCell.innerHTML = res.RangeType;
            
            const regionCell = row.insertCell(6);
            regionCell.innerHTML = res.Region;
            
            const dateCell = row.insertCell(7);
            dateCell.innerHTML = res.date;
        });
    });

    onMount(() =>  {
      readCookie();
    });

    function start() {
        const startButton = document.querySelector(".start-button");
        if (startButton && startButton.parentNode) {
            startButton.parentNode.removeChild(startButton);
        }
    }

    // Handle sending messages
    const form = document.querySelector('#recherche-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.querySelector('#message-input');
            if (input && input instanceof HTMLInputElement) {
                const message = input.value;
                input.value = '';
                socket.emit('ChampSelect', message);
            }
        });
    }

    function readCookie() {
        const cookieString = document.cookie;
        const cookieArray = cookieString.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
            if (cookie.startsWith(`${'jwt'}=`)) {
                currentUser = cookie.substring(`${'jwt'}=`.length, cookie.length).slice(0, 5);
                break;
            }
        }
    }

    function end() {
        socket.emit('leaveSession')
    }

    onDestroy(end);

</script>