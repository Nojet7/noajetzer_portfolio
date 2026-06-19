<script setup>
import data from '~/data/projects.json'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
const route = useRoute()

const projects = data.projects

const project = projects.find(
  p => p.slug === route.params.slug
)

if (!project) {
  throw createError({ statusCode: 404 })
}

const images = project.photos

const currentIndex = ref(0)
const direction = ref('next')

const next = () => {
  direction.value = 'next'
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prev = () => {
  direction.value = 'prev'
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length
}

const currentSrc = computed(() => images[currentIndex.value])

const isVideo = computed(() =>
  /\.(mp4|mov|webm)$/i.test(currentSrc.value)
)

/* -------------- READ MORE -------------------- */
const screenWidth = ref(0)

const updateWidth = () => {
  screenWidth.value = window.innerWidth
  if(screenWidth.value < 784) {
    readMoreState.value = true
  }
}

const readMoreState = ref(false)

function readMore() {
  readMoreState.value = true
}
function readLess() {
  readMoreState.value = false
}

onMounted(() => {
  updateWidth()
})
</script>

<template>
  <section class="project-page" :class="{ more: readMoreState }">
    <div class="image-container" :class="{ more: readMoreState }">
      <button id="prev-image" class="arrow-btn" @click="prev()"><span class="arrow arrow-left"></span></button>

      <div class="viewport">
        <transition-group :name="direction === 'next' ? 'slide' : 'slide-prev'" tag="div" class="track">
          <img v-if="!isVideo" class="project-image" :src="`../${images[currentIndex]}`" :alt="project.title"
            :key="currentIndex" />
          <video v-if="isVideo" class="project-image" :src="`../${images[currentIndex]}`" :alt="project.title"
            :key="currentIndex" autoplay playsinline muted loop></video>
        </transition-group>
      </div>

      <button id="next-image" class="arrow-btn" @click="next()"><span class="arrow arrow-right"></span></button>

      <button id="close-projects-overlay" class="close-btn" @click="$router.back()">Close</button>
    </div>
    <p class="description-project-photoView">{{ project.title }}, {{ project.date }}, {{ project.category }}</p>
    <p v-if="readMoreState" class="description-project">{{ project.description }}</p>

    <button v-if="!readMoreState" class="more-btn" @click="readMore()">Read more</button>
    <button v-if="readMoreState && screenWidth > 784" class="less-btn" @click="readLess()">Hide</button>
  </section>
</template>

<style scoped>
.project-page {
  padding: 2em 2em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7em;
  transition: 0.6s ease;
}

.image-container {
  width: 100%;
  height: calc(100dvh - 10em);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.6s ease;
}

.image-carousel {
  width: 100%;
  display: flex;
  justify-content: center;
}

.viewport {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-image {
  position: absolute;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
}

/* Hide the full-screen button */
video::-webkit-media-controls-fullscreen-button {
  display: none;
}

/* ---- SLIDE NEXT ---- */
.slide-enter-from {
  transform: translateX(100vw);
}

.slide-leave-to {
  transform: translateX(-100vw);
}

/* ---- SLIDE PREV ---- */
.slide-prev-enter-from {
  transform: translateX(-100vw);
}

.slide-prev-leave-to {
  transform: translateX(100vw);
}

.slide-enter-active,
.slide-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.6s ease;
}

.description-project-photoView {
  font-size: 1em;
  text-align: center;
}

.description-project {
  width: 60%;
}


/* ========== Bouton fermeture ========== */

.close-btn {
  font-family: 'Okular Code', monospace;
  font-size: 1rem;
  background: none;
  border: none;
  color: #888;
  z-index: 1;
  position: fixed;
  right: 2em;
  top: 1em;
  margin-top: 0;
}

.close-btn:hover {
  color: #6D0016;
  transition: color 0.3s ease;
}


/* ========== Flèches de naviguation section projects ========== */

.btn-container {
  display: flex;
  align-items: center;
}

.arrow-btn {
  background: none;
  border: none;
  z-index: 1;
  width: 5vmin;
  height: 5vmin;
  display: flex;
}

.arrow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: block;
}

.arrow-btn:hover .arrow::after {
  border-color: #6D0016;
  height: 100%;

}

.arrow-btn:hover .arrow::before {
  border-color: #6D0016;
  ;
}

#prev-image {
  left: 4em;
}

#next-image {
  right: 4em;
}

.arrow-left {
  transform: rotate(-135deg);
}

.arrow-right {
  transform: rotate(45deg);
}

.arrow::before {
  content: '';
  width: 100%;
  height: 100%;
  border-width: 0.3vmin 0.3vmin 0 0;
  border-style: solid;
  border-color: #888;
  display: block;
  transform-origin: 100% 0;
  transition: .2s ease;
}

.arrow::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-width: 0.3vmin 0.3vmin 0 0;
  border-style: solid;
  border-color: #888;
  transform-origin: 100% 0;
  transition: .2s ease;
}

/* ========== Bouton read more ========== */

.more-btn,
.less-btn {
  font-family: 'Okular Code', monospace;
  font-size: 1rem;
  background: none;
  border: none;
  color: #888;
  z-index: 1;
  width: fit-content;
  position: fixed;
  bottom: 2em;
  right: 2em;
}

.more-btn:hover,
.less-btn:hover {
  color: #6D0016;
  transition: color 0.3s ease;
}

/*  ================================================== ETAT DE READ MORE ACTIF ======================================================================= */

.more.image-container {
  width: 60%;
  height: 400px;
}

/*  ================================================== PHONE ======================================================================= */

@media (max-width: 784px) {
  .more.image-container {
    width: 100%;
    height: 400px;
  }

  .description-project {
    width: 100%;
  }
}
</style>