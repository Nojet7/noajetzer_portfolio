<script setup>
import data from '~/data/projects.json'
import { ref, onMounted, onUnmounted } from 'vue'

const projects = computed(() => [...data.projects].reverse())

// filtrer pour ne garder qu'un projet sur 2
const col1Projects = computed(() =>
    projects.value.filter((_, index) => index % 2 === 0)
)
const col2Projects = computed(() =>
    projects.value.filter((_, index) => index % 2 !== 0)
)

//Get random margin between 500px and 1500px
function getRandomMargin(id, lengthColumn) {
    if (id >= lengthColumn - 1) {
        return 0
    }
    return 100 + Math.floor(Math.random() * 200);
}

/* ===================== HORLOGE ====================== */
const time = ref('')
let intervalId
const updateClock = () => {
    time.value = new Date().toLocaleTimeString('fr-CH', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Zurich'
    })
}
onMounted(async () => {
    updateClock()
    intervalId = setInterval(updateClock, 1000)

    await preloadThumbnails()
})
onUnmounted(() => {
    clearInterval(intervalId)
})


/* --------------- GET CLOUDINARY IMAGE ---------------- */
const { resolve: resolveImage } = useCloudinaryImage()
const imageCache = new Map()

async function getImage(src) {
    if (imageCache.has(src)) return imageCache.get(src)

    const url = await resolveImage(src)

    const img = new Image()
    img.src = url

    imageCache.set(src, url)

    return url
}

const thumbnails = ref({})
async function preloadThumbnails() {
    const all = projects.value.map(async (p) => {
        const src = p.photos[0]
        const url = await getImage(src)

        thumbnails.value[p.slug] = url
    })

    await Promise.all(all)
}
</script>

<template>
    <div class="projects-page-container">
        <div class="location-clock">
            <p>LAUSANNE - SWITZERLAND</p>
            <p id="clock">{{ time }}</p>
        </div>

        <section class="desktop-portfolio-container">
            <div class="column-container" id="col1">
                <div v-for="(project, id) in col1Projects" :key="project.slug" class="project-card-container"
                    :style="{ marginBottom: `${getRandomMargin(id, col1Projects.length)}px` }">
                    <nuxt-link :to="`/projects/${project.slug}`" class="project-card-thumbnail-container">
                        <img class="project-card-thumbnail" loading="lazy" :src="thumbnails[project.slug]"
                            :alt="project.title">
                    </nuxt-link>
                    <nuxt-link :to="`/projects/${project.slug}`">
                        <h3 class="project-card-title">{{ project.title }}, {{ project.date }}, {{ project.category }}
                        </h3>
                    </nuxt-link>
                </div>
            </div>
            <div class="column-container" id="col2">
                <div v-for="(project, id) in col2Projects" :key="project.slug" class="project-card-container"
                    :style="{ marginBottom: `${getRandomMargin(id, col2Projects.length)}px` }">
                    <nuxt-link :to="`/projects/${project.slug}`" class="project-card-thumbnail-container">
                        <img class="project-card-thumbnail" loading="lazy" :src="thumbnails[project.slug]"
                            :alt="project.title">
                    </nuxt-link>
                    <nuxt-link :to="`/projects/${project.slug}`">
                        <h3 class="project-card-title">{{ project.title }}, {{ project.date }}, {{ project.category }}
                        </h3>
                    </nuxt-link>
                </div>
            </div>
        </section>

        <section class="mobile-portfolio-container">
            <div class="column-mobile-container">
                <div v-for="(project) in projects" :key="project.slug" class="mobile-project-card-container">
                    <nuxt-link :to="`/projects/${project.slug}`" class="project-card-thumbnail-container">
                        <img class="project-card-thumbnail" loading="lazy" :src="thumbnails[project.slug]"
                            :alt="project.title">
                    </nuxt-link>
                    <nuxt-link :to="`/projects/${project.slug}`">
                        <h3 class="project-card-title">{{ project.title }}, {{ project.date }}, {{ project.category }}
                        </h3>
                    </nuxt-link>
                </div>
            </div>
        </section>

        <footer>
            <p class="footer-title">NOA JETZER (SHE/HER) — B.A. IN GRAPHIC DESIGN, ECAL, 2026</p>
            <p><a href="mailto:contact@noajetzer.ch">CONTACT@NOAJETZER.CH</a></p>
            <p><a href="https://www.instagram.com/noajetzer/" target="_blank" rel="noopener noreferrer">@NOAJETZER</a></p>
        </footer>
    </div>
</template>

<style scoped>
.projects-page-container {
    margin-top: 1.5em;
}

.location-clock {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
    color: #888;
    font-family: 'Okular Code', monospace;
}

.desktop-portfolio-container,
.mobile-portfolio-container {
    width: 100%;
    max-width: 2000px;
    display: flex;
    gap: 16em;
    padding: 2em 4em;
}

.mobile-portfolio-container {
    display: none;
}

.column-container {
    width: calc(50% - 2em);
}

.column-mobile-container {
    display: flex;
    flex-direction: column;
    gap: 100px;
}

.project-card-container {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7em;
    font-size: 0.7em;
}

.mobile-project-card-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7em;
    font-size: 0.7em;
}

.project-card-thumbnail,
.project-card-thumbnail-container {
    max-width: 100%;
    max-height: 100%;
}


footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7em;
    font-size: 0.7em;
}

footer a {
    text-decoration: none;
}

@media (max-width: 784px) {
    .desktop-portfolio-container {
        display: none;
    }

    .mobile-portfolio-container {
        display: flex;
    }
}
</style>