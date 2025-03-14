<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let services = [];
  let error = null;

  // Load API endpoint from .env file
  const API_URL = import.meta.env.VITE_SANITY_SERVICE_API;
  const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
  const DATASET = import.meta.env.VITE_SANITY_DATASET;

  // Function to construct Sanity image URLs using their CDN
  function getSanityImageUrl(imageRef) {
    if (!imageRef) return "";
    const baseUrl = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/`;
    const [, imageId, dimensions, format] = imageRef.split("-"); // Extract parts
    return `${baseUrl}${imageId}-${dimensions}.${format}`;
  }

  onMount(async () => {
    try {
      const response = await axios.get(API_URL);
      services = response.data.result.map(service => ({
        ...service,
        iconUrl: service.icon && service.icon.asset?._ref 
          ? getSanityImageUrl(service.icon.asset._ref) 
          : "" // Generate image URL
      }));
    } catch (err) {
      error = "Failed to load services";
      console.error(err);
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else if services.length === 0}
  <p>Loading services...</p>
{:else}
  <h2 class="soft-service-title">Our Services</h2>
  <div class="grid">
    {#each services as service}
      <div class="col-sm-6">
        <div class="serviceBox {service.colorClass}">
          <i
            class="service-icon"
            style="background-image: url('{service.iconUrl}');"
          ></i>
          <div class="service-content effect-border">
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




<style>
  .serviceBox {
   padding-left: 30px;
    position: relative;
    margin-bottom: 30px;
  }
  .serviceBox .service-content {
    padding: 30px;
    border-width: 1px;
    background-color: #fff;
    border-style: solid;
    border-color: #d5d5d5;
    position: relative;
    min-height: 345px;
    transition: all .4s ease-in-out 0s;
}

.effect-border {
    position: relative;
    -webkit-transition: color 2s;
    transition: color 2s;
    box-shadow: inset 0 0 0 5px #fff;
}


  .service-icon { font-size: 40px; }
  .grid{
      display: grid;
    grid-template-columns: 1fr 1fr;
    gap:15px;
}
.service-content .title{
      font-size: 18px;
    font-weight: 600;
    color: #333;
    padding-left: 30px;
    margin-bottom: 35px;
    text-transform: capitalize;
    

}

.description{
      -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    font-family:  sans-serif , Arial;
    font-size: 15px;
    line-height: 1.5;
  
    font-weight: 300;

}
.serviceBox .read-more {
    position: absolute;
    margin-top: 18px;
    text-decoration: none;
    bottom: 0;
    right: 0;
    z-index: 3;
    text-align: center;
    padding: 6px 15px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    background-color:black;
}
.blueBox .read-more {
  
  background-color:#3d576a;
}
.orangeBox 
.read-more {
 background-color:#f27744;
}
.serviceBox .service-icon {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    
    font-size: 30px;
    color: #fff;
    position: absolute;
    top: 15px;
    left: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 40px auto;
}
.orangeBox
i{
    background-color:#f27744;
    
}
.blueBox 
i{
 background-color:#3d576a;
  
}

</style>