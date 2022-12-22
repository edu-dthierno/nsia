<script>
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth, getErrorMessage } from "$lib/firebase";

  import { userConnected, userCred } from "$lib/stores";
  import { goto } from "$app/navigation";

    export let showModal;


    let email = '';
    let password = '';

    let errMessage;

    function toggleModal() {
        showModal = !showModal;
    }


    async function handleSubmit() {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        // Set the user id in localstorage
        localStorage.setItem("uid", user.uid);

        // Save user in svelte stores
        userCred.set(user)
        userConnected.set(true)

        // Deactivate modal
        showModal = false;

        // redirect
        goto('/app')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(error);

        errMessage = errorMessage
      });
    }

</script>

{#if showModal}
<div class="modal position-fixed d-block bg-light" tabindex="-1" role="dialog" id="modalSignin">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content rounded-4 shadow">
      <div class="modal-header p-5 pb-4 border-bottom-0">
        <!-- <h1 class="modal-title fs-5" >Modal title</h1> -->
        <h1 class="fw-bold mb-0 fs-2">Connexion</h1>
        {#if errMessage}
        <p style="color: red; display: block;">{errMessage}</p>
        {/if}
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={toggleModal}></button>
      </div>
      <div class="modal-body p-5 pt-0">
        <form class="" on:submit|preventDefault={handleSubmit}>
          <div class="form-floating mb-3">
            <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="nom@exemple.com" bind:value={email} required>
            <label for="floatingInput">Adresse email</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Mot de passe" bind:value={password}>
            <label for="floatingPassword">Mot de passe</label>
          </div>
          <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Se connecter</button>
          <a href="/" on:click={toggleModal}>
          <small class="text-muted">Vous n'avez pas un compte?  Ici</small>
        </a>
        </form>
      </div>
    </div>
  </div>
</div>
{:else}
<div></div>
{/if}

<style>


</style>