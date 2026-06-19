<template>
    <main>
        <header>
            <NuxtLink class="website-title" to="/">NOA JETZER</NuxtLink>
        </header>

        <section class="main-content">
            <slot />
        </section>

        <!-- Curseur personnalisé -->
        <div class="inner-cursor"></div>
        <div class="outer-cursor"></div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    padding: 1em 0;
    justify-content: center;
    align-items: center;
}

header {
    position: fixed;
    top: 1em;
    z-index: 1;
}

header .website-title {
    font-size: 0.7em;
    color: #6D0016;
    text-decoration: none;
}

.main-content {
    width: 100%;
}
</style>