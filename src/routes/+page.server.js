import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$lib/firebase';
import { goto } from '$app/navigation';


/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    // register user with email and password using Firebase
    console.log(event.data);
  }
};