export default defineNuxtPlugin(() => {
    const innerCursor = document.querySelector(".inner-cursor")
    const outerCursor = document.querySelector(".outer-cursor")
    if (!innerCursor || !outerCursor) return

    let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX
        mouseY = e.clientY
        innerCursor.style.left = `${mouseX}px`
        innerCursor.style.top = `${mouseY}px`
    });

    (function animate() {
        outerX += (mouseX - outerX) * 0.15
        outerY += (mouseY - outerY) * 0.15
        outerCursor.style.left = `${outerX}px`
        outerCursor.style.top = `${outerY}px`
        requestAnimationFrame(animate)
    })()

    const body = document.body

    const isClickable = el =>
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'INPUT' ||
        el.closest('a, button, input')

    document.addEventListener('mouseover', e => {
        if (isClickable(e.target)) {
            body.classList.add('cursor-hover')
        }
    })

    document.addEventListener('mouseout', e => {
        if (isClickable(e.target)) {
            body.classList.remove('cursor-hover')
        }
    })

    // RESET à chaque click
    document.addEventListener('click', () => {
        body.classList.remove('cursor-hover')
    })
})