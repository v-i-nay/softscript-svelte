<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let footer = null;
  let error = null;

  const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
  const DATASET = import.meta.env.VITE_SANITY_DATASET;
  const API_URL = import.meta.env.VITE_SANITY_FOOTER_API;

  // Fetch footer data from Sanity
  const fetchFooter = async () => {
    try {
      const response = await axios.get(API_URL);
      footer = response.data.result[0];
    } catch (err) {
      error = "Failed to load footer";
      console.error(err);
    }
  };

  onMount(fetchFooter);
</script>

<style>

  footer {
    background-size: cover;
    background-position: center;
    color: #fff;
    padding-top: 20px;
    text-align: center;
  }

  .get-intouch {
    padding: 50px 20px;
    text-align: center;
  }
  

  .get-intouch a {
    text-decoration: none;
    display: inline-block;
    font-size: 19px;
    padding: 12px 22px;
    font-style: normal;
    text-transform: capitalize;
    color: #fff !important;
    border: 2px solid #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-transition: all .2s ease-in-out 0s;
    -moz-transition: all .2s ease-in-out 0s;
    transition: all .2s ease-in-out 0s;
  }

  .subfooter .container {
    color:black;
  
  }
   .subfooter .container a {
    text-decoration:none;
  
  }

  .social-links a {
    color: #fff;
    margin: 0 10px;
    font-size: 20px;
    text-decoration: none;
  }
</style>

{#if error}
  <p>{error}</p>
{:else if !footer}
  <p>Loading footer...</p>
{:else}
  <footer >
    
    <!-- Call to Action Section -->
    <div class="get-intouch" style="background-image: url('https://cdn.sanity.io/images/{PROJECT_ID}/{DATASET}/{footer.footerImage.asset._ref.replace('image-', '').replace('-png', '.png')}');">
      {#each footer.title as block}
        {#each block.children as span}
          <h2>{span.text}</h2>
        {/each}
      {/each}
      <a href="{footer.ctaLink}">{footer.ctaText}</a>
    </div>

    <!-- Subfooter -->
    <div class="subfooter">
      <div class="container">
        <div class="row">
          <!-- Copyright -->
          <div class="col-md-6">
            <p>
              {#each footer.copyRight as block}
                {#each block.children as span}
                  {#if span.marks.length > 0}
                    {#each block.markDefs as mark}
                      {#if mark._key === span.marks[0]}
                        <a href="{mark.href}" class="styled-link">{span.text}</a>
                      {/if}
                    {/each}
                  {:else}
                    {span.text}
                  {/if}
                {/each}
              {/each}
            </p>
          </div>

          <!-- Social Links -->
          <div class="col-md-6 social-links">
            {#each footer.socialLinks as social}
              <a href="{social.url}" target="_blank">
                <img src="https://cdn.sanity.io/images/{PROJECT_ID}/{DATASET}/{social.icon.asset._ref.replace('image-', '').replace('-png', '.png')}" alt="{social.platform}" width="24">
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>

  </footer>
{/if}
