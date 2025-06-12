document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const imgInput = document.getElementById('imgInput');
    const addToGalleryBtn = document.getElementById('addToGallery');
    const imageGallery = document.getElementById('imageGallery'); // images in the gallery container
    const resizeFromGalleryBtn = document.getElementById('resizeFromGallery');
    const newHeight = document.getElementById('newH');
    const newWidth = document.getElementById('newW');
    const container = document.getElementById('resizedImg');
    const errorMessage = document.getElementById('errorMessage');
    
    // Store gallery images
    const galleryImages = [];
    let selected_img_path;
    let selectedId;

    function validateFile(file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSizeMB = 5;
        
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Only JPG, JPEG, and PNG images are supported');
        }
        
        if (file.size > maxSizeMB * 1024 * 1024) {
            throw new Error(`File too large (max ${maxSizeMB}MB)`);
        }
        
        return true;
    }
    
    // Initialize file input display
    imgInput.addEventListener('change', () => {
        const fileInfo = imgInput.nextElementSibling;
        if (imgInput.files.length > 0) {
            validateFile(imgInput.files[0]);
            fileInfo.textContent = `Selected: ${imgInput.files[0].name}`;
            // errorMessage.textContent = '';
        } else {
            fileInfo.textContent = 'Max size: 5MB';
        }
    });

    // Add to gallery functionality
    addToGalleryBtn.addEventListener('click', () => {
        if (!imgInput.files || imgInput.files.length === 0) {
            alert('Please select an image file');
            return;
        }
        
        const file = imgInput.files[0];
        
        // if (file.type !== 'image/jpeg') {
        //     alert('Only JPG images are supported');
        //     return;
        // }
        validateFile(file);

        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imgUrl = e.target.result;
            const imgId = `img-${Date.now()}`;
            
            // Add to gallery array
            galleryImages.push({
                id: imgId,
                url: imgUrl,
                file: file
            });
            
            // Add to gallery UI
            addImageToGalleryUI(imgId, imgUrl);
            
            // Add to select dropdown
            addImageToSelectDropdown(imgId);
            
            // Clear selection
            imgInput.value = '';
            imgInput.nextElementSibling.textContent = 'Max size: 5MB';
        };
        
        reader.readAsDataURL(file);
    });

    function setSelectedImage(selectedImageElement) {
        const allImages = imageGallery.querySelectorAll('img');

        allImages.forEach(img => {
            img.classList.remove('selectedImg');
        });

        if (selectedImageElement && selectedImageElement.tagName === 'IMG') {
            selectedImageElement.classList.add('selectedImg');
        }
    }

    imageGallery.addEventListener('click', (ev) => {

        if(ev.target.classList.contains('starter')) {
            const srcImgUrl = ev.target.src;
            const relativePath = new URL(srcImgUrl).pathname; 
            selected_img_path = relativePath.replace(/^\/?backend\//i, ''); 
            setSelectedImage(ev.target);
        } else if(ev.target.tagName === 'IMG'){
            const galleryItem = ev.target.closest('.gallery-item');
            if (galleryItem) {
                selectedId = galleryItem.dataset.id; // Update selectedId to match galleryImages
            }
            setSelectedImage(ev.target);
        }
    })
    
    // Add image to gallery UI
    function addImageToGalleryUI(imgId, imgUrl) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.id = imgId;
        
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = 'Gallery image';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromGallery(imgId);
        });
        
        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(deleteBtn);
        imageGallery.appendChild(galleryItem);
    }
    
    // Add image to select dropdown
    function addImageToSelectDropdown(imgId) {
        const option = document.createElement('option');
        option.value = imgId;
        option.textContent = `Image ${galleryImages.length}`;
        gallerySelect.appendChild(option);
    }
    
    // Remove from gallery function
    function removeFromGallery(id) {
        // Remove from array
        const index = galleryImages.findIndex(img => img.id === id);
        if (index !== -1) {
            galleryImages.splice(index, 1);
        }
        
        // Remove from UI
        const item = document.querySelector(`.gallery-item[data-id="${id}"]`);
        if (item) item.remove();
        
        // Remove from select
        const option = gallerySelect.querySelector(`option[value="${id}"]`);
        if (option) option.remove();
    }
    
    // Resize from gallery functionality
    resizeFromGalleryBtn.addEventListener('click', async () => {
        
        if (!newWidth.value || !newHeight.value) {
            alert('Please enter both width and height');
            return;
        }
        
        // Show loading state
        setLoadingState(resizeFromGalleryBtn, true);

        try {
            if (selected_img_path) {
                const res = await fetch("http://localhost:3000/resize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    imgInput: selected_img_path, 
                    width: parseInt(newWidth.value),
                    height: parseInt(newHeight.value),
                    }),
                });
                const blob = await res.blob();
                displayResizedImage(URL.createObjectURL(blob));
            } else {
                const selectedImage = galleryImages.find(img => img.id == selectedId);
                if (!selectedImage) return;
                
                const formData = new FormData();
                formData.append('imgInput', selectedImage.file);
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
                
                displayResizedImage(imgUrl);
            }
        } catch (error) {
            console.log(`An error occured while processign starter images : ${error}`)
        } finally {
            setLoadingState(resizeFromGalleryBtn, false);
        }}

        // const selectedId = gallerySelect.value;
        // if (!selectedId) {
        //     alert('Please select an image from the gallery');
        //     return;
        // }
    
    );
    
    // Function to display resized image
    function displayResizedImage(imgUrl) {
        const placeholder = container.querySelector('.result-placeholder');
        if (placeholder) placeholder.remove();
        
        // Clear previous result
        const oldResult = container.querySelector('.result-image-container');
        if (oldResult) oldResult.remove();
        
        // Create container for resized image and download button
        const containerDiv = document.createElement('div');
        containerDiv.className = 'result-image-container';
        
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = 'Resized image';
        imgElement.classList.add('result-image');
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadBtn.addEventListener('click', () => {
            downloadImage(imgUrl);
        });
        
        containerDiv.appendChild(imgElement);
        containerDiv.appendChild(downloadBtn);
        container.appendChild(containerDiv);
    }
    
    // Download image function
    function downloadImage(url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `resized-image-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    // Helper function for loading states
    function setLoadingState(button, isLoading) {
        if (isLoading) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            button.disabled = true;
        } else {
            button.innerHTML = '<i class="fas fa-magic"></i> Resize Image';
            button.disabled = false;
        }
    }
});