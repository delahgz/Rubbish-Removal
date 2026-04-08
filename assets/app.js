(function() {
'use strict';

// Mobile Navigation
var navToggle = document.getElementById('navToggle');
var mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
}

// Sticky Header Shadow
var siteHeader = document.getElementById('siteHeader');
if (siteHeader) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });
}

// FAQ Accordion
var faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
        var faqItem = this.parentElement;
        var isActive = faqItem.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(item) {
            item.classList.remove('active');
            var btn = item.querySelector('.faq-question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            faqItem.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
        }
    });
});

// General Accordion
var accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
        var accordionItem = this.parentElement;
        var isActive = accordionItem.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(function(item) {
            item.classList.remove('active');
            var btn = item.querySelector('.accordion-header');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            accordionItem.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
        }
    });
});

// Filter Pills
var filterPills = document.querySelectorAll('.pill');
var itemChips = document.querySelectorAll('.item-chip');
if (filterPills.length > 0 && itemChips.length > 0) {
    filterPills.forEach(function(pill, index) {
        pill.addEventListener('click', function() {
            activateFilter(this);
        });
        pill.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateFilter(this);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                var nextPill = filterPills[index + 1] || filterPills[0];
                nextPill.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                var prevPill = filterPills[index - 1] || filterPills[filterPills.length - 1];
                prevPill.focus();
            }
        });
    });
    function activateFilter(pill) {
        var filterValue = pill.getAttribute('data-filter');
        filterPills.forEach(function(p) {
            p.classList.remove('active');
            p.setAttribute('aria-selected', 'false');
            p.setAttribute('tabindex', '-1');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        pill.setAttribute('tabindex', '0');
        itemChips.forEach(function(chip) {
            var category = chip.getAttribute('data-category');
            if (filterValue === 'all') {
                chip.classList.remove('hidden');
            } else {
                if (category === filterValue) {
                    chip.classList.remove('hidden');
                } else {
                    chip.classList.add('hidden');
                }
            }
        });
    }
}

// Instant Price Calculator
var volumeSlider = document.getElementById('volumeSlider');
var volumeOutput = document.getElementById('volumeOutput');
var wasteType = document.getElementById('wasteType');
var accessType = document.getElementById('accessType');
var priceMin = document.getElementById('priceMin');
var priceMax = document.getElementById('priceMax');

function calculatePrice() {
    if (!volumeSlider || !priceMin || !priceMax) return;
    
    var volume = parseFloat(volumeSlider.value);
    var basePrice = 99;
    var pricePerCubic = 65;
    
    // Base calculation
    var minPrice = basePrice + (volume * pricePerCubic * 0.85);
    var maxPrice = basePrice + (volume * pricePerCubic * 1.15);
    
    // Waste type multiplier
    if (wasteType) {
        var waste = wasteType.value;
        if (waste === 'heavy') {
            minPrice *= 1.3;
            maxPrice *= 1.4;
        } else if (waste === 'green') {
            minPrice *= 0.9;
            maxPrice *= 0.95;
        } else if (waste === 'mixed') {
            minPrice *= 1.1;
            maxPrice *= 1.2;
        }
    }
    
    // Access multiplier
    if (accessType) {
        var access = accessType.value;
        if (access === 'stairs') {
            minPrice *= 1.15;
            maxPrice *= 1.2;
        } else if (access === 'difficult') {
            minPrice *= 1.25;
            maxPrice *= 1.3;
        }
    }
    
    // Minimum callout
    minPrice = Math.max(minPrice, 149);
    maxPrice = Math.max(maxPrice, 179);
    
    priceMin.textContent = '$' + Math.round(minPrice);
    priceMax.textContent = '$' + Math.round(maxPrice);
    
    if (volumeOutput) {
        volumeOutput.textContent = volume + 'm³';
    }
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', calculatePrice);
    if (wasteType) wasteType.addEventListener('change', calculatePrice);
    if (accessType) accessType.addEventListener('change', calculatePrice);
    calculatePrice();
}

// Postcode Checker
var postcodeForm = document.getElementById('postcodeForm');
var postcodeInput = document.getElementById('postcodeInput');
var postcodeResult = document.getElementById('postcodeResult');

// Sydney postcodes
var sydneyPostcodes = [];
for (var i = 2000; i <= 2234; i++) sydneyPostcodes.push(i.toString());
for (var j = 2555; j <= 2574; j++) sydneyPostcodes.push(j.toString());
for (var k = 2745; k <= 2770; k++) sydneyPostcodes.push(k.toString());

if (postcodeForm) {
    postcodeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var postcode = postcodeInput.value.trim();
        
        if (postcode.length !== 4 || isNaN(postcode)) {
            postcodeResult.textContent = 'Please enter a valid 4-digit postcode';
            postcodeResult.className = 'postcode-result unavailable';
            return;
        }
        
        if (sydneyPostcodes.indexOf(postcode) !== -1) {
            postcodeResult.innerHTML = '<strong>Same day service available!</strong> Call now or book online.';
            postcodeResult.className = 'postcode-result available';
        } else {
            postcodeResult.textContent = 'We service Sydney metro only. Call to discuss options.';
            postcodeResult.className = 'postcode-result unavailable';
        }
    });
}

