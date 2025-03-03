<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { PortableText } from "@portabletext/svelte";

  let titleDescription = null;

  onMount(async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_SANITY_API_TITLE_DESCRIPTION);
      console.log(response);
      console.log("API Response:", response.data);
      titleDescription = response.data.result[0] || null; // Ensure it's not undefined
    } catch (error) {
      console.error("Error fetching title and description:", error);
    }
  });

  // Define how to render bold text & links safely
  const components = {
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      link: ({ children, value }) => {
        return value?.href 
          ? `<a href="${value.href}" target="_blank" rel="noopener">${children}</a>` 
          : children; // If no href, return plain text
      }
    }
  };
</script>

{#if titleDescription}
  <section class="title-description">
    <h1>
      <PortableText value={titleDescription.title} components={components} />
    </h1>

    <p>
      <PortableText value={titleDescription.description} components={components} />
    </p>
  </section>
{:else}
  <p>Loading...</p>
{/if}

<style>
  .title-description {
    text-align: center;
    padding: 20px;
  }

  h1 strong {
    color: #ff5733; /* Style for bold text */
  }

  p a {
    color: blue;
    text-decoration: underline;
  }
</style>
