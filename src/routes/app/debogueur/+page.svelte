<script>
    import { Configuration, OpenAIApi } from "openai";

    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/firebase";
    import { displayAlert, messageAlert } from "$lib/stores";

    import { api } from "$lib/config";

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
    const configuration = new Configuration({organization: "org-Hpt3H8lGDxocIHdHpzAQec6X",apiKey: "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"});
    const openai = new OpenAIApi(configuration);

    // Svelte variables
    let code;
    let status = true;
    let response;

    async function getc(code) {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Please review the following code and provide corrections and explanations for any errors that may exist. The code is written in python. Here is the code: \n" + code + "\n Correction:  ",
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
      <h2>Saissez votre code</h2>
      <p class="my-3">Notre intelligence artificielle se chargera de déboguer votre code. Nous vous informons que notre IA est actuellement en phase de bêta. Cela signifie qu'elle est encore en cours de développement et qu'il est possible que certaines de ses réponses ne soient pas toujours précises ou complètes. Nous travaillons dur pour améliorer constamment sa performance et nous vous remercions de votre patience et de votre compréhension pendant cette phase de test.</p>
      <textarea class="form-control" id="code" rows="5" bind:value={code}></textarea>
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
                        <code>Correction: {response}</code>
                    </div>
                    </div>
                </div>
            {/if}
          </div>
    {/if}
</div>