// Photo Upload
var photoUpload = document.getElementById('photoUpload');
var photoInput = document.getElementById('photoInput');
var photoPreview = document.getElementById('photoPreview');
var uploadedPhotos = [];

if (photoUpload && photoInput) {
    photoUpload.addEventListener('click', function() {
        photoInput.click();
    });
    
    photoUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    photoUpload.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    photoUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
    
    photoInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    function handleFiles(files) {
        for (var i = 0; i < files.length && uploadedPhotos.length < 5; i++) {
            var file = files[i];
            if (file.type.startsWith('image/')) {
                uploadedPhotos.push(file);
                displayPhoto(file);
            }
        }
        updatePhotoCount();
    }
    
    function displayPhoto(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            
            var img = document.createElement('img');
            img.src = e.target.result;
            
            var removeBtn = document.createElement('button');
            removeBtn.className = 'remove-photo';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = function() {
                var index = Array.from(photoPreview.children).indexOf(wrapper);
                uploadedPhotos.splice(index, 1);
                wrapper.remove();
                updatePhotoCount();
            };
            
            wrapper.appendChild(img);
            wrapper.appendChild(removeBtn);
            photoPreview.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
    }
    
    function updatePhotoCount() {
        var hint = photoUpload.querySelector('.upload-hint');
        if (hint) {
            hint.textContent = uploadedPhotos.length + '/5 photos added';
        }
    }
}

// Quote Widget with Photo Integration
var getEstimateBtn = document.getElementById('getEstimate');
var widgetResult = document.getElementById('widgetResult');
var widgetSuburb = document.getElementById('widgetSuburb');
var widgetType = document.getElementById('widgetType');
var widgetVolume = document.getElementById('widgetVolume');

if (getEstimateBtn && widgetResult) {
    getEstimateBtn.addEventListener('click', function() {
        var suburb = widgetSuburb ? widgetSuburb.value.trim() : '';
        var type = widgetType ? widgetType.value : '';
        var volume = widgetVolume ? widgetVolume.value : '';
        
        if (!suburb || !type || !volume) {
            widgetResult.innerHTML = '<strong>Please complete all fields</strong> to get an estimate.';
            widgetResult.className = 'widget-result active';
            return;
        }
        
        var prices = {
            small: { min: 149, max: 199 },
            medium: { min: 249, max: 349 },
            large: { min: 399, max: 549 },
            xlarge: { min: 599, max: 899 }
        };
        
        var range = prices[volume] || prices.medium;
        var photoText = uploadedPhotos && uploadedPhotos.length > 0 
            ? ' We received your ' + uploadedPhotos.length + ' photo(s).' 
            : '';
        
        widgetResult.innerHTML = '<strong>Estimated price: $' + range.min + ' - $' + range.max + '</strong><br>' +
            'For ' + volume + ' load in ' + suburb + '.' + photoText + '<br><br>' +
            '<a href="tel:1300000000" style="color:var(--accent);font-weight:600;">Call 1300 000 000</a> to confirm and book.';
        widgetResult.className = 'widget-result active success';
    });
}

