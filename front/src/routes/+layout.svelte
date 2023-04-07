<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <style>
    .bg-image {
      background-image: url('/src/img/fond.webp');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      height: 100%;
      width: 100%;
    }

    .logo {
        content: url('/src/img/logo.webp');
    } 
    
    .container {
      min-height: 100vh;
    }
  </style>

  <script>
      async function sendLoginForm() {
          const username = document.getElementsByName('username')[0].value;
          const password = document.getElementsByName('password')[0].value;
          
          const data = {
              id: username,
              mdp: password
          };
          
          const response = await fetch('http://localhost:3002/api/player/login', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if(response.status != 200){
              const repJson = await response.json();
              document.getElementById("error_msg_login").innerHTML = repJson["error"];
          }else{
              //redirection vers le jeu
              window.location.href = "game";
          }
      }

      async function sendSignupForm() {
          const username = document.getElementsByName('username')[1].value;
          const pseudo = document.getElementsByName('pseudo')[0].value;
          const password = document.getElementsByName('password')[1].value;
          const confirm_password = document.getElementsByName('confirm_password')[0].value;
          
          if (password !== confirm_password) {
              document.getElementById("error_msg_signup").innerHTML = "Les mots de passe ne correspondent pas";
              return;
          }
          
          const data = {
              id: username,
              mdp: password,
              pseudo: pseudo
          };
          
          const response = await fetch('http://localhost:3002/api/player/sign_up', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if(response.status != 200){
              const repJson = await response.json();
              document.getElementById("error_msg_signup").innerHTML = repJson["error"];
          }else{
              //redirection vers le jeu
              alert("Compte bien cree");
              window.location.href = "login";
          }
      }
  </script>
</head>

<script>
    
    import { onMount } from 'svelte';
    import { initModule } from './socketStore';

    onMount(() => {
        setCookie('jwt', Math.random().toString(36).slice(2))
        initModule();
    });
        
    // For testing purpose
    // @ts-ignore
    function setCookie(key, value) {
        const cookieString = `${key}=${value}`;
        document.cookie = cookieString;
    }

</script>

<slot></slot>
