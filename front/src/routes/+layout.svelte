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
</head>

<script>
    import { socketStore } from './socketStore';
</script>

<slot></slot>
