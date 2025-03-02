<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let banner = null;

  // onMount should be inside the component script
  onMount(async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SANITY_API_BANNER);
      console.log(response);
      banner = response.data.result[0]; // Get first banner
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  });

  function getImageUrl(ref) {
    if (!ref) return "";
    const parts = ref.split("-");
    return `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${import.meta.env.VITE_SANITY_DATASET}/${parts[1]}-${parts[2]}.${parts[3]}`;
  }
</script>

{#if banner}
  <section
    class="banner"
    style="background-image: url('{getImageUrl(banner.image.asset._ref)}');"
  >
    <div class="overlay">
      <h2>
        {#each banner.title[0]?.children as child}
          {#if child.marks && child.marks.includes("strong")}
            <strong>{child.text}</strong>
          {:else}
            {child.text}
          {/if}
        {/each}
      </h2>

      <p>{banner.description}</p>

      <a href={banner.buttonLink.current}>
        <button class="btn">{banner.buttonText}</button>
      </a>
    </div>
  </section>
{:else}
  <p>Loading...</p>
{/if}

<style>
body{
  margin:0 !important;
}
  .banner {
    position: relative;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
  }
  .banner:after {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.55);
}

  .overlay {
   
    color: white;
    text-align: center;
    padding: 20px;
    width: 100%;
  }

 h2 {
    font-size: 35px;
}
  strong{
    color:#339beb;
  }

  p {
    font-size: 1.2rem;
    margin: 10px 0;
  }

.btn {
    font-size: 18px;
    padding: 10px 30px;
    border: 3px solid #fff;
    color: #fff;
    font-weight: 700;
    outline: 0;
    border-radius: 30px;
     background-color: transparent;
}

.btn:hover,
.btn:focus {
    background-color: #fff;
    color: #000
}
</style>
