<script>
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
<Header />

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
