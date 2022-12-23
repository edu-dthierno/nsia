<script>
import LoginModal from "$lib/auth/LoginModal.svelte";
import PrimaryAlert from "$lib/alerts/PrimaryAlert.svelte";

// Importing the stores and functions from their respective files
import { displayAlert, messageAlert, userConnected, userCred } from "$lib/stores";
import { goto } from '$app/navigation';

// Importing the signOut function from the Firebase auth module and the auth object from the Firebase module
import { signOut } from "firebase/auth";
import { auth } from "$lib/firebase"

// Declaring variables to hold the values of the showAlert and messageAlert stores, as well as a flag to show the login modal
let showAlert;
let message;
let showModal = false;

// Declaring a variable to hold the value of the userConnected store
let isConnected;

// Subscribing to the displayAlert store and setting the value of the showAlert variable to the store value
displayAlert.subscribe(value => {
    showAlert = value
})

// Subscribing to the messageAlert store and setting the value of the message variable to the store value
messageAlert.subscribe(value => {
    message = value
})

// Subscribing to the userConnected store and setting the value of the isConnected variable to the store value
userConnected.subscribe(value => {
    isConnected = value
})

// Function to toggle the showModal flag
function toggleModal() {
    showModal = !showModal;
}

// Function to sign the user out and reset the relevant stores and local storage value
function disconnect() {
    // Navigating to the homepage
    goto('/')
    
    // Setting the userConnected store to false
    userConnected.set(false)
    
    // Setting the userCred store to undefined
    userCred.set(undefined)
    
    // Signing the user out and removing the uid value from local storage on success, or logging any errors
    signOut(auth).then(() => {
        localStorage.removeItem("uid")
        displayAlert.set(false)
    }).catch((error) => {
        console.log(error.message)
    });
}

// Setting a timeout to set the displayAlert store to false after 11 seconds
setTimeout(() => {
    displayAlert.set(false)
}, 11000)
</script>

<div class="bg">
    {#if showAlert}
        <PrimaryAlert {message} />
    {/if}
    
    <div id="main">
        <div class="container">
            
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <h4>NSIA</h4>
                <small class="px-1 text-info"> <b>Beta</b></small>
            </a>
        
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="/" class="nav-link px-2 link-dark">Acceuil</a></li>
                {#if isConnected}
                    <li><a href="/app" class="nav-link px-2 link-dark">Services</a></li>
                {/if}
                <li><a href="/#fonctionnalites" class="nav-link px-2 link-dark">Fonctionnalités</a></li>
                <li><a href="/#propos" class="nav-link px-2 link-dark">À propos</a></li>
            </ul>
        
            <div class="col-md-3 text-end">
                {#if isConnected}
                    <button type="button" class="btn btn-outline-primary me-2" on:click={disconnect}>Déconnexion</button>
                {:else}
                    <button type="button" class="btn btn-outline-primary me-2" on:click={toggleModal}>Connexion</button>
                    <button type="button" class="btn btn-primary" on:click={()=> {goto('/')}}>Inscription</button>
                {/if}
                
            </div>
            </header>

            <LoginModal {showModal}/>
        
            <slot></slot>
        
            <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Acceuil</a></li>
                <li class="nav-item"><a href="#fonctionnalites" class="nav-link px-2 link-dark">Fonctionnalités</a></li>
                <li class="nav-item"><a href="#propos" class="nav-link px-2 link-dark">À propos</a></li>
                <li class="nav-item"><a href="/politiques" class="nav-link px-2 link-dark">Politiques</a></li>
            </ul>
            <p class="text-center text-muted">&copy; 2022 Company, Inc</p>
            </footer>
        </div>
    </div>
</div>

<style>
    #main {
        background-image: url('');
        
    }
    .bg {
        background: linear-gradient(0deg, #FFFFFF 0%, #EFEFF2 50%, #FFFFFF 100%);
    }
</style>