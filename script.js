document.addEventListener("DOMContentLoaded", function () {
 
    const imageList = [
        // "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D",
        // "https://unsplash.com/photos/woman-standing-on-rock-facing-forest-Dqx4XWuXu7w",
        // "https://unsplash.com/photos/woman-stretching-on-mountain-top-during-sunrise-I2YSmEUAgDY",
        "https://source.unsplash.com/800x600/?yoga",
        "https://source.unsplash.com/800x600/?meditation",
        "https://source.unsplash.com/800x600/?mindfulness",
    ];

    const imageContainer = document.getElementById("image-container");
    const dynamicImage = document.getElementById("dynamic-image");

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * imageList.length);
        return imageList[randomIndex];
    }

    // Set a random image on page load
    dynamicImage.src = getRandomImage();

    // Change the image on each reload or click (you can choose the event)
    imageContainer.addEventListener("click", function () {
        dynamicImage.src = getRandomImage();
    });
});
