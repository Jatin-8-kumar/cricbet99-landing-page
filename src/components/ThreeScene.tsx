import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh, Group, MathUtils } from 'three';
import { PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';

interface ScrollSceneProps {
  scrollProgress: number;
}

function CricketBall({ ballRef }: { ballRef: React.RefObject<Mesh> }) {
  return (
    <mesh ref={ballRef} position={[2, 0, 0]} castShadow>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial 
        color="#a51c1c" 
        roughness={0.15} 
        metalness={0.2} 
        emissive="#400"
        emissiveIntensity={0.1}
      />
      {/* Seam detail */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.805, 0.02, 16, 100]} />
          <meshStandardMaterial color="#fff" roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, 0.05]}>
          <torusGeometry args={[0.805, 0.01, 16, 100]} />
          <meshStandardMaterial color="#ddd" roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, -0.05]}>
          <torusGeometry args={[0.805, 0.01, 16, 100]} />
          <meshStandardMaterial color="#ddd" roughness={0.5} />
        </mesh>
      </group>
    </mesh>
  );
}

function CricketBat({ batRef }: { batRef: React.RefObject<Group> }) {
  return (
    <group ref={batRef} position={[-2, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
      {/* Handle */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      {/* Grip texture (subtle) */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 1.1, 32]} />
        <meshStandardMaterial color="#222" roughness={1} wireframe opacity={0.3} transparent />
      </mesh>
      {/* Blade */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 3, 0.25]} />
        <meshStandardMaterial color="#d2b48c" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Blade edge detail */}
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[0.78, 2.9, 0.01]} />
        <meshStandardMaterial color="#c1a37b" roughness={0.5} />
      </mesh>
    </group>
  );
}

