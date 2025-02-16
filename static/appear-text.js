const lines = [
    document.getElementById("line1").getAttribute("data-text"),
    document.getElementById("line2").getAttribute("data-text")
];
const textElements = [document.getElementById("line1"), document.getElementById("line2")];
const cursor = document.getElementById("cursor");

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    if (!isDeleting) {
        if (charIndex < lines[lineIndex].length) {
            textElements[lineIndex].textContent += lines[lineIndex][charIndex];
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, 2000); // Pause before deleting
        }
    } else {
        if (charIndex > 0) {
            textElements[lineIndex].textContent = lines[lineIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeText, 40);
        } else {
            isDeleting = false;
            lineIndex = (lineIndex + 1) % lines.length;
            setTimeout(typeText, 500);
        }
    }

    // Move cursor to the right of the currently typed text
    cursor.style.marginLeft = textElements[lineIndex].textContent.length * 11 + "px"; 
}

// Start typing loop
typeText();