// Booking Calendar
var calendarDates = document.getElementById('calendarDates');
var calendarMonth = document.getElementById('calendarMonth');
var prevMonthBtn = document.getElementById('prevMonth');
var nextMonthBtn = document.getElementById('nextMonth');
var timeSlots = document.querySelectorAll('.time-slot:not(.unavailable)');
var selectedDate = null;
var selectedTime = null;
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();

function renderCalendar() {
    if (!calendarDates || !calendarMonth) return;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    calendarMonth.textContent = months[currentMonth] + ' ' + currentYear;
    
    calendarDates.innerHTML = '';
    
    var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    var today = new Date();
    
    // Empty cells for days before first of month
    for (var i = 0; i < firstDay; i++) {
        var empty = document.createElement('div');
        empty.className = 'calendar-date disabled';
        calendarDates.appendChild(empty);
    }
    
    // Days of month
    for (var day = 1; day <= daysInMonth; day++) {
        var dateEl = document.createElement('div');
        dateEl.className = 'calendar-date';
        dateEl.textContent = day;
        
        var thisDate = new Date(currentYear, currentMonth, day);
        var dayOfWeek = thisDate.getDay();
        
        // Disable past dates and Sundays
        if (thisDate < today || dayOfWeek === 0) {
            dateEl.classList.add('disabled');
        } else {
            dateEl.classList.add('available');
            dateEl.addEventListener('click', function() {
                document.querySelectorAll('.calendar-date').forEach(function(d) {
                    d.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedDate = this.textContent;
            });
        }
        
        calendarDates.appendChild(dateEl);
    }
}

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

renderCalendar();

// Time Slots
timeSlots.forEach(function(slot) {
    slot.addEventListener('click', function() {
        timeSlots.forEach(function(s) {
            s.classList.remove('selected');
        });
        this.classList.add('selected');
        selectedTime = this.textContent;
    });
});

// Book Now Button
var bookNowBtn = document.getElementById('bookNow');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', function() {
        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time slot');
            return;
        }
        var bookingDetails = 'Date: ' + selectedDate + ' ' + calendarMonth.textContent + ', Time: ' + selectedTime;
        window.location.href = 'tel:1300000000';
    });
}

// Gallery Filter
var galleryFilters = document.querySelectorAll('.gallery-filter');
var galleryItems = document.querySelectorAll('.gallery-item');

galleryFilters.forEach(function(filter) {
    filter.addEventListener('click', function() {
        galleryFilters.forEach(function(f) { f.classList.remove('active'); });
        this.classList.add('active');
        
        var category = this.getAttribute('data-category');
        galleryItems.forEach(function(item) {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// WhatsApp message builder
var whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        var message = 'Hi, I need a quote for rubbish removal.';
        if (widgetSuburb && widgetSuburb.value) {
            message += ' Location: ' + widgetSuburb.value + '.';
        }
        if (widgetVolume && widgetVolume.value) {
            message += ' Estimated size: ' + widgetVolume.value + '.';
        }
        this.href = 'https://wa.me/61400000000?text=' + encodeURIComponent(message);
    });
});

// Multi-step Booking Wizard
var wizardState = { name: '', phone: '', suburb: '', items: '', date: '', time: '' };

document.querySelectorAll('.wizard-next').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var nextStep = this.getAttribute('data-next');
        var currentPanel = this.closest('.wizard-panel');
        
        // Validate current step
        if (currentPanel.getAttribute('data-panel') === '1') {
            var nameInput = document.getElementById('wizardName');
            var phoneInput = document.getElementById('wizardPhone');
            var suburbInput = document.getElementById('wizardSuburb');
            var itemsInput = document.getElementById('wizardItems');
            
            if (!nameInput.value || !phoneInput.value || !suburbInput.value) {
                alert('Please fill in all required fields');
                return;
            }
            
            wizardState.name = nameInput.value;
            wizardState.phone = phoneInput.value;
            wizardState.suburb = suburbInput.value;
            wizardState.items = itemsInput.value;
        }
        
        if (currentPanel.getAttribute('data-panel') === '2') {
            var selectedDateEl = document.querySelector('.calendar-date.selected');
            if (!selectedDateEl) {
                alert('Please select a date');
                return;
            }
            var calendarMonthEl = document.getElementById('calendarMonth');
            wizardState.date = selectedDateEl.textContent + ' ' + (calendarMonthEl ? calendarMonthEl.textContent : '');
        }
        
        if (currentPanel.getAttribute('data-panel') === '3') {
            var selectedTime = document.querySelector('input[name="timeSlot"]:checked');
            if (!selectedTime) {
                alert('Please select a time slot');
                return;
            }
            wizardState.time = selectedTime.value;
        }
        
        goToWizardStep(nextStep);
    });
});

