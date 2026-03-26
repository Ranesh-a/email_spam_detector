document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const btnText = analyzeBtn.querySelector('.btn-text');
    const btnIcon = analyzeBtn.querySelector('.btn-icon');
    const loader = analyzeBtn.querySelector('.loader');
    
    const resultSection = document.getElementById('resultSection');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDesc');
    const confidenceBar = document.getElementById('confidenceBar');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const text = emailInput.value.trim();
        if (!text) return;

        // Set Loading State
        setLoadingState(true);
        resultSection.classList.add('hidden');

        try {
            // Simulated artificial delay for UX (to show animation)
            await new Promise(r => setTimeout(r, 800));

            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: text })
            });

            const data = await response.json();

            if (data.success) {
                showResult(data.prediction);
            } else {
                showError(data.error || 'Failed to analyze email.');
            }
        } catch (error) {
            showError('Network error occurred.');
        } finally {
            setLoadingState(false);
        }
    });

    function setLoadingState(isLoading) {
        if (isLoading) {
            analyzeBtn.disabled = true;
            btnText.classList.add('hidden');
            btnIcon.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            analyzeBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnIcon.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    function showResult(prediction) {
        // Reset classes
        resultSection.classList.remove('is-spam', 'is-ham', 'hidden');
        
        // Reset width to animate again
        confidenceBar.style.width = '0%';
        
        // Trigger reflow
        void confidenceBar.offsetWidth;

        if (prediction === 'spam') {
            resultSection.classList.add('is-spam');
            resultIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
            resultTitle.textContent = 'Spam Detected';
            resultDesc.textContent = 'This message has characteristics commonly found in spam.';
            
            // Random high confidence for visuals
            const confidence = 85 + Math.random() * 14; 
            confidenceBar.style.width = `${confidence}%`;
        } else {
            resultSection.classList.add('is-ham');
            resultIcon.innerHTML = '<i class="fa-solid fa-check-circle"></i>';
            resultTitle.textContent = 'Safe Message';
            resultDesc.textContent = 'This message appears to be genuine (ham).';
            
            const confidence = 85 + Math.random() * 14; 
            confidenceBar.style.width = `${confidence}%`;
        }

        // Scroll into view nicely
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showError(msg) {
        resultSection.classList.remove('is-spam', 'is-ham', 'hidden');
        resultSection.classList.add('is-spam'); // Style like spam for error
        
        resultIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        resultTitle.textContent = 'Error';
        resultDesc.textContent = msg;
        confidenceBar.style.width = '0%';
    }
});