function ScrollAnimatedScene({ scrollProgress }: ScrollSceneProps) {
  const ballRef = useRef<Mesh>(null);
  const batRef = useRef<Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;

  // Internal state for smoothed targets
  const targets = useRef({
    ballPos: [0, 0, 0],
    ballScale: 1,
    ballRot: [0, 0, 0],
    batPos: [0, 0, 0],
    batScale: 1,
    batRot: [0, 0, 0],
  });

  useFrame((state, delta) => {
    const t = scrollProgress;
    const scale = isMobile ? 0.45 : 1;
    const xOffset = isMobile ? 0 : 2.5;

    // Calculate Targets based on scroll
    if (t < 0.15) {
      const p = t / 0.15;
      targets.current.ballPos = [MathUtils.lerp(xOffset, xOffset + 3, p), MathUtils.lerp(0, 3, p), MathUtils.lerp(0, -2, p)];
      targets.current.ballScale = MathUtils.lerp(scale, scale * 0.7, p);
      targets.current.batPos = [MathUtils.lerp(-xOffset, -xOffset - 3, p), MathUtils.lerp(0, -3, p), 0];
      targets.current.batScale = scale;
      targets.current.batRot = [0, 0, MathUtils.lerp(-Math.PI / 4, -Math.PI / 2, p)];
    } 
    else if (t < 0.4) {
      const p = (t - 0.15) / 0.25;
      targets.current.ballPos = [MathUtils.lerp(xOffset + 3, isMobile ? 0 : -4, p), MathUtils.lerp(3, isMobile ? -3 : -2, p), MathUtils.lerp(-2, 0, p)];
      targets.current.ballScale = MathUtils.lerp(scale * 0.7, scale * 1.3, p);
      targets.current.batPos = [MathUtils.lerp(-xOffset - 3, isMobile ? 0 : 4, p), MathUtils.lerp(-3, isMobile ? 3 : 2, p), 0];
      targets.current.batRot = [0, MathUtils.lerp(0, Math.PI, p), 0];
      targets.current.batScale = MathUtils.lerp(scale, scale * 0.8, p);
    }
    else if (t < 0.7) {
      const p = (t - 0.4) / 0.3;
      targets.current.ballPos = [MathUtils.lerp(isMobile ? 0 : -4, isMobile ? 2 : 5, p), MathUtils.lerp(isMobile ? -3 : -2, isMobile ? 2 : 3, p), 0];
      targets.current.ballScale = MathUtils.lerp(scale * 1.3, scale * 0.5, p);
      targets.current.batPos = [MathUtils.lerp(isMobile ? 0 : 4, isMobile ? -2 : -5, p), MathUtils.lerp(isMobile ? 3 : 2, isMobile ? -2 : -3, p), 0];
      targets.current.batRot = [0, 0, MathUtils.lerp(-Math.PI / 2, Math.PI / 4, p)];
      targets.current.batScale = MathUtils.lerp(scale * 0.8, scale * 0.6, p);
    }
    else {
      const p = (t - 0.7) / 0.3;
      targets.current.ballPos = [MathUtils.lerp(isMobile ? 2 : 5, 0, p), MathUtils.lerp(isMobile ? 2 : 3, -8, p), MathUtils.lerp(0, 15, p)];
      targets.current.batPos = [MathUtils.lerp(isMobile ? -2 : -5, 0, p), MathUtils.lerp(isMobile ? -2 : -3, 8, p), 0];
      targets.current.batRot = [MathUtils.lerp(0, Math.PI * 4, p), 0, 0];
    }

    // Apply Smoothing (Lerp towards targets)
    const lerpFactor = 0.08; // Lower = smoother/slower
    if (ballRef.current && batRef.current) {
      // Ball
      ballRef.current.position.x = MathUtils.lerp(ballRef.current.position.x, targets.current.ballPos[0], lerpFactor);
      ballRef.current.position.y = MathUtils.lerp(ballRef.current.position.y, targets.current.ballPos[1], lerpFactor);
      ballRef.current.position.z = MathUtils.lerp(ballRef.current.position.z, targets.current.ballPos[2], lerpFactor);
      ballRef.current.scale.setScalar(MathUtils.lerp(ballRef.current.scale.x, targets.current.ballScale, lerpFactor));
      
      // Bat
      batRef.current.position.x = MathUtils.lerp(batRef.current.position.x, targets.current.batPos[0], lerpFactor);
      batRef.current.position.y = MathUtils.lerp(batRef.current.position.y, targets.current.batPos[1], lerpFactor);
      batRef.current.position.z = MathUtils.lerp(batRef.current.position.z, targets.current.batPos[2], lerpFactor);
      batRef.current.scale.setScalar(MathUtils.lerp(batRef.current.scale.x, targets.current.batScale, lerpFactor));
      
      // Rotations
      batRef.current.rotation.x = MathUtils.lerp(batRef.current.rotation.x, targets.current.batRot[0], lerpFactor);
      batRef.current.rotation.y = MathUtils.lerp(batRef.current.rotation.y, targets.current.batRot[1], lerpFactor);
      batRef.current.rotation.z = MathUtils.lerp(batRef.current.rotation.z, targets.current.batRot[2], lerpFactor);

      // Add continuous floating motion + mouse parallax
      const time = state.clock.getElapsedTime();
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;

      ballRef.current.position.y += Math.sin(time * 1.2) * 0.005;
      ballRef.current.position.x += mouseX * 0.05;
      ballRef.current.position.y += mouseY * 0.05;
      ballRef.current.rotation.y += 0.005;
      
      batRef.current.position.y += Math.cos(time * 1.2) * 0.005;
      batRef.current.position.x += mouseX * 0.03;
      batRef.current.position.y += mouseY * 0.03;
    }
  });

  return (
    <>
      <CricketBall ballRef={ballRef} />
      <CricketBat batRef={batRef} />
    </>
  );
}

export default function ThreeScene({ scrollProgress = 0 }: ScrollSceneProps) {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#f6c445" />
        
        <Suspense fallback={null}>
          <ScrollAnimatedScene scrollProgress={scrollProgress} />
          <Environment preset="studio" />
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={10} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/20 via-transparent to-obsidian/40 pointer-events-none" />
    </div>
  );
}
