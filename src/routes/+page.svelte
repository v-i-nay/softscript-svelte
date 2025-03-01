<script>
  import { onMount } from "svelte";
  let artists = [];
  console.log("Sanity API URL:", import.meta.env.VITE_SANITY_API_URL);

  // Fetch data when the component mounts
  onMount(async () => {
    const response = await fetch(import.meta.env.VITE_SANITY_API_URL);
    const data = await response.json();
    artists = data.result; // Store artists in the variable
  });
</script>

<h1>Artists List</h1>
<ul>
  {#each artists as artist}
  
    <li>{artist.name}</li>
  {/each}
</ul>
