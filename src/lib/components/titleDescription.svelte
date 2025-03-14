<script>
  import axios from 'axios';
  import { onMount } from 'svelte';

  export let apiUrl = import.meta.env.VITE_SANITY_API_TITLE_DESCRIPTION;
  let title = [];
  let description = [];

  async function fetchData() {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.result && data.result.length > 0) {
        let content = data.result[0];

        // Process title as an array for correct rendering
        title = content.title[0].children.map(t => ({
          text: t.text,
          isStrong: t.marks.includes('strong')
        }));

        // Process description as an array for proper rendering
        description = content.description.map(d => ({
          children: d.children.map(span => {
            let mark = d.markDefs.find(m => m._key === span.marks[0]);

            return {
              text: span.text,
              isStrong: span.marks.includes('strong'),
              isLink: mark && mark._type === 'link',
              href: mark ? mark.href : null
            };
          })
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(fetchData);
</script>

<svelte:head>
  <title>Softscripts</title>
</svelte:head>

<div class="max-widthcontainer">
  <!-- Title Section -->
  <h2>
    {#each title as t}
      {#if t.isStrong}
        <br><span>{t.text}</span>
      {:else}
        {t.text}
      {/if}
    {/each}
  </h2>

  <!-- Description Section -->
  <p class="soft-title-p">
    {#each description as d}
      {#each d.children as span}
        {#if span.isLink}
          <a href="{span.href}" target="_blank">{span.text}</a>
        {:else if span.isStrong}
          <strong>{span.text}</strong>
        {:else}
          {span.text}
        {/if}
      {/each}
    {/each}
  </p>
</div>

<style>
  h2 {
    text-align: center;
    font-size:44px;
  }

  h2 span {
    color: #339beb;
  }
  .max-widthcontainer {
    max-width: 96%;
    margin: auto;
    padding-top: 10px;
}

.soft-title-p{
    font-size: 25px;
    line-height: 40px;
    text-align: center;
}
.soft-title-p a{
text-decoration:none;
color: #339beb;
}

</style>
