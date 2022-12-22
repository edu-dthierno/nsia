<script>
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase";
    import { displayAlert, messageAlert } from "$lib/stores";

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Access Granted...");
                let emailVerified = user.emailVerified;
                console.log(emailVerified);
            } else {
                displayAlert.set(true);
                messageAlert.set("Vous devez vous connecter au préalable afin d'accéder à l'application.")
                console.log("Access Denied...");
                goto("/");
            }
        });
    });
</script>

<h2 class="my-5">Veuillez choisir un des services proposés ci-dessous</h2>
<div class="row">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Débogueur</h5>
          <p class="card-text">Le débogueur joue un rôle important dans le processus de développement de logiciels, car il contribue à s'assurer que le logiciel fonctionne correctement et de manière fiable. Corrigons les erreurs présents dans votre code!</p>
          <button on:click={() => goto('/app/debogueur')} class="btn btn-primary">commencez</button>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Aide avec code</h5>
          <p class="card-text">Notre IA peut vous aider à coder des choses que vous ne savez pas comment implémenter. Obtenez de l'aide et des conseils pour résoudre des problèmes de codage. Utilisez notre IA pour obtenir de l'aide.</p>
          <button on:click={() => goto('/app/aide-avec-code')} class="btn btn-primary">commencez</button>
        </div>
      </div>
    </div>
</div>