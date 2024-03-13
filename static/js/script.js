document.addEventListener('DOMContentLoaded', function() {
    // Code for Smile Capture Page (smile_capture.html)
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snapBtn = document.getElementById('snapBtn');

    // Access the user's camera and stream the video
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });

    // Function to capture an image from the live video stream
    snapBtn.addEventListener('click', function() {
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Display captured image
        const imageContainer = document.querySelector('.image-container');
        const capturedImage = document.createElement('img');
        capturedImage.src = canvas.toDataURL('image/jpeg');
        capturedImage.classList.add('captured-image');
        imageContainer.innerHTML = '';
        imageContainer.appendChild(capturedImage);

        // Show popup
        const popup = document.getElementById('popup');
        popup.style.display = 'block';

        // Hide popup after 2 seconds
        setTimeout(function() {
            popup.style.display = 'none';
        }, 2000);
    });

    // Code for Personal Details Page (personal_details.html)
    const personalForm = document.getElementById('personalForm');

    personalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Perform form validation
        if (validatePersonalForm()) {
            // Redirect to card capture page
            window.location.href = '/card_capture';
        }
    });

    // Function to validate the personal details form
    function validatePersonalForm() {
        // Perform validation logic here
        return true; // For now, assume validation always succeeds
    }
});

// Code for Card Capture Page (card_capture.html)
document.addEventListener('DOMContentLoaded', function() {
    const aadharVideo = document.getElementById('aadharVideo');
    const panVideo = document.getElementById('panVideo');
    const aadharCaptureBtn = document.getElementById('aadharCaptureBtn');
    const panCaptureBtn = document.getElementById('panCaptureBtn');

    // Start camera streams
    startCamera(aadharVideo);
    startCamera(panVideo);

    // Function to start camera stream
    function startCamera(videoElement) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoElement.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing camera:', err);
                alert('Error accessing camera. Please ensure camera access is allowed.');
            });
    }

    // Function to capture image from video stream
    function captureImage(videoElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg');
    }

    // Event listener for Aadhar capture button
    aadharCaptureBtn.addEventListener('click', function() {
        const aadharImgData = captureImage(aadharVideo);
        const aadharImgElement = document.createElement('img');
        aadharImgElement.src = aadharImgData;
        aadharImgElement.width = 200;
        aadharImgElement.height = 150;
        const imageContainer = aadharCaptureBtn.previousElementSibling;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(aadharImgElement);
    });

    // Event listener for PAN capture button
    panCaptureBtn.addEventListener('click', function() {
        const panImgData = captureImage(panVideo);
        const panImgElement = document.createElement('img');
        panImgElement.src = panImgData;
        panImgElement.width = 200;
        panImgElement.height = 150;
        const imageContainer = panCaptureBtn.previousElementSibling;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(panImgElement);
    });
});
