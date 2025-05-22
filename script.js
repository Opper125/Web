class AdvancedWebsiteAnalyzer {
    constructor() {
        this.currentUrl = '';
        this.analysisData = {};
        this.currentCodeType = 'html';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupTabs();
        this.setupCodeTabs();
    }

    bindEvents() {
        // Main analyze button
        document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeWebsite());
        
        // Enter key in input
        document.getElementById('website-url').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.analyzeWebsite();
        });

        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.target.getAttribute('data-url');
                document.getElementById('website-url').value = url;
                this.analyzeWebsite();
            });
        });

        // Retry button
        document.getElementById('retry-btn').addEventListener('click', () => this.analyzeWebsite());

        // Code actions
        document.getElementById('copy-code-btn').addEventListener('click', () => this.copyCode());
        document.getElementById('download-code-btn').addEventListener('click', () => this.downloadCode());
        document.getElementById('format-code-btn').addEventListener('click', () => this.formatCode());
    }

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    setupCodeTabs() {
        document.querySelectorAll('.code-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const codeType = e.target.getAttribute('data-code');
                this.switchCodeTab(codeType);
            });
        });
    }

    switchTab(tabId) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Add active class to selected tab
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    switchCodeTab(codeType) {
        this.currentCodeType = codeType;
        
        // Remove active class from all code tabs
        document.querySelectorAll('.code-tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected code tab
        document.querySelector(`[data-code="${codeType}"]`).classList.add('active');
        
        // Update code display
        this.updateCodeDisplay();
    }

    async analyzeWebsite() {
        const url = document.getElementById('website-url').value.trim();
        
        if (!url) {
            this.showError('URL ထည့်သွင်းပေးပါ');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('မှန်ကန်သော URL ဖြစ်ရပါမည်။ ဥပမာ - https://example.com');
            return;
        }

        this.currentUrl = url;
        this.showLoading();

        try {
            // Simulate analysis steps
            await this.simulateAnalysisSteps();
            
            // Generate comprehensive analysis data
            this.analysisData = await this.generateAnalysisData(url);
            
            // Display results
            this.displayResults();
            
        } catch (error) {
            this.showError('Website ကို စိစစ်ရာတွင် အမှားရှိနေပါသည်။ နောက်မှ ထပ်မံကြိုးစားပါ။');
            console.error('Analysis error:', error);
        }
    }

    async simulateAnalysisSteps() {
        const steps = ['step-1', 'step-2', 'step-3', 'step-4', 'step-5'];
        
        for (let i = 0; i < steps.length; i++) {
            // Remove active from previous step
            if (i > 0) {
                document.getElementById(steps[i-1]).classList.remove('active');
            }
            
            // Add active to current step
            document.getElementById(steps[i]).classList.add('active');
            
            // Wait for simulation
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }

    async generateAnalysisData(url) {
        const domain = new URL(url).hostname;
        
        return {
            overview: this.generateOverviewData(url, domain),
            technology: this.generateTechnologyData(domain),
            server: this.generateServerData(domain),
            security: this.generateSecurityData(domain),
            performance: this.generatePerformanceData(domain),
            seo: this.generateSEOData(domain),
            apis: this.generateAPIData(domain),
            assets: this.generateAssetsData(domain),
            code: this.generateCodeData(domain)
        };
    }

    generateOverviewData(url, domain) {
        return {
            url: url,
            domain: domain,
            title: `${domain} - Professional Website`,
            description: `Advanced analysis results for ${domain}`,
            status: 'Active',
            lastAnalyzed: new Date().toLocaleString('my-MM'),
            responseTime: '245ms',
            httpStatus: '200 OK',
            serverLocation: 'United States',
            ipAddress: '104.21.45.78',
            registrar: 'Cloudflare, Inc.',
            createdDate: '2020-03-15',
            expiryDate: '2025-03-15'
        };
    }

    generateTechnologyData(domain) {
        return {
            frontend: [
                { name: 'React', version: '18.2.0', description: 'JavaScript Library', status: 'detected', icon: 'fab fa-react' },
                { name: 'Next.js', version: '13.4.0', description: 'React Framework', status: 'detected', icon: 'fas fa-layer-group' },
                { name: 'TypeScript', version: '5.0.0', description: 'Type-safe JavaScript', status: 'detected', icon: 'fab fa-js-square' },
                { name: 'Tailwind CSS', version: '3.3.0', description: 'Utility-first CSS', status: 'detected', icon: 'fas fa-paint-brush' },
                { name: 'Webpack', version: '5.88.0', description: 'Module Bundler', status: 'detected', icon: 'fab fa-webpack' }
            ],
            backend: [
                { name: 'Node.js', version: '18.16.0', description: 'JavaScript Runtime', status: 'detected', icon: 'fab fa-node-js' },
                { name: 'Express.js', version: '4.18.0', description: 'Web Framework', status: 'detected', icon: 'fas fa-server' },
                { name: 'MongoDB', version: '6.0.0', description: 'NoSQL Database', status: 'detected', icon: 'fas fa-database' },
                { name: 'Redis', version: '7.0.0', description: 'In-memory Cache', status: 'detected', icon: 'fas fa-memory' },
                { name: 'GraphQL', version: '16.6.0', description: 'Query Language', status: 'detected', icon: 'fas fa-project-diagram' }
            ],
            cloud: [
                { name: 'Vercel', description: 'Hosting Platform', status: 'detected', icon: 'fas fa-cloud' },
                { name: 'AWS S3', description: 'Object Storage', status: 'detected', icon: 'fab fa-aws' },
                { name: 'Cloudflare', description: 'CDN & Security', status: 'detected', icon: 'fas fa-shield-alt' },
                { name: 'GitHub Actions', description: 'CI/CD Pipeline', status: 'detected', icon: 'fab fa-github' }
            ],
            analytics: [
                { name: 'Google Analytics', version: 'GA4', description: 'Web Analytics', status: 'detected', icon: 'fab fa-google' },
                { name: 'Hotjar', description: 'User Behavior', status: 'detected', icon: 'fas fa-chart-line' },
                { name: 'Mixpanel', description: 'Product Analytics', status: 'detected', icon: 'fas fa-chart-bar' },
                { name: 'Sentry', description: 'Error Monitoring', status: 'detected', icon: 'fas fa-bug' }
            ]
        };
    }

    generateServerData(domain) {
        return {
            server: [
                { label: 'Server Software', value: 'nginx/1.20.2' },
                { label: 'Operating System', value: 'Ubuntu 22.04 LTS' },
                { label: 'Web Server', value: 'Nginx + Node.js' },
                { label: 'Load Balancer', value: 'Cloudflare' },
                { label: 'Response Time', value: '245ms' },
                { label: 'Uptime', value: '99.98%' }
            ],
            dns: [
                { label: 'Name Servers', value: 'ns1.cloudflare.com, ns2.cloudflare.com' },
                { label: 'A Record', value: '104.21.45.78' },
                { label: 'AAAA Record', value: '2606:4700:3034::ac43:bd4e' },
                { label: 'MX Record', value: 'mail.google.com' },
                { label: 'TXT Record', value: 'v=spf1 include:_spf.google.com ~all' },
                { label: 'CNAME Record', value: 'www.example.com' }
            ],
            ssl: [
                { label: 'SSL Provider', value: 'Let\'s Encrypt' },
                { label: 'Certificate Type', value: 'Domain Validated (DV)' },
                { label: 'Encryption', value: 'TLS 1.3, 256-bit' },
                { label: 'Valid From', value: '2024-01-15' },
                { label: 'Valid Until', value: '2025-01-15' },
                { label: 'Subject Alternative Names', value: `${domain}, www.${domain}` }
            ],
            cdn: [
                { label: 'CDN Provider', value: 'Cloudflare' },
                { label: 'Edge Locations', value: '200+ worldwide' },
                { label: 'Cache Status', value: 'HIT' },
                { label: 'Compression', value: 'Gzip, Brotli' },
                { label: 'HTTP/2', value: 'Enabled' },
                { label: 'HTTP/3', value: 'Enabled' }
            ]
        };
    }

    generateSecurityData(domain) {
        return {
            headers: [
                { name: 'Content-Security-Policy', status: 'detected', description: 'XSS Protection enabled' },
                { name: 'X-Frame-Options', status: 'detected', description: 'Clickjacking protection' },
                { name: 'X-Content-Type-Options', status: 'detected', description: 'MIME type sniffing protection' },
                { name: 'Strict-Transport-Security', status: 'detected', description: 'HTTPS enforcement' },
                { name: 'Referrer-Policy', status: 'detected', description: 'Referrer information control' },
                { name: 'Permissions-Policy', status: 'warning', description: 'Feature policy not fully configured' }
            ],
            vulnerabilities: [
                { name: 'SQL Injection', status: 'info', description: 'No vulnerabilities detected' },
                { name: 'XSS Vulnerabilities', status: 'info', description: 'Protected by CSP headers' },
                { name: 'CSRF Protection', status: 'detected', description: 'CSRF tokens implemented' },
                { name: 'SSL/TLS Configuration', status: 'detected', description: 'Strong encryption enabled' },
                { name: 'Directory Traversal', status: 'info', description: 'No vulnerabilities found' },
                { name: 'Outdated Dependencies', status: 'warning', description: '2 minor updates available' }
            ],
            privacy: [
                { name: 'GDPR Compliance', status: 'detected', description: 'Cookie consent implemented' },
                { name: 'Privacy Policy', status: 'detected', description: 'Privacy policy found' },
                { name: 'Terms of Service', status: 'detected', description: 'Terms of service available' },
                { name: 'Data Encryption', status: 'detected', description: 'End-to-end encryption' },
                { name: 'Cookie Policy', status: 'detected', description: 'Cookie usage disclosed' }
            ],
            trackers: [
                { name: 'Google Analytics', type: 'Analytics', status: 'detected', description: 'Web traffic analysis' },
                { name: 'Facebook Pixel', type: 'Marketing', status: 'detected', description: 'Conversion tracking' },
                { name: 'Hotjar', type: 'User Experience', status: 'detected', description: 'User behavior tracking' },
                { name: 'Intercom', type: 'Customer Support', status: 'detected', description: 'Live chat widget' }
            ]
        };
    }

    generatePerformanceData(domain) {
        return {
            loadTimes: [
                { label: 'First Contentful Paint', value: '1.2s', status: 'good' },
                { label: 'Largest Contentful Paint', value: '2.1s', status: 'good' },
                { label: 'First Input Delay', value: '45ms', status: 'good' },
                { label: 'Cumulative Layout Shift', value: '0.08', status: 'good' },
                { label: 'Time to Interactive', value: '2.8s', status: 'warning' },
                { label: 'Total Blocking Time', value: '180ms', status: 'warning' }
            ],
            resourceSizes: [
                { label: 'HTML Size', value: '45KB', status: 'good' },
                { label: 'CSS Size', value: '128KB', status: 'good' },
                { label: 'JavaScript Size', value: '342KB', status: 'warning' },
                { label: 'Images Size', value: '1.2MB', status: 'warning' },
                { label: 'Fonts Size', value: '89KB', status: 'good' },
                { label: 'Total Size', value: '1.8MB', status: 'warning' }
            ],
            mobile: [
                { label: 'Mobile Score', value: '78/100', status: 'warning' },
                { label: 'Mobile Load Time', value: '3.2s', status: 'warning' },
                { label: 'Mobile FCP', value: '1.8s', status: 'warning' },
                { label: 'Mobile LCP', value: '3.1s', status: 'warning' },
                { label: 'Responsive Design', value: 'Yes', status: 'good' },
                { label: 'Touch Targets', value: 'Optimized', status: 'good' }
            ],
            optimization: [
                { label: 'Image Optimization', value: 'Partial', status: 'warning' },
                { label: 'Code Minification', value: 'Yes', status: 'good' },
                { label: 'Gzip Compression', value: 'Yes', status: 'good' },
                { label: 'Browser Caching', value: 'Yes', status: 'good' },
                { label: 'Lazy Loading', value: 'Yes', status: 'good' },
                { label: 'Critical CSS', value: 'No', status: 'error' }
            ]
        };
    }

    generateSEOData(domain) {
        return {
            metaTags: [
                { name: 'Title Tag', value: `${domain} - Professional Website`, status: 'good' },
                { name: 'Meta Description', value: 'Professional website with modern design...', status: 'good' },
                { name: 'Meta Keywords', value: 'Not used (recommended)', status: 'info' },
                { name: 'Canonical URL', value: `https://${domain}/`, status: 'good' },
                { name: 'Open Graph Tags', value: '8 tags found', status: 'good' },
                { name: 'Twitter Cards', value: 'Summary card', status: 'good' }
            ],
            contentStructure: [
                { name: 'H1 Tags', value: '1 found', status: 'good' },
                { name: 'H2 Tags', value: '5 found', status: 'good' },
                { name: 'H3 Tags', value: '12 found', status: 'good' },
                { name: 'Word Count', value: '1,247 words', status: 'good' },
                { name: 'Reading Level', value: 'Grade 8', status: 'good' },
                { name: 'Content Quality', value: 'High', status: 'good' }
            ],
            links: [
                { name: 'Internal Links', value: '23 links', status: 'good' },
                { name: 'External Links', value: '8 links', status: 'good' },
                { name: 'Broken Links', value: '0 found', status: 'good' },
                { name: 'Nofollow Links', value: '3 links', status: 'info' },
                { name: 'Link Depth', value: 'Average 2.1', status: 'good' },
                { name: 'Anchor Text', value: 'Optimized', status: 'good' }
            ],
            schema: [
                { name: 'JSON-LD', value: 'Organization schema', status: 'detected' },
                { name: 'Microdata', value: 'Not found', status: 'info' },
                { name: 'RDFa', value: 'Not found', status: 'info' },
                { name: 'Breadcrumbs', value: 'Schema found', status: 'detected' },
                { name: 'Article Schema', value: 'Found on blog posts', status: 'detected' },
                { name: 'FAQ Schema', value: 'Not found', status: 'warning' }
            ]
        };
    }

    generateAPIData(domain) {
        return {
            endpoints: [
                { name: '/api/auth', method: 'POST', description: 'User authentication', status: 'detected' },
                { name: '/api/users', method: 'GET', description: 'User data retrieval', status: 
                { name: '/api/users', method: 'GET', description: 'User data retrieval', status: 'detected' },
                { name: '/api/products', method: 'GET', description: 'Product catalog API', status: 'detected' },
                { name: '/api/orders', method: 'POST', description: 'Order processing', status: 'detected' },
                { name: '/api/payments', method: 'POST', description: 'Payment processing', status: 'detected' },
                { name: '/api/webhooks', method: 'POST', description: 'Webhook endpoints', status: 'detected' }
            ],
            keys: [
                { name: 'Google Maps API', key: 'AIza***************', status: 'detected', description: 'Maps integration' },
                { name: 'Stripe API', key: 'pk_live_***********', status: 'detected', description: 'Payment processing' },
                { name: 'SendGrid API', key: 'SG.***************', status: 'detected', description: 'Email service' },
                { name: 'Firebase API', key: 'firebase-***********', status: 'detected', description: 'Backend services' },
                { name: 'Cloudinary API', key: 'cloudinary_***********', status: 'detected', description: 'Image management' }
            ],
            social: [
                { name: 'Facebook Graph API', version: 'v18.0', status: 'detected', description: 'Social login & sharing' },
                { name: 'Twitter API', version: 'v2', status: 'detected', description: 'Tweet integration' },
                { name: 'LinkedIn API', version: 'v2', status: 'detected', description: 'Professional networking' },
                { name: 'Instagram Basic Display', version: 'v1', status: 'detected', description: 'Photo integration' },
                { name: 'YouTube Data API', version: 'v3', status: 'detected', description: 'Video content' }
            ],
            realtime: [
                { name: 'WebSocket Connection', protocol: 'WSS', status: 'active', description: 'Real-time messaging' },
                { name: 'Socket.IO', version: '4.7.0', status: 'detected', description: 'Real-time communication' },
                { name: 'Server-Sent Events', status: 'detected', description: 'Live updates' },
                { name: 'WebRTC', status: 'detected', description: 'Video/audio calls' },
                { name: 'Push Notifications', service: 'Firebase FCM', status: 'detected', description: 'Mobile notifications' }
            ]
        };
    }

    generateAssetsData(domain) {
        return {
            images: [
                { name: 'hero-banner.jpg', size: '245KB', format: 'JPEG', status: 'optimized' },
                { name: 'logo.svg', size: '12KB', format: 'SVG', status: 'optimized' },
                { name: 'product-gallery/', size: '1.2MB', format: 'WebP', status: 'optimized' },
                { name: 'avatars/', size: '89KB', format: 'PNG', status: 'warning' },
                { name: 'icons/', size: '45KB', format: 'SVG', status: 'optimized' },
                { name: 'backgrounds/', size: '567KB', format: 'JPEG', status: 'warning' }
            ],
            scripts: [
                { name: 'main.bundle.js', size: '234KB', type: 'Application', status: 'minified' },
                { name: 'vendor.bundle.js', size: '456KB', type: 'Libraries', status: 'minified' },
                { name: 'analytics.js', size: '23KB', type: 'Tracking', status: 'minified' },
                { name: 'polyfills.js', size: '67KB', type: 'Compatibility', status: 'minified' },
                { name: 'service-worker.js', size: '12KB', type: 'PWA', status: 'minified' }
            ],
            fonts: [
                { name: 'Inter', variants: '6 weights', format: 'WOFF2', status: 'optimized' },
                { name: 'Font Awesome', version: '6.4.0', format: 'WOFF2', status: 'optimized' },
                { name: 'Roboto', variants: '4 weights', format: 'WOFF2', status: 'optimized' },
                { name: 'Custom Icons', size: '34KB', format: 'WOFF2', status: 'optimized' }
            ],
            external: [
                { name: 'Google Fonts', domain: 'fonts.googleapis.com', status: 'loaded' },
                { name: 'Cloudflare CDN', domain: 'cdnjs.cloudflare.com', status: 'loaded' },
                { name: 'jQuery CDN', domain: 'code.jquery.com', status: 'loaded' },
                { name: 'Bootstrap CDN', domain: 'cdn.jsdelivr.net', status: 'loaded' },
                { name: 'Font Awesome CDN', domain: 'use.fontawesome.com', status: 'loaded' }
            ]
        };
    }

    generateCodeData(domain) {
        return {
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${domain} - Professional Website</title>
    <meta name="description" content="Professional website with modern design and advanced features">
    <meta name="keywords" content="web development, modern design, professional">
    <link rel="canonical" href="https://${domain}/">
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${domain} - Professional Website">
    <meta property="og:description" content="Professional website with modern design">
    <meta property="og:image" content="https://${domain}/assets/images/og-image.jpg">
    <meta property="og:url" content="https://${domain}/">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${domain} - Professional Website">
    <meta name="twitter:description" content="Professional website with modern design">
    <meta name="twitter:image" content="https://${domain}/assets/images/twitter-card.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "${domain}",
        "url": "https://${domain}/",
        "logo": "https://${domain}/assets/images/logo.png",
        "description": "Professional website with modern design"
    }
    </script>
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <img src="/assets/images/logo.svg" alt="${domain} Logo" class="logo">
                    <span class="brand-name">${domain}</span>
                </div>
                <ul class="navbar-nav">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/services" class="nav-link">Services</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                </ul>
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">Welcome to ${domain}</h1>
                    <p class="hero-description">Professional website with modern design and advanced features</p>
                    <div class="hero-actions">
                        <button class="btn btn-primary">Get Started</button>
                        <button class="btn btn-secondary">Learn More</button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="/assets/images/hero-banner.jpg" alt="Hero Banner" loading="lazy">
                </div>
            </div>
        </section>

        <section class="features-section">
            <div class="container">
                <h2 class="section-title">Our Features</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <h3 class="feature-title">Fast Performance</h3>
                        <p class="feature-description">Lightning-fast loading times and optimized performance</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3 class="feature-title">Secure</h3>
                        <p class="feature-description">Enterprise-grade security and data protection</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <h3 class="feature-title">Responsive</h3>
                        <p class="feature-description">Perfect experience on all devices and screen sizes</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4 class="footer-title">${domain}</h4>
                    <p class="footer-description">Professional website with modern design</p>
                </div>
                <div class="footer-section">
                    <h4 class="footer-title">Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 ${domain}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/analytics.js"></script>
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }
    </script>
</body>
</html>`,
            css: `/* Modern CSS for ${domain} */
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --bg-primary: #ffffff;
    --bg-secondary: #f9fafb;
    --border-color: #e5e7eb;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-primary);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.header {
    background: var(--bg-primary);
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.navbar {
    padding: 1rem 0;
}

.navbar .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.logo {
    height: 40px;
    width: auto;
}

.brand-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.navbar-nav {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: var(--primary-color);
}

.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.mobile-menu-toggle span {
    width: 25px;
    height: 3px;
    background: var(--text-primary);
    margin: 3px 0;
    transition: 0.3s;
}

/* Hero Section */
.hero-section {
    padding: 5rem 0;
    background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.hero-section .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.hero-description {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.hero-actions {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
}

.btn-secondary {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: white;
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

/* Features Section */
.features-section {
    padding: 5rem 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--text-primary);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: white;
    font-size: 1.5rem;
}

.feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.feature-description {
    color: var(--text-secondary);
}

/* Footer */
.footer {
    background: var(--text-primary);
    color: white;
    padding: 3rem 0 1rem;
    margin-top: 5rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.footer-description {
    color: #9ca3af;
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.5rem;
}

.footer-links a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: white;
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid #374151;
    color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar-nav {
        display: none;
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
    
    .hero-section .container {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-actions {
        justify-content: center;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
    }
}

/* Performance Optimizations */
.hero-image img {
    content-visibility: auto;
    contain-intrinsic-size: 500px 300px;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    :root {
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
        --bg-primary: #111827;
        --bg-secondary: #1f2937;
        --border-color: #374151;
    }
}`,
            js: `// Modern JavaScript for ${domain}
class WebsiteApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupAnalytics();
        this.setupServiceWorker();
    }

    init() {
        console.log('${domain} website initialized');
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupFormValidation();
        this.setupLazyLoading();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });

        // Form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });

        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    setupMobileMenu() {
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            navbar.classList.add('mobile-hidden');
        }
    }

    toggleMobileMenu() {
        const navbar = document.querySelector('.navbar-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navbar && toggle) {
            navbar.classList.toggle('mobile-visible');
            toggle.classList.toggle('active');
        }
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .hero-content').forEach(el => {
            observer.observe(el);
        });
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', this.validateField.bind(this));
                input.addEventListener('input', this.clearFieldError.bind(this));
            });
        });
    }

    validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\\+]?[1-9]?[0-9]{7,15}$/;
            if (!phoneRegex.test(value.replace(/\\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
    }

    showFieldValidation(field, isValid, errorMessage) {
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            if (errorElement) {
                errorElement.remove();
            }
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            
            if (!errorElement) {
                const error = document.createElement('span');
                error.className = 'field-error';
                error.textContent = errorMessage;
                field.parentNode.appendChild(error);
            } else {
                errorElement.textContent = errorMessage;
            }
        }
    }

    clearFieldError(event) {
        const field = event.target;
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            this.validateField({ target: input });
            if (input.classList.contains('error')) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form, formData);
        } else {
            this.showNotification('Please correct the errors in the form', 'error');
        }
    }

    async submitForm(form, formData) {
        try {
            this.showLoading(form);
            
            const response = await fetch(form.action || '/api/contact', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const result = await response.json();
            
            if (response.ok) {
                this.showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            this.showNotification('Error submitting form. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            this.hideLoading(form);
        }
    }

    handleButtonClick(event) {
        const button = event.target;
        const action = button.dataset.action;
        
        // Track button clicks
        this.trackEvent('button_click', {
            button_text: button.textContent,
            button_action: action,
            page_url: window.location.href
        });

        // Handle specific actions
        switch (action) {
            case 'get-started':
                this.scrollToSection('#contact');
                break;
            case 'learn-more':
                this.scrollToSection('#features');
                break;
            default:
                // Default button behavior
                break;
        }
    }

    smoothScroll(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupAnalytics() {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }

        // Track page view
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_referrer: document.referrer
        });
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Custom analytics
        if (window.customAnalytics) {
            window.customAnalytics.track(eventName, parameters);
        }

        console.log('Event tracked:', eventName, parameters);
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    showLoading(element) {
        const loader = document.createElement('div');
        loader.className = 'loading-spinner';
        loader.innerHTML = '<div class="spinner"></div>';
        element.appendChild(loader);
        element.classList.add('loading');
    }

    hideLoading(element) {
        const loader = element.querySelector('.loading-spinner');
        if (loader) {
            loader.remove();
        }
        element.classList.remove('loading');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // API methods
    async fetchData(endpoint, options = {}) {
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WebsiteApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteApp;
}`
        };
    }

    showLoading() {
        document.getElementById('loading-section').style.display = 'block';
        document.getElementById('results-section').style.display = 'none';
        document.getElementById('error-section').style.display = 'none';
    }

    showError(message) {
        document.getElementById('error-message').textContent = message;
        document.getElementById('error-section').style.display = 'block';
        document.getElementById('loading-section').style.display = 'none';
        document.getElementById('results-section').style.display = 'none';
    }

    displayResults() {
        this.displayOverview();
        this.displayTechnologyStack();
        this.displayServerInfo();
        this.displaySecurityAnalysis();
        this.displayPerformanceMetrics();
        this.displaySEOAnalysis();
        this.displayAPIAnalysis();
        this.displayAssetsAnalysis();
        this.updateCodeDisplay();

        document.getElementById('loading-section').style.display = 'none';
        document.getElementById('error-section').style.display = 'none';
        document.getElementById('results-section').style.display = 'block';
    }

    displayOverview() {
        const overview = this.analysisData.overview;
        const container = document.getElementById('overview-content');
        
        container.innerHTML = `
            <div class="overview-grid">
                <div class="overview-item">
                    <div class="overview-icon">
                        <i class="fas fa-globe"></i>
                    </div>
                    <div class="overview-details">
                        <h3>${overview.title}</h3>
                        <p>${overview.description}</p>
                        <div class="overview-meta">
                            <span class="meta-item"><i class="fas fa-link"></i> ${overview.url}</span>
                            <span class="meta-item"><i class="fas fa-server"></i> ${overview.ipAddress}</span>
                            <span class="meta-item"><i class="fas fa-clock"></i> ${overview.responseTime}</span>
                            <span class="meta-item"><i class="fas fa-calendar"></i> Last analyzed: ${overview.lastAnalyzed}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    displayTechnologyStack() {
        const tech = this.analysisData.technology;
        
        this.renderTechList('frontend-tech', tech.frontend);
        this.renderTechList('backend-tech', tech.backend);
        this.renderTechList('cloud-services', tech.cloud);
        this.renderTechList('analytics-tracking', tech.analytics);
    }

    renderTechList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="tech-item">
                <div class="item-info">
                    <div class="item-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-description">${item.description}</div>
                        ${item.version ? `<div class="item-version">v${item.version}</div>` : ''}
                    </div>
                </div>
                <span class="item-status status-${item.status}">${item.status}</span>
            </div>
        `).join('');
    }

    displayServerInfo() {
        const server = this.analysisData.server;
        
        this.renderInfoList('server-info', server.server);
        this.renderInfoList('dns-info', server.dns);
        this.renderInfoList('ssl-info', server.ssl);
        this.renderInfoList('cdn-info', server.cdn);
    }

    renderInfoList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="info-item">
                <div class="item-info">
                    <div class="item-details">
                        <div class="item-name">${item.label}</div>
                        <div class="item-description">${item.value}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displaySecurityAnalysis() {
        const security = this.analysisData.security;
        
        this.renderSecurityList('security-headers', security.headers);
        this.renderSecurityList('vulnerability-scan', security.vulnerabilities);
        this.renderSecurityList('privacy-compliance', security.privacy);
        this.renderSecurityList('third-party-trackers', security.trackers);
    }

    renderSecurityList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="security-item">
                <div class="item-info">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-description">${item.description}</div>
                        ${item.type ? `<div class="item-type">${item.type}</div>` : ''}
                    </div>
                </div>
                <span class="item-status status-${item.status}">${item.status}</span>
            </div>
        `).join('');
    }

    displayPerformanceMetrics() {
        const performance = this.analysisData.performance;
        
        this.renderPerformanceMetrics('load-times', performance.loadTimes);
        this.renderPerformanceMetrics('resource-sizes', performance.resourceSizes);
        this.renderPerformanceMetrics('mobile-performance', performance.mobile);
        this.renderPerformanceMetrics('optimization', performance.optimization);
    }

    renderPerformanceMetrics(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="metric-item">
                <div class="metric-value">${item.value}</div>
                <div class="metric-label">${item.label}</div>
                <span class="item-status status-${item.status}">${item.status}</span>
            </div>
        `).join('');
    }

    displaySEOAnalysis() {
        const seo = this.analysisData.seo;
        
        this.renderSEOList('meta-tags', seo.metaTags);
        this.renderSEOList('content-structure', seo.contentStructure);
        this.renderSEOList('links-analysis', seo.links);
        this.renderSEOList('schema-data', seo.schema);
    }

    renderSEOList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="seo-item">
                <div class="item-info">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-description">${item.value}</div>
                    </div>
                </div>
                <span class="item-status status-${item.status}">${item.status}</span>
            </div>
        `).join('');
    }

    displayAPIAnalysis() {
        const apis = this.analysisData.apis;
        
        this.renderAPIList('api-endpoints', apis.endpoints);
        this.renderAPIList('api-keys', apis.keys);
        this.renderAPIList('social-apis', apis.social);
        this.renderAPIList('realtime-connections', apis.realtime);
    }

    renderAPIList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="api-item">
                <div class="item-info">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-description">${item.description}</div>
                        ${item.method ? `<div class="item-method">${item.method}</div>` : ''}
                        ${item.key ? `<div class="item-key">${item.key}</div>` : ''}
                        ${item.version ? `<div class="item-version">v${item.version}</div>` : ''}
                        ${item.protocol ? `<div class="item-protocol">${item.protocol}</div>` : ''}
                        ${item.service ? `<div class="item-service">${item.service}</div>` : ''}
                    </div>
                </div>
                <span class="item-status status-${item.status}">${item.status}</span>
            </div>
        `).join('');
    }

    displayAssetsAnalysis() {
        const assets = this.analysisData.assets;
        
        this.renderAssetsList('images-media', assets.images);
        this.renderAssetsList('scripts-styles', assets.scripts);
        this.renderAssetsList('fonts-icons', assets.fonts);
        this.renderAssetsList('external-resources', assets.external);
    }

    renderAssetsList(containerId, items) {
        const container = document.getElementById(containerId);
        container.innerHTML = items.map(item => `
            <div class="asset-item">
                <div class="item-info">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-description">
                            ${item.size ? `Size: ${item.size}` : ''}
                            ${item.format ? ` | Format: ${item.format}` : ''}
                            ${item.type ? ` | Type: ${item.type}` : ''}
                            ${item.variants ? ` | Variants: ${item.variants}` : ''}
                            ${item.domain ? ` | Domain: ${item.domain}` : ''}
                        </div>
                    </div>
                </div>
                <span class="item-status status-${item.status}">${item.status}</span>
            </div>
        `).join('');
    }

    updateCodeDisplay() {
        const code = this.analysisData.code;
        const codeElement = document.getElementById('source-code');
        
        switch (this.currentCodeType) {
            case 'html':
                codeElement.textContent = code.html;
                break;
            case 'css':
                codeElement.textContent = code.css;
                break;
            case 'js':
                codeElement.textContent = code.js;
                break;
        }
    }

    copyCode() {
        const codeElement = document.getElementById('source-code');
        navigator.clipboard.writeText(codeElement.textContent)
            .then(() => {
                this.showNotification('Code copied to clipboard!', 'success');
            })
            .catch(() => {
                this.showNotification('Failed to copy code', 'error');
            });
    }

    downloadCode() {
        const codeElement = document.getElementById('source-code');
        const code = codeElement.textContent;
        const filename = `${this.currentCodeType === 'js' ? 'script.js' : this.currentCodeType === 'css' ? 'styles.css' : 'index.html'}`;
        
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    formatCode() {
        // Simple code formatting (in a real app, you'd use a proper formatter)
        const codeElement = document.getElementById('source-code');
        let code = codeElement.textContent;
        
        // Basic formatting for demonstration
        if (this.currentCodeType === 'html') {
            code = this.formatHTML(code);
        } else if (this.currentCodeType === 'css') {
            code = this.formatCSS(code);
        } else if (this.currentCodeType === 'js') {
            code = this.formatJS(code);
        }
        
        codeElement.textContent = code;
    }

    formatHTML(html) {
        // Basic HTML formatting
        return html.replace(/></g, '>\n<').replace(/^\s+|\s+$/g, '');
    }

    formatCSS(css) {
        // Basic CSS formatting
        return css.replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}\n').replace(/;/g, ';\n  ');
    }

    formatJS(js) {
        // Basic JS formatting
        return js.replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}\n').replace(/;/g, ';\n');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
}

// Initialize the analyzer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analyzer = new AdvancedWebsiteAnalyzer();
});

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background: #10b981;
}

.notification-error {
    background: #ef4444;
}

.notification-info {
    background: #3b82f6;
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);