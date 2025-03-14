<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { tick } from "svelte";

  let testimonials = [];
  let error = null;
  let currentIndex = 0;
  let interval = null;

  // Load API endpoint from .env file
  const API_URL = import.meta.env.VITE_SANITY_TESTIMONIAL_API;
  const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
  const DATASET = import.meta.env.VITE_SANITY_DATASET;

  // Fetch testimonials from Sanity
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(API_URL);
      testimonials = response.data.result.map(testimonial => ({
        ...testimonial,
        imageUrl: testimonial.image?.asset?._ref
          ? `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${testimonial.image.asset._ref.replace("image-", "").replace("-png", ".png")}`
          : "https://via.placeholder.com/60" // Fallback image
      }));
    } catch (err) {
      error = "Failed to load testimonials";
      console.error(err);
    }
  };

  // Auto-slide testimonials
  const startAutoSlide = () => {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      tick(); // Ensure reactivity updates
    }, 5000); // Change slide every 5 seconds
  };

  // Initialize
  onMount(async () => {
    await fetchTestimonials();
    startAutoSlide();
  });
  const setCurrentIndex = (index) => {
  currentIndex = index;
  startAutoSlide(); // Restart auto-slide on manual navigation
};
</script>

<style>
  .slider-container {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .testimonial-slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  .testimonial-slide {
    min-width: 100%;
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .testimonial-slide.active {
    opacity: 1;
  }

  .testimonial-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .testimonial-content {
   font-family:  sans-serif , Arial;
    font-size: 15px;
    line-height: 1.5;
  
    font-weight: 300;

  }

  .testimonial-name {
    font-weight: bold;
    margin-top: 10px;
  }

  .testimonial-footer {
    font-size: 14px;
    color: #666;
  }

  .testimonial-footer a {
    color: #2196F3;
    text-decoration: none;
  }



  .dot-navigation {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .dot {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .dot.active {
    background-color: #2196F3;
  }

  .dot:hover {
    background-color: #007BFF;
  }
</style>

{#if error}
  <p>{error}</p>
{:else if testimonials.length === 0}
  <p>Loading testimonials...</p>
{:else}
<h2 style="margin-bottom:0;">Client Testimonials</h2>
  <div class="slider-container">
  <div class="testimonial-slider" style="transform: translateX(-{currentIndex * 100}%);">
    {#each testimonials as testimonial, i}
      <div class="testimonial-slide {i === currentIndex ? 'active' : ''}">
        <img src={testimonial.imageUrl} alt="Testimonial" class="testimonial-img" draggable="false">
        <div class="testimonial-content">
          <blockquote>
            <p>{testimonial.testimonial}</p>
            <footer class="testimonial-name">{testimonial.testiName}</footer>
            <cite class="testimonial-footer">
              <a rel="nofollow" href={testimonial.website} target="_blank">{testimonial.website}</a>
            </cite>
          </blockquote>
        </div>
      </div>
    {/each}
  </div>

  <!-- Dot Navigation -->
  <div class="dot-navigation">
    {#each testimonials as _, i}
      <button class="dot {i === currentIndex ? 'active' : ''}" on:click={() => setCurrentIndex(i)}></button>
    {/each}
  </div>
</div>

{/if}
