import React, { useRef, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { OrbitControls } from "@react-three/drei"
import { array, bool, object } from "prop-types"

import "./BackgroundCoin.scss"

const CoinMesh = props => {
    return (
        <mesh
            {...props}
            scale={.25}>
                <cylinderGeometry args={props.args} />
                <meshPhysicalMaterial map={props.texture} />
        </mesh>
    )
}

CoinMesh.propTypes = {
    args: array,
    isEdge: bool,
    rotation: array,
    texture: object
}

const Coin = props => {
    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.x = 8
        ref.current.rotation.y = 1.6
        ref.current.rotation.z = 0
    })

    const capTexture = useLoader(TextureLoader, "PokerChipTexture.png")
    const capBacksideTexture = useLoader(TextureLoader, "PokerChipTexture-backside.png")
    const edgeTexture = useLoader(TextureLoader, "PokerChipTextureEdge.png")

    return (
        <group {...props} ref={ref}>
            <CoinMesh position={[0, .12, 0]} args={[5, 5, 0, 64, 1, false]} rotation={[0, 0, 0]} texture={capTexture} />
            <CoinMesh position={[0, 0, 0]} args={[5, 5, 1, 64, 1, true]} rotation={[0, 3.8, 0]} texture={edgeTexture} isEdge />
            <CoinMesh position={[0, -.125, 0]} args={[5, 5, 0, 64, 1, false]} rotation={[0, 0, 0]} texture={capBacksideTexture} />
        </group>
    )
}

export const BackgroundCoin = () => {
    return (
        <Canvas className="backgroundCoin">
            <Suspense fallback={null}>
                <OrbitControls />
                <ambientLight intensity={0.25} />
                <spotLight position={[10,10,10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10,-10,-10]} />
                <Coin />
            </Suspense>
        </Canvas>
    )
}