document.querySelectorAll('.wizard-back').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var backStep = this.getAttribute('data-back');
        goToWizardStep(backStep);
    });
});

function goToWizardStep(step) {
    document.querySelectorAll('.wizard-panel').forEach(function(panel) {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.wizard-step').forEach(function(stepEl) {
        var stepNum = stepEl.getAttribute('data-step');
        stepEl.classList.remove('active', 'completed');
        if (parseInt(stepNum) < parseInt(step)) {
            stepEl.classList.add('completed');
        }
        if (stepNum === step) {
            stepEl.classList.add('active');
        }
    });
    
    var targetPanel = document.querySelector('.wizard-panel[data-panel="' + step + '"]');
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Update summary on step 4
    if (step === '4') {
        document.getElementById('summaryName').textContent = wizardState.name || '-';
        document.getElementById('summaryPhone').textContent = wizardState.phone || '-';
        document.getElementById('summarySuburb').textContent = wizardState.suburb || '-';
        document.getElementById('summaryDate').textContent = wizardState.date || '-';
        document.getElementById('summaryTime').textContent = wizardState.time || '-';
        document.getElementById('summaryItems').textContent = wizardState.items || '-';
    }
}

var submitBookingBtn = document.getElementById('submitBooking');
if (submitBookingBtn) {
    submitBookingBtn.addEventListener('click', function() {
        var successDetails = document.getElementById('successDetails');
        if (successDetails) {
            successDetails.innerHTML = '<div class="summary-row"><span>Date:</span><span>' + wizardState.date + '</span></div>' +
                '<div class="summary-row"><span>Time:</span><span>' + wizardState.time + '</span></div>' +
                '<div class="summary-row"><span>Phone:</span><span>' + wizardState.phone + '</span></div>';
        }
        goToWizardStep('success');
    });
}

