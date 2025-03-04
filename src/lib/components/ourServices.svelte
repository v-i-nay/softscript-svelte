<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let services = [];
  let error = null;

  // Load API endpoint from .env file
 const API_URL = import.meta.env.VITE_SANITY_SERVICE_API;

  onMount(async () => {
    try {
      const response = await axios.get(API_URL);
     services = response.data.result;
    } catch (err) {
      error = "Failed to load services";
      console.error(err);
    }
  });
</script>

<style>
  .serviceBox {
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .orangeBox { background: #ff9800; color: white; }
  .blueBox { background: #2196F3; color: white; }
  .service-icon { font-size: 40px; }
</style>

{#if error}
  <p>{error}</p>
{:else if services.length === 0}
  <p>Loading services...</p>
{:else}
  <div class="grid">
    {#each services as service}
      <div class="col-sm-6">
        <div class="serviceBox {service.colorClass}">
          <i class="service-icon {service.icon}"></i>
          <div class="service-content">
            <h5 class="title">{service.title}</h5>
            {#each service.description as block}
              <p class="description">{block.children[0].text}</p>
            {/each}
            <a rel="noopener" aria-label="Read more - opens in new tab" href="{service.link}" class="read-more">+ Read More</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}
