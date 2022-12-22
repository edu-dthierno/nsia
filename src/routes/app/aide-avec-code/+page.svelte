<script>
    import { Configuration, OpenAIApi } from "openai";

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
    
    // Open AI configuration
    const configuration = new Configuration({apiKey: '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'});
    const openai = new OpenAIApi(configuration);

    // Svelte variables
    let code;
    let status = true;
    let response;

    async function getc(code) {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "You are an very intelligent ai capable of answering any question regarding python code only. If the question specified by the human is not related to python or coding in general, do not answer.Human:" + code + "\nAI: ",
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }); 
        response = completion.data.choices[0].text
    }

</script>


<form>
    <div class="form-group">
      <h2>Sur quoi avez-vous besoin d'aide? Posez votre question sous-dessus.</h2>
      <p class="my-3">Notre intelligence artificielle se chargera de déboguer votre code. Nous vous informons que notre IA est actuellement en phase de bêta. Cela signifie qu'elle est encore en cours de développement et qu'il est possible que certaines de ses réponses ne soient pas toujours précises ou complètes. Nous travaillons dur pour améliorer constamment sa performance et nous vous remercions de votre patience et de votre compréhension pendant cette phase de test.</p>
      <input class="form-control" id="code" bind:value={code} />
      <button type="button" class="btn btn-primary my-4" on:click={() => getc(code)}>Envoyer</button>
    </div>
</form>
<div>
    {#if response}
        <div class="accordion my-3" id="accordionExample">
            {#if status}   
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <h2>Réponse</h2>
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <code>{response}</code>
                    </div>
                    </div>
                </div>
            {/if}
          </div>
    {/if}
</div>