// PDF Quote Download
var downloadQuoteBtn = document.getElementById('downloadQuote');
if (downloadQuoteBtn) {
    downloadQuoteBtn.addEventListener('click', function() {
        var volume = document.getElementById('volumeOutput') ? document.getElementById('volumeOutput').textContent : '4m³';
        var wasteType = document.getElementById('wasteType') ? document.getElementById('wasteType').options[document.getElementById('wasteType').selectedIndex].text : 'General household';
        var accessType = document.getElementById('accessType') ? document.getElementById('accessType').options[document.getElementById('accessType').selectedIndex].text : 'Easy';
        var priceMin = document.getElementById('priceMin') ? document.getElementById('priceMin').textContent : '$299';
        var priceMax = document.getElementById('priceMax') ? document.getElementById('priceMax').textContent : '$399';
        
        var quoteDate = new Date().toLocaleDateString('en-AU');
        var quoteRef = 'Q' + Date.now().toString().slice(-6);
        
        var quoteHTML = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Quote - Rubbish Removal Sydney</title>' +
            '<style>body{font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:0 auto}' +
            'h1{color:#0B1220;margin-bottom:8px}' +
            '.header{border-bottom:2px solid #0D9488;padding-bottom:20px;margin-bottom:24px}' +
            '.ref{color:#666;font-size:14px}' +
            '.section{margin-bottom:24px}' +
            '.section h3{color:#0D9488;margin-bottom:12px;font-size:16px}' +
            '.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}' +
            '.row:last-child{border-bottom:none}' +
            '.row span:first-child{color:#666}' +
            '.row span:last-child{font-weight:bold}' +
            '.price-box{background:#f5f7fb;padding:20px;border-radius:8px;text-align:center;margin:24px 0}' +
            '.price{font-size:28px;font-weight:bold;color:#0D9488}' +
            '.note{font-size:14px;color:#666;margin-top:8px}' +
            '.footer{margin-top:32px;padding-top:20px;border-top:1px solid #eee;font-size:13px;color:#666}' +
            '</style></head><body>' +
            '<div class="header"><h1>Rubbish Removal Sydney</h1><p class="ref">Quote Reference: ' + quoteRef + ' | Date: ' + quoteDate + '</p></div>' +
            '<div class="section"><h3>Job Details</h3>' +
            '<div class="row"><span>Estimated Volume</span><span>' + volume + '</span></div>' +
            '<div class="row"><span>Waste Type</span><span>' + wasteType + '</span></div>' +
            '<div class="row"><span>Access</span><span>' + accessType + '</span></div></div>' +
            '<div class="price-box"><p class="price">' + priceMin + ' - ' + priceMax + '</p><p class="note">Estimated price range (GST inclusive)</p></div>' +
            '<div class="section"><h3>What\'s Included</h3>' +
            '<div class="row"><span>Labour and loading</span><span>Included</span></div>' +
            '<div class="row"><span>Transport</span><span>Included</span></div>' +
            '<div class="row"><span>Disposal and tip fees</span><span>Included</span></div>' +
            '<div class="row"><span>Same day service</span><span>Available</span></div></div>' +
            '<div class="section"><h3>Next Steps</h3><p>Call us on 1300 000 000 or reply to confirm your booking. ' +
            'Final price confirmed on-site before we begin. No obligation, no hidden fees.</p></div>' +
            '<div class="footer"><p>Rubbish Removal Sydney | 1300 000 000 | quotes@example.com</p>' +
            '<p>$20M Public Liability Insurance | Licensed Waste Operator</p></div></body></html>';
        
        var blob = new Blob([quoteHTML], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'Quote-RubbishRemovalSydney-' + quoteRef + '.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

// Live Chat Widget
var chatWidget = document.getElementById('chatWidget');
var chatToggle = document.getElementById('chatToggle');
var chatClose = document.getElementById('chatClose');
var chatInput = document.getElementById('chatInput');
var chatSend = document.getElementById('chatSend');
var chatMessages = document.getElementById('chatMessages');

if (chatToggle) {
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
        var badge = this.querySelector('.chat-badge');
        if (badge) badge.style.display = 'none';
    });
}

if (chatClose) {
    chatClose.addEventListener('click', function() {
        chatWidget.classList.remove('open');
    });
}

function addChatMessage(text, type) {
    var msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message ' + type;
    var time = new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
    msgDiv.innerHTML = '<p>' + text + '</p><span class="chat-time">' + time + '</span>';
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    var lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('quote')) {
        return 'Pricing starts from $149 for small loads. Use our calculator on this page for an instant estimate, or tell me what you need removed and I can give you a ballpark.';
    }
    if (lowerMsg.includes('same day') || lowerMsg.includes('today') || lowerMsg.includes('urgent')) {
        return 'Yes, we offer same day service across Sydney. If you book before 10am, we can usually get to you today. What suburb are you in?';
    }
    if (lowerMsg.includes('mattress') || lowerMsg.includes('sofa') || lowerMsg.includes('furniture')) {
        return 'We remove all furniture including mattresses, sofas, and beds. Single item removal starts at $89. Would you like me to arrange a pickup?';
    }
    if (lowerMsg.includes('where') || lowerMsg.includes('area') || lowerMsg.includes('suburb')) {
        return 'We cover all of Sydney metro including Eastern Suburbs, Inner West, North Shore, Northern Beaches, Western Sydney, and Sutherland Shire.';
    }
    return 'Thanks for your message. For the fastest response, call us on 1300 000 000 or one of our team will reply here shortly.';
}

if (chatSend && chatInput) {
    function sendMessage() {
        var message = chatInput.value.trim();
        if (message) {
            addChatMessage(message, 'outgoing');
            chatInput.value = '';
            setTimeout(function() {
                addChatMessage(getBotResponse(message), 'incoming');
            }, 1000);
        }
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
}

})();
