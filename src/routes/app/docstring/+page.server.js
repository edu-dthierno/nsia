import { SECRET_OPENAI_API_KEY } from '$env/static/private'

export const load = () => {
  console.log(SECRET_OPENAI_API_KEY) // secret
  return {api: {openai: SECRET_OPENAI_API_KEY }}
}