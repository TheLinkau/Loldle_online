<div class="bg-image d-flex align-items-center justify-content-center text-white">
    <div class="container">

    <div class="d-flex justify-content-center">
        <img alt="logo" class="logo">
    </div>

    <div class="row">
        <div class="col-md-4">
        <h2>Connexion</h2>
        <form method="POST" action="login.php">
            <div class="form-group my-2">
            <label>Nom d'utilisateur:</label>
            <input type="text" name="username" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Mot de passe:</label>
            <input type="password" name="password" class="form-control">
            </div>
            <button type="submit" name="login" class="btn btn-primary">Connexion</button>
        </form>
        </div>

        <div class="col-md-4"></div>

        <div class="col-md-4">
        <h2>Inscription</h2>
        <form method="POST" action="signup.php">
            <div class="form-group my-2">
            <label>Nom d'utilisateur:</label>
            <input type="text" name="username" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Mot de passe:</label>
            <input type="password" name="password" class="form-control">
            </div>
            <div class="form-group my-2">
            <label>Confirmer le mot de passe:</label>
            <input type="password" name="confirm_password" class="form-control">
            </div>
            <button type="submit" name="signup" class="btn btn-primary">Inscription</button>
        </form>
        </div>

    </div>

    </div>
</div>