import React, { useEffect, useRef, forwardRef, useState } from "react";
import * as THREE from "three";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Instagram,
  MessageCircle,
  Linkedin,
  Copy,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const Contact = forwardRef(function Contact(props, ref) {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isThreeReady, setIsThreeReady] = useState(false);

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    particles: null,
    animationId: null,
  });

  // Initialize Three.js Scene
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;

      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0003);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.set(0, 0, 50);

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.3;

      // Create scene elements
      createStarField();
      createFloatingParticles();
      createContactNebula();
      createAmbientLighting();

      // Start animation
      animate();
      setIsThreeReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 2000;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        const radius = 300 + Math.random() * 700;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Contact-themed colors - more blues and purples
        const color = new THREE.Color();
        const colorChoice = Math.random();
        if (colorChoice < 0.5) {
          color.setHSL(0.6, 0.7, 0.8); // Blue
        } else if (colorChoice < 0.8) {
          color.setHSL(0.7, 0.6, 0.7); // Purple
        } else {
          color.setHSL(0, 0, 0.9); // White
        }

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 1.5 + 0.5;
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
            
            // Gentle rotation
            float angle = time * 0.01;
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
            gl_FragColor = vec4(vColor, opacity * 0.8);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const stars = new THREE.Points(geometry, material);
      refs.scene.add(stars);
      refs.stars.push(stars);
    };

    const createFloatingParticles = () => {
      const { current: refs } = threeRefs;
      const particleCount = 100;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
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
            
            // Floating motion
            pos.y += sin(time * 0.5 + pos.x * 0.01) * 5.0;
            pos.x += cos(time * 0.3 + pos.z * 0.01) * 3.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (50.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity * 0.6);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      refs.scene.add(particles);
      refs.particles = particles;
    };

    const createContactNebula = () => {
      const { current: refs } = threeRefs;

      const geometry = new THREE.PlaneGeometry(300, 200, 30, 30);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x4338ca) }, // Indigo
          color2: { value: new THREE.Color(0x7c3aed) }, // Purple
          color3: { value: new THREE.Color(0x2563eb) }, // Blue
          opacity: { value: 0.15 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float wave = sin(pos.x * 0.02 + time) * cos(pos.y * 0.02 + time) * 5.0;
            pos.z += wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          
          void main() {
            vec2 center = vUv - 0.5;
            float dist = length(center);
            
            float mixFactor1 = sin(vUv.x * 6.0 + time) * cos(vUv.y * 6.0 + time);
            float mixFactor2 = sin(vUv.x * 4.0 + time * 1.5) * cos(vUv.y * 4.0 + time * 1.5);
            
            vec3 color = mix(color1, color2, mixFactor1 * 0.5 + 0.5);
            color = mix(color, color3, mixFactor2 * 0.3 + 0.3);
            
            float alpha = opacity * (1.0 - dist * 2.0) * (sin(time * 0.5) * 0.2 + 0.8);
            gl_FragColor = vec4(color, max(0.0, alpha));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -100;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createAmbientLighting = () => {
      const { current: refs } = threeRefs;

      const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
      refs.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x4338ca, 0.5, 1000);
      pointLight.position.set(50, 50, 50);
      refs.scene.add(pointLight);
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

      // Update particles
      if (refs.particles && refs.particles.material.uniforms) {
        refs.particles.material.uniforms.time.value = time;
      }

      // Update nebula
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.3;
      }

      // Gentle camera movement
      refs.camera.position.x = Math.sin(time * 0.1) * 5;
      refs.camera.position.y = Math.cos(time * 0.15) * 3;
      refs.camera.lookAt(0, 0, 0);

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

      if (refs.particles) {
        refs.particles.geometry.dispose();
        refs.particles.material.dispose();
      }

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  // Animation effects
  useEffect(() => {
    if (!isThreeReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [isThreeReady]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("ksabhilash11111@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "ksabhilash11111@gmail.com",
      href: "mailto:ksabhilash11111@gmail.com",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      description: "Send me an email",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 99910 66996",
      href: "https://wa.me/+919991066996",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      description: "Message on WhatsApp",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Panipat, Haryana, India",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description: "Based in India",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ksabhilash-bot",
      color: "hover:text-gray-300",
      description: "View my repositories",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abhilash-k-s-b801ab386",
      color: "hover:text-blue-400",
      description: "Connect professionally",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/abhiiiii_lash",
      color: "hover:text-pink-400",
      description: "Follow my journey",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/+919991066996",
      color: "hover:text-green-400",
      description: "Direct message",
    },
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
        className="relative z-10 min-h-screen py-20 px-6"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2), rgba(0,0,0,0.4))",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            ref={titleRef}
            className="text-center mb-20 opacity-0 transform translate-y-8 transition-all duration-1000"
          >
            <Badge
              variant="outline"
              className="mb-4 text-indigo-300 border-indigo-400/30 bg-indigo-900/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Let's Connect
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Get In <span className="text-indigo-400">Touch</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              I'm always excited to collaborate on new projects and discuss
              innovative ideas. Let's create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12 items-center ">
            {/* Contact Form */}

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card
                      key={index}
                      className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-lg shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm`}
                          >
                            <method.icon
                              className={`w-6 h-6 ${method.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold">
                              {method.label}
                            </h4>
                            <p className="text-slate-300 text-sm">
                              {method.description}
                            </p>
                            <p className="text-slate-200 font-mono text-sm">
                              {method.value}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {method.label === "Email" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyEmailToClipboard}
                                className="text-slate-400 hover:text-white"
                              >
                                <Copy className="w-4 h-4" />
                                {copiedEmail && (
                                  <span className="ml-1 text-xs">Copied!</span>
                                )}
                              </Button>
                            )}
                            {method.href && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="text-slate-400 hover:text-white"
                              >
                                <a
                                  href={method.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Connect With Me
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <Card
                      key={index}
                      className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-lg"
                    >
                      <CardContent className="p-4">
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 text-white hover:text-indigo-300 transition-colors"
                        >
                          <social.icon
                            className={`w-6 h-6 ${social.color} transition-colors`}
                          />
                          <div>
                            <p className="font-semibold">{social.name}</p>
                            <p className="text-xs text-slate-400">
                              {social.description}
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <Card className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-400/30 backdrop-blur-lg">
                <CardContent className="p-6 text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    Ready to Start?
                  </h4>
                  <p className="text-indigo-200 text-sm mb-4">
                    Let's discuss your next project and bring your ideas to
                    life.
                  </p>
                  <Button
                    asChild
                    className="bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg"
                  >
                    <a href="mailto:ksabhilash11111@gmail.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Start Conversation
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for extra ambiance */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animation: "float 8s ease-in-out infinite alternate",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
