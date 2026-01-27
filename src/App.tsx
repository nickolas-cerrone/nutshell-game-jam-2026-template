import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';

function Box(props: ThreeElements['mesh']) {
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((_, delta) => (meshRef.current.rotation.x += delta));

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
        </mesh>
    );
}

export default function App() {
    return (
        <Canvas style={{ height: '100vh', width: '100vw' }}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-10, -10, -10]}
                decay={0}
                intensity={Math.PI}
            />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    );
}
