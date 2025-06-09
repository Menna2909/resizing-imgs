document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const imgInput = document.getElementById('imgInput');
    const newHeight = document.getElementById('newH');
    const newWidth = document.getElementById('newW');
    const container = document.getElementById('resizedImg');
    const errorMessage = document.getElementById('errorMessage');
    
    imgInput.addEventListener('change', () => {
        const fileInfo = imgInput.nextElementSibling;
        if (imgInput.files.length > 0) {
            fileInfo.textContent = `Selected: ${imgInput.files[0].name}`;
            errorMessage.textContent = '';
        } else {
            fileInfo.textContent = 'Max size: 5MB';
        }
    });

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        errorMessage.textContent = '';
        
        if (!imgInput.files || imgInput.files.length === 0) {
            errorMessage.textContent = 'Please select an image file';
            return;
        }

        const file = imgInput.files[0];

        if (file.type !== 'image/jpeg') {
            errorMessage.textContent = 'Only JPG images are supported';
            return;
        }

        if (!newWidth.value || !newHeight.value) {
            errorMessage.textContent = 'Please enter both width and height';
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;

        // Clear previous result
        const oldResult = container.querySelector('.result-image');
        if (oldResult) oldResult.remove();

        try {
            const formData = new FormData();
            formData.append('imgInput', file);
            formData.append('height', newHeight.value);
            formData.append('width', newWidth.value);

            const response = await fetch('http://localhost:3000/uploads', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            
            const placeholder = container.querySelector('.result-placeholder');
            if (placeholder) placeholder.remove();
            
            const imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            imgElement.alt = 'Resized image';
            imgElement.classList.add('result-image');
            container.appendChild(imgElement);

            // Show success message
            errorMessage.textContent = '';
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Image resized successfully!';
            form.appendChild(successMsg);

            setTimeout(() => {
                successMsg.remove();
            }, 3000);

        } catch (err) {
            console.error('Error:', err);
            errorMessage.textContent = `Error: ${err.message}`;
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
});