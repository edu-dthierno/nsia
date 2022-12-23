<script>
import { goto } from '$app/navigation';
import { onMount } from "svelte";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "$lib/firebase";
import { displayAlert, messageAlert } from "$lib/stores";

// When the component is mounted, check the authentication state of the user
onMount(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Access Granted...");
            let emailVerified = user.emailVerified;
            console.log(emailVerified);
        } else {
            // If the user is not authenticated, show an alert and redirect to the home page
            displayAlert.set(true);
            messageAlert.set("Vous devez vous connecter au préalable afin d'accéder à l'application.")
            console.log("Access Denied...");
            goto("/");
        }
    });
});

// Svelte variables
let code;
let status = true;
let answer;
let spinner;

// Function to send a code question to the OpenAI API and get a response
function getc(code) {
    console.log(code)
    spinner = true
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String("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")
        },
        body: JSON.stringify({
          'prompt': "You are an very intelligent ai capable of answering any question regarding python code only. If the question specified by the human is not related to python or coding in general, do not answer.Human:" + code + "\nAI: ",
          'temperature': 0,
          'max_tokens': 2048,
          'top_p': 1,
          'frequency_penalty': 0,
          'presence_penalty': 0,
        })
    };

    // Send the request to the OpenAI API and set the response as the value of the 'answer' variable
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
            spinner = false
            answer = data.choices[0].text
        }).catch(err => {
            console.log("Ran out of tokens for today! Try tomorrow!");
        });
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
    {#if answer}
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
                        <code>{answer}</code>
                    </div>
                    </div>
                </div>
            {/if}
          </div>
        {:else if spinner}
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    {/if}
</div>