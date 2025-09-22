import React, { useEffect, useRef, forwardRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import abhi from "../../src/assets/abhi.jpg";

const HorizonHero = forwardRef(function HorizonHero(props, ref) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mottoRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 20,
    targetCameraZ: 100,
  });

  // Initialize Three.js Scene
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;

      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.set(0, 20, 100);

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();

      // Start animation
      animate();
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 3000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.6, 0.8, 0.9); // Blue stars
          } else {
            color.setHSL(0.8, 0.6, 0.8); // Purple stars
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              float angle = time * 0.02;
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;

      const geometry = new THREE.PlaneGeometry(4000, 2000, 50, 50);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x4f46e5) }, // Indigo
          color2: { value: new THREE.Color(0x7c3aed) }, // Purple
          opacity: { value: 0.2 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 10.0;
            pos.z += elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          
          void main() {
            float mixFactor = sin(vUv.x * 8.0 + time) * cos(vUv.y * 8.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.5);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -500;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;

      const layers = [
        { distance: -50, height: 40, color: 0x1e1b4b, opacity: 0.9 },
        { distance: -100, height: 60, color: 0x312e81, opacity: 0.7 },
        { distance: -150, height: 80, color: 0x3730a3, opacity: 0.5 },
      ];

      layers.forEach((layer) => {
        const points = [];
        const segments = 30;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 800;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 -
            50;
          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(400, -200));
        points.push(new THREE.Vector2(-400, -200));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;

      const geometry = new THREE.SphereGeometry(400, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.4, 1.0) * intensity;
            
            float pulse = sin(time) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.15);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time;
        }
      });

      // Update nebula
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      // Smooth camera movement
      if (refs.camera) {
        const smoothing = 0.03;
        refs.camera.position.x +=
          (refs.targetCameraX - refs.camera.position.x) * smoothing;
        refs.camera.position.y +=
          (refs.targetCameraY - refs.camera.position.y) * smoothing;
        refs.camera.position.z +=
          (refs.targetCameraZ - refs.camera.position.z) * smoothing;

        // Add subtle floating motion
        refs.camera.position.y += Math.sin(time * 0.5) * 1;
        refs.camera.lookAt(0, 0, -100);
      }

      refs.renderer.render(refs.scene, refs.camera);
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      const { current: refs } = threeRefs;

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener("resize", handleResize);

      // Dispose Three.js resources
      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        starField.material.dispose();
      });

      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose();
        mountain.material.dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1);

      setScrollProgress(progress);

      const { current: refs } = threeRefs;

      // Camera movement based on scroll
      refs.targetCameraY = 20 - progress * 30;
      refs.targetCameraZ = 100 - progress * 150;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP-style animations using CSS transitions and Intersection Observer
  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [
      titleRef.current,
      subtitleRef.current,
      mottoRef.current,
      imageRef.current,
      buttonsRef.current,
    ];
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform =
          index === 3 ? "translateY(20px) scale(0.9)" : "translateY(20px)";
        el.style.transition = `opacity 1s ease-out ${
          index * 0.2
        }s, transform 1s ease-out ${index * 0.2}s`;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isReady]);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ksabhilash-bot",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abhilash-k-s-b801ab386",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:ksabhilash11111@gmail.com", label: "Email" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Content Overlay */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-screen flex items-center px-6"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="text-center lg:text-left lg:w-1/2 w-full space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="bg-white/10 text-indigo-300 border-indigo-400/30 backdrop-blur-sm"
                >
                  Full Stack Developer
                </Badge>

                <h1
                  ref={titleRef}
                  className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
                >
                  Abhilash K S
                </h1>

                <h2
                  ref={subtitleRef}
                  className="text-2xl md:text-3xl text-indigo-300 font-medium"
                >
                  Crafting Digital Experiences
                </h2>
              </div>

              <p
                ref={mottoRef}
                className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                Driven by curiosity and passion for innovation, I transform
                ideas into impactful web experiences using cutting-edge
                technologies and modern design principles.
              </p>

              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl text-white"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>

            <div
              ref={imageRef}
              className="lg:w-1/2 w-full flex justify-center lg:justify-end"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>

                <div className="relative">
                  <img
                    src={`${abhi}`}
                    alt="Abhilash K S"
                    className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white/20 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 rounded-full border-2 border-indigo-400/20 animate-spin"
                    style={{ animation: "spin 20s linear infinite" }}
                  ></div>
                  <div
                    className="absolute -inset-4 rounded-full border border-purple-400/10 animate-spin"
                    style={{ animation: "spin 30s linear infinite reverse" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 z-20 flex flex-col items-center space-y-2 animate-bounce"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <ArrowDown className="w-5 h-5" />
      </div>

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: "float 6s ease-in-out infinite alternate",
            }}
          />
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
});

HorizonHero.displayName = "HorizonHero";

export default HorizonHero;
