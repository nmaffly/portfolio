import React, { useEffect, useRef } from 'react';

function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Mouse position for interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                // Repulse from mouse
                const dx = particle.x - mouseX;
                const dy = particle.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx += (dx / distance) * force * 0.05;
                    particle.vy += (dy / distance) * force * 0.05;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20 overflow-hidden" style={{ minHeight: '400px' }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 1 }}
            />
            <div className="container mx-auto relative z-10" style={{ zIndex: 2 }}>
                <h1 className="text-6xl font-bold mb-4">Nathaniel Maffly</h1>
                <p className="text-2xl text-blue-100">Software Engineer & Developer</p>
            </div>
        </section>
    )
}

export default Hero;