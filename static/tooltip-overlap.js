document.querySelectorAll('.course-container').forEach(container => {
    let tooltip = container.querySelector('.course-description');

    container.addEventListener('mouseenter', function() {
        if (!tooltip) return;

        // Move tooltip to body
        document.body.appendChild(tooltip);

        // Get the container's position and width
        let rect = container.getBoundingClientRect();
        let tooltipWidth = tooltip.offsetWidth;

        // Center the tooltip below the container
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; // Adds a 5px gap
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2}px`; // Centers horizontally

        // Make the tooltip visible
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });

    container.addEventListener('mouseleave', function() {
        if (!tooltip) return;

        // Hide tooltip
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';

        // Move it back inside the course-container
        container.appendChild(tooltip);
    });
});
