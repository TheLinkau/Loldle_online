<div class="bg-image d-flex align-items-center justify-content-center text-white">
<div class="container">

    <div class="d-flex justify-content-center">
        <img alt="logo" class="logo">
    </div>
    
    <div class="d-flex justify-content-center">
        <form id="recherche-form">
        <div class="mb-3">
            <input id="champion" placeholder="Type champion name ..." type="text" autocomplete="new-password">
            <button type="submit" class="btn btn-primary">Jouer</button>
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
    import { onMount } from 'svelte';
    import { socketStore } from '../../socketStore';
  
    let socket;

    onMount(() =>  {
      console.log($page.params.id)
    });
    let currentPlayer = "";
    socket.on('feedbackChamp', (res,curPlayer) => {
    
        console.log(res.name);
        currentPlayer = curPlayer;
    
        const table = document.getElementById("resultats-table");
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
    
    // Handle sending messages
    const form = document.querySelector('#recherche-form');
    form.addEventListener('submitChamp', (e) => {
        e.preventDefault();
        const input = document.querySelector('#message-input');
        const message = input.value;
        input.value = '';
        socket.emit('ChampSelect', message);
    });
</script>