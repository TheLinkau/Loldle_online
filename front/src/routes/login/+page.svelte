<head>
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

<div class="bg-image d-flex align-items-center justify-content-center text-white">
    <div class="container">

    <div class="d-flex justify-content-center">
        <img alt="logo" class="logo">
    </div>

    <div class="row">
        <div class="col-md-4">
        <h2>Connexion</h2>
        <div>
            <div class="form-group my-2">
            <label>Nom d'utilisateur:</label>
            <input type="text" name="username" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Mot de passe:</label>
            <input type="password" name="password" class="form-control">
            </div>
            <button onclick="sendLoginForm()" name="login" class="btn btn-primary">Connexion</button>
        </div>
        <div id="error_msg_login"></div>
        </div>

        <div class="col-md-4"></div>

        <div class="col-md-4">
        <h2>Inscription</h2>
        <div>
            <div class="form-group my-2">
            <label>Nom d'utilisateur (non public):</label>
            <input type="text" name="username" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Pseudo (visible par tous):</label>
            <input type="text" name="pseudo" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Mot de passe:</label>
            <input type="password" name="password" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Confirmer le mot de passe:</label>
            <input type="password" name="confirm_password" class="form-control">
            </div>
            <button onclick="sendSignupForm()" name="signup" class="btn btn-primary">Inscription</button>
        </div>
        <div id="error_msg_signup"></div>
        </div>

    </div>

    </div>
</div>