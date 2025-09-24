        // Global State & UI Elements
        const state = {
            language: '',
            ageGroup: '',
            isSpeaking: false,
            isTyping: false,
            isListening: false,
            voices: [],
            chatHistory: [],
        };

        const ui = {
            onboardingModal: document.getElementById('onboarding-modal'),
            languageStep: document.getElementById('language-step'),
            ageStep: document.getElementById('age-step'),
            mainContainer: document.querySelector('.container'),
            chatArea: document.getElementById('chat-area'),
            userInput: document.getElementById('user-input'),
            sendBtn: document.getElementById('send-btn'),
            micBtn: document.getElementById('mic-btn'),
            typingIndicator: document.getElementById('typing-indicator'),
            initialGreeting: document.getElementById('initial-greeting'),
            sideMenu: document.getElementById('side-menu'),
            menuBtn: document.getElementById('menu-btn'),
            menuCloseBtn: document.getElementById('menu-close-btn'),
            videoModal: document.getElementById('video-modal'),
            videoModalCloseBtn: document.getElementById('video-modal-close-btn'),
            youtubePlayer: document.getElementById('youtube-player'),
            moodIndicator: document.getElementById('mood-indicator'),
            yogaPanel: document.getElementById('yoga-panel'),
            yogaToggleBtn: document.getElementById('yoga-toggle-btn'),
            yogaCloseBtn: document.getElementById('yoga-close-btn'),
            yogaMenu: document.getElementById('yoga-menu'),
            yogaDetailsView: document.getElementById('yoga-details-view'),
            backToMenuBtn: document.getElementById('back-to-menu-btn'),
            poseTitle: document.getElementById('pose-title'),
            poseMediaContainer: document.getElementById('pose-media-container'),
            poseInstructions: document.getElementById('pose-instructions'),
            poseBenefits: document.getElementById('pose-benefits'),
        };

        // Yoga Poses Data
        const yogaPoses = {
            'Mountain Pose': {
                video: 'https://www.youtube.com/embed/5NxDs-ovJU8',
                instructions: "Stand tall with feet together, arms at your sides. Ground through your feet and lengthen your spine. Keep your shoulders relaxed and gaze forward. Engage your thigh muscles and keep your body straight.",
                benefits: ["Improves posture and balance.", "Strengthens thighs, knees, and ankles.", "Boosts confidence and a sense of grounding."]
            },
            'Child’s Pose': {
                video: 'https://www.youtube.com/embed/kH12QrSGedM',
                instructions: "Kneel on the floor with your big toes touching. Sit on your heels and fold forward, resting your forehead on the floor. Extend your arms forward or rest them alongside your body. Breathe deeply and relax.",
                benefits: ["Gently stretches the back, hips, and thighs.", "Calms the mind and relieves stress.", "Encourages a sense of peace and security."]
            },
            'Tree Pose': {
                video: 'https://www.youtube.com/embed/uELr6MPi7pI',
                instructions: "From Mountain Pose, shift your weight onto one foot. Lift the other foot and place it on the inner thigh or calf of your standing leg. Bring your hands to your heart or extend them overhead. Find a single point to focus your gaze.",
                benefits: ["Improves balance and stability.", "Strengthens the legs and core.", "Enhances concentration and focus."]
            },
            'Cobra Pose': {
                video: 'https://www.youtube.com/embed/UYDTHxVh2EE',
                instructions: "Lie on your stomach with hands under your shoulders. Press the tops of your feet and pubic bone into the floor. Inhale to lift your chest off the floor, keeping your elbows close to your body. Look forward and keep your neck long.",
                benefits: ["Strengthens the spine and arms.", "Stretches the chest, shoulders, and abdomen.", "Energizes the body and relieves stress."]
            },
            'Bridge Pose': {
                video: 'https://www.youtube.com/embed/XUcAuYd7VU0',
                instructions: "Lie on your back with knees bent, feet flat on the floor. Keep your arms at your sides with palms down. Inhale and lift your hips off the floor, pressing through your feet. Hold for a few breaths before lowering down.",
                benefits: ["Strengthens glutes, hamstrings, and lower back.", "Stretches the chest, neck, and spine.", "Calms the nervous system and relieves anxiety."]
            }
        };

        // --- Core Functions ---

        /** Initializes the chat after language and age selection. */
        function initChat() {
            ui.onboardingModal.style.opacity = '0';
            setTimeout(() => {
                ui.onboardingModal.style.display = 'none';
                ui.mainContainer.style.display = 'flex';
                
                // Set initial greeting based on language and age
                let greeting = '';
                let placeholder = '';
                
                if (state.language === 'en') {
                    placeholder = "Type your message...";
                    if (state.ageGroup === 'below-20') {
                        greeting = "Hey there! I'm here to support you. What's on your mind today?";
                    } else if (state.ageGroup === '20-45') {
                        greeting = "Hello. I'm here to listen. How are you feeling today?";
                    } else {
                        greeting = "Welcome. I am here to provide a calm and supportive space for you. How are you feeling today?";
                    }
                } else if (state.language === 'hi') {
                    placeholder = "अपना संदेश टाइप करें...";
                    if (state.ageGroup === 'below-20') {
                        greeting = "नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ। आज आपके मन में क्या चल रहा है?";
                    } else if (state.ageGroup === '20-45') {
                        greeting = "नमस्कार। मैं यहाँ आपकी मदद के लिए हूँ। आज आप कैसा महसूस कर रहे हैं?";
                    } else {
                        greeting = "स्वागत है। मैं आपके लिए एक शांत और सहायक जगह प्रदान करने के लिए यहाँ हूँ। आप आज कैसा महसूस कर रहे हैं?";
                    }
                } else if (state.language === 'bn') {
                    placeholder = "আপনার বার্তা লিখুন...";
                    if (state.ageGroup === 'below-20') {
                        greeting = "আরে! আমি তোমাকে সাহায্য করতে এখানে আছি। আজ তোমার মনে কী চলছে?";
                    } else if (state.ageGroup === '20-45') {
                        greeting = "নমস্কার। আমি আপনার কথা শুনতে এখানে আছি। আজ আপনি কেমন অনুভব করছেন?";
                    } else {
                        greeting = "স্বাগতম। আমি আপনার জন্য একটি শান্ত এবং সহায়ক স্থান দিতে এখানে আছি। আজ আপনি কেমন অনুভব করছেন?";
                    }
                }

                ui.initialGreeting.innerText = greeting;
                ui.userInput.placeholder = placeholder;
                speak(greeting);
                
                if (window.SpeechRecognition || window.webkitSpeechRecognition) {
                    initSpeechRecognition();
                } else {
                    console.log('Speech Recognition not supported in this browser.');
                    ui.micBtn.style.display = 'none';
                }

            }, 500);
        }

        /** Handles sending user messages to the chatbot. */
        async function sendMessage() {
            const userText = ui.userInput.value.trim();
            if (!userText) return;

            appendMessage(userText, 'user');
            ui.userInput.value = '';

            ui.typingIndicator.style.display = 'block';
            autoScroll();
            
            // System prompt adapted for both language and age
            const agePrompt = {
                'below-20': "a friendly, motivational, and supportive tone, like a friend or mentor for a teenager or young adult.Short and precise .",
                '20-45': "a balanced, empathetic, and professional tone, focused on common stressors like work-life balance and relationships.Short and precise .",
                'above-45': "a respectful, calm, and wise tone, addressing themes of health, mindfulness, and positivity.Short and precise ."
            };

            const systemPrompt = `You are an empathetic and supportive mental health chatbot named Saarthi. Your purpose is to listen, provide compassionate support, and not give clinical advice. Your response must be in the language of the user's message, which is ${state.language}. Your tone should be ${agePrompt[state.ageGroup]}. In case of emergency, provide the Indian mental health helpline number. After your response, you MUST detect the user's mood from their message and append it in the format "[MOOD: <mood>]". The moods you can detect are: happy, sad, anxious, angry, stressed, lonely, calm, love, neutral.`;

            try {
                const chatHistory = state.chatHistory.map(entry => ({ role: entry.role, parts: [{ text: entry.text }] }));
                chatHistory.push({ role: 'user', parts: [{ text: userText }] });

                const payload = {
                    contents: chatHistory,
                    tools: [{ "google_search": {} }],
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                };

                const apiKey = "Here Gemini API key";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    throw new Error(`API response was not ok: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t understand that. Can you try again?';
                
                const moodRegex = /\[MOOD: (.*?)\]/i;
                const moodMatch = text.match(moodRegex);
                const detectedMood = moodMatch ? moodMatch[1].toLowerCase() : 'neutral';
                const cleanText = text.replace(moodRegex, '').trim();

                updateMood(detectedMood);

                ui.typingIndicator.style.display = 'none';
                appendMessage(cleanText, 'bot');
                speak(cleanText);

            } catch (error) {
                console.error("API call failed:", error);
                ui.typingIndicator.style.display = 'none';
                appendMessage("I'm sorry, something went wrong. Please try again later.", 'bot');
            }
        }
        
        /** Appends a new message to the chat area. */
        function appendMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            messageElement.innerText = text;
            ui.chatArea.appendChild(messageElement);
            state.chatHistory.push({ role: sender === 'user' ? 'user' : 'model', text: text });
            autoScroll();
        }

        /** Auto-scrolls the chat area to the bottom. */
        function autoScroll() {
            ui.chatArea.scrollTop = ui.chatArea.scrollHeight;
        }

        // --- Voice Features ---

        /** Initializes the Speech Recognition API. */
        function initSpeechRecognition() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            const langMap = { 'en': 'en-US', 'hi': 'hi-IN', 'bn': 'bn-IN' };
            recognition.lang = langMap[state.language];
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                state.isListening = true;
                ui.micBtn.classList.add('listening');
                ui.userInput.placeholder = 'Listening...';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                ui.userInput.value = transcript;
                sendMessage();
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                state.isListening = false;
                ui.micBtn.classList.remove('listening');
                ui.userInput.placeholder = 'Type or speak...';
            };

            recognition.onend = () => {
                state.isListening = false;
                ui.micBtn.classList.remove('listening');
                ui.userInput.placeholder = 'Type or speak...';
            };

            ui.micBtn.onclick = () => {
                if (state.isListening) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            };
        }

        /** Uses Text-to-Speech to read out a message. */
        function speak(text) {
            if (state.isSpeaking) return;
            const utterance = new SpeechSynthesisUtterance(text);
            const langMap = { 'en': 'en-US', 'hi': 'hi-IN', 'bn': 'bn-IN' };
            utterance.lang = langMap[state.language];
            utterance.voice = state.voices.find(v => v.lang === utterance.lang);
            utterance.onstart = () => state.isSpeaking = true;
            utterance.onend = () => state.isSpeaking = false;
            window.speechSynthesis.speak(utterance);
        }

        // Load voices after they are ready
        window.speechSynthesis.onvoiceschanged = () => {
            state.voices = window.speechSynthesis.getVoices();
        };

        // --- Mood Detection & Emojis ---

        const moodEmojis = {
            'default': '✨',
            happy: '😊',
            sad: '😔',
            anxious: '😥',
            angry: '😠',
            stressed: '😫',
            lonely: '👤',
            calm: '😌',
            love: '💖',
            neutral: '😐'
        };

        const moodColors = {
            happy: '#fce4ec',
            sad: '#e3f2fd',
            anxious: '#fff8e1',
            angry: '#ffebee',
            stressed: '#f3e5f5',
            lonely: '#e0e0e0',
            calm: '#e8f5e9',
            love: '#fbe9e7',
            neutral: '#f5f5f5',
            default: '#cfd8dc'
        };


        /** Updates the mood indicator element in the header. */
        function updateMood(mood) {
            const emoji = moodEmojis[mood] || moodEmojis.default;
            const color = moodColors[mood] || moodColors.default;

            ui.moodIndicator.innerText = emoji;
            ui.moodIndicator.style.backgroundColor = color;
        }

        // --- Mood Boosters & UI Interaction ---

        const moodVideoMap = {
            calm: 'https://www.youtube.com/embed/sm0i1Y4g_zA',
            happy: 'https://www.youtube.com/embed/uv_8XV79MRk',
            stressed: 'https://www.youtube.com/embed/eAK14VoY7C0',
            sad: 'https://www.youtube.com/embed/XCxHsgKY03I',
            angry: 'https://www.youtube.com/embed/HSx8jBaM_-U',
        };

        function showVideoModal(mood) {
            const videoUrl = moodVideoMap[mood];
            if (videoUrl) {
                ui.youtubePlayer.src = videoUrl;
                ui.videoModal.style.display = 'flex';
            }
        }

        function hideVideoModal() {
            ui.videoModal.style.display = 'none';
            ui.youtubePlayer.src = '';
        }
        
        // --- Yoga Feature Logic ---
        
        function renderYogaMenu() {
            ui.yogaMenu.innerHTML = '';
            Object.keys(yogaPoses).forEach(poseName => {
                const poseItem = document.createElement('div');
                poseItem.classList.add('yoga-pose-item');
                poseItem.innerText = poseName;
                poseItem.addEventListener('click', () => showPoseDetails(poseName));
                ui.yogaMenu.appendChild(poseItem);
            });
        }
        
        function showPoseDetails(poseName) {
            const pose = yogaPoses[poseName];
            if (!pose) return;
            
            ui.poseTitle.innerText = poseName;
            
            ui.poseMediaContainer.innerHTML = '';
            const videoIframe = document.createElement('iframe');
            videoIframe.src = pose.video;
            videoIframe.width = "100%";
            videoIframe.height = "100%";
            videoIframe.frameborder = "0";
            videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            videoIframe.allowFullscreen = true;
            ui.poseMediaContainer.appendChild(videoIframe);

            ui.poseInstructions.innerText = pose.instructions;
            
            ui.poseBenefits.innerHTML = '';
            pose.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.innerText = benefit;
                ui.poseBenefits.appendChild(li);
            });
            
            ui.yogaMenu.style.display = 'none';
            ui.yogaDetailsView.style.display = 'flex';
        }

        function toggleYogaPanel() {
            ui.yogaPanel.classList.toggle('open');
        }
        
        // --- Event Listeners ---

        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', () => {
                state.language = button.dataset.lang;
                ui.languageStep.style.display = 'none';
                ui.ageStep.style.display = 'block';
            });
        });

        document.querySelectorAll('.age-btn').forEach(button => {
            button.addEventListener('click', () => {
                state.ageGroup = button.dataset.age;
                initChat();
            });
        });

        ui.sendBtn.addEventListener('click', sendMessage);
        ui.userInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        ui.menuBtn.addEventListener('click', () => {
            ui.sideMenu.classList.add('open');
        });

        ui.menuCloseBtn.addEventListener('click', () => {
            ui.sideMenu.classList.remove('open');
        });

        document.querySelectorAll('.mood-btn').forEach(button => {
            button.addEventListener('click', () => {
                showVideoModal(button.dataset.mood);
            });
        });

        ui.videoModalCloseBtn.addEventListener('click', hideVideoModal);

        ui.yogaToggleBtn.addEventListener('click', toggleYogaPanel);
        ui.yogaCloseBtn.addEventListener('click', toggleYogaPanel);
        ui.backToMenuBtn.addEventListener('click', () => {
            ui.yogaDetailsView.style.display = 'none';
            ui.yogaMenu.style.display = 'flex';
        });

        // Initialize Yoga Menu and Mood Detector
        document.addEventListener('DOMContentLoaded', () => {
            renderYogaMenu();
            updateMood('default');
        });
        window.addEventListener('resize', () => {
            if (ui.yogaPanel.classList.contains('open') && window.innerWidth >= 1024) {
                ui.mainContainer.style.maxWidth = 'calc(600px - var(--yoga-panel-width) - 20px)';
                ui.mainContainer.style.width = 'calc(100% - var(--yoga-panel-width) - 20px)';
            } else if (!ui.yogaPanel.classList.contains('open')) {
                ui.mainContainer.style.maxWidth = '600px';
                ui.mainContainer.style.width = '100%';
            }
        });



        
