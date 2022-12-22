<script>
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth, db, getErrorMessage } from "$lib/firebase";

  import { doc, setDoc } from "firebase/firestore";
  import { userConnected, userCred } from "$lib/stores";
  import { goto } from "$app/navigation";

  // authentication variables
  let email;
  let password;

  let errMessage;

  async function handleSubmit() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // user credentials such as email and id
        const user = userCredential.user;

        // Set the user id in localstorage
        localStorage.setItem("uid", user.uid);

        // Save user in svelte stores
        userCred.set(user);
        userConnected.set(true);

        // Creates a users document
        setDoc(doc(db, "users", user.uid), {
          Email: user.email,
        }).then(() => goto("/app"));

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(error);

        errMessage = errorMessage;
      });
  }
</script>

<!-- Hero Section -->
<section>
  <div class="row align-items-center g-lg-5 py-5">
    <div class="col-lg-7 text-center text-lg-start">
      <h1 class="display-4 fw-bold lh-1 mb-3">
        Améliorez votre compréhension du code
      </h1>
      <p class="col-lg-10 fs-4 mt-4">
        Notre application vous offre des outils puissants et une interface
        conviviale pour vous aider à déchiffrer votre code et à progresser dans
        votre parcours de programmeur. Inscrivez-vous maintenant et commencez à
        tirer le meilleur parti de votre code dès aujourd'hui!
      </p>
    </div>
    <div class="col-md-10 mx-auto col-lg-5">
      {#if errMessage}
        <p style="color: red; display: block;">{errMessage}</p>
      {/if}
      <form
        class="p-4 p-md-5 border rounded-3 bg-light"
        on:submit|preventDefault={handleSubmit}
      >
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            bind:value={email}
          />
          <label for="floatingInput">Adresse email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Mot de passe"
            bind:value={password}
          />
          <label for="floati  ngPassword">Mot de passe</label>
        </div>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Se souvenir de moi
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit"
          >S'inscrire</button
        >
        <hr class="my-4" />
        <small class="text-muted"
          >En cliquant sur S'inscrire, vous acceptez les conditions
          d'utilisation.</small
        >
      </form>
    </div>
  </div>
</section>

<!-- Features Section -->
<section id="fonctionnalites">
  <div class="container px-4 py-5" id="hanging-icons">
    <h2 class="pb-2 border-bottom">Fonctionnalités</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-1-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"
            />
          </svg>
        </div>
        <div>
          <h3 class="fs-2">Revue du code</h3>
          <p>
            Notre IA examine l'entièreté de votre code et fournit des
            corrections et des explications détaillées pour vous aider à
            améliorer vos compétences en codage.
          </p>
          <a href="/app" class="btn btn-primary">En savoir plus</a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-2-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z"
            />
          </svg>
        </div>
        <div>
          <h3 class="fs-2">Corrections de l'IA</h3>
          <p>
            Notre IA analyse votre code à la recherche d'erreurs et fournit des
            corrections pour vous faire gagner du temps et améliorer la qualité
            de votre code.
          </p>
          <a href="/app" class="btn btn-primary">En savoir plus</a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div
          class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-3-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z"
            />
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"
            />
          </svg>
        </div>
        <div>
          <h3 class="fs-2">Explications</h3>
          <p>
            Notre IA fournit des explications détaillées pour chaque correction,
            vous permettant de comprendre les raisons des changements et
            d'améliorer vos connaissances en codage.
          </p>
          <a href="/app" class="btn btn-primary">En savoir plus</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<div id="propos" class="bg-dark p-5 rounded" style="color: white; opacity: 1">
  <h1>NSIA OBJECTIF</h1>
  <p class="lead">
    NSIA est dédiée à aider les programmeurs à améliorer leur code et à résoudre
    des problèmes de programmation. Nous proposons un service de revue de code
    alimenté par l'IA qui analyse votre code et fournit des explications
    détaillées pour tous les problèmes ou améliorations potentielles.
  </p>
  <a class="btn btn-lg btn-primary" href="/" role="button"
    >En savoir plus &raquo;</a
  >
</div>

<style>
</style>
