<template>
  <footer
    style="
      margin-top: 3rem;
      padding: 2rem;
      background-color: #f5f5f5;
      text-align: center;
      font-size: 0.9rem;
      color: #333;
    "
  >
    <p style="margin-bottom: 0.5rem">
      © {{ new Date().getFullYear() }} TicDrive ·
      <a
        class="underline"
        href="https://www.ticdrive.it/privacy-policy/app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Norme sulla privacy
      </a>
    </p>
    <p style="margin-bottom: 0.5rem">
      TicDrive è un'app mobile che consente agli utenti di cercare, confrontare
      e prenotare servizi auto presso officine locali.
    </p>
    <p>
      Utilizziamo l'accesso Google esclusivamente per autenticare in modo sicuro
      gli utenti. Nessun dato personale come email o contatti viene utilizzato
      per altri scopi.
    </p>
  </footer>
</template>
