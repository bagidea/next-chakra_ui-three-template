// Typescript + Next + ChakraUI + Three Example

import {
    useEffect,
    MutableRefObject,
    useRef
} from "react"

import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from "three"

import { Flex } from "@chakra-ui/react"

const Index = () => {
    const canvas_element: MutableRefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const w: number = window.innerWidth
        const h: number = window.innerHeight

        const renderer: WebGLRenderer = new WebGLRenderer({
            canvas: canvas_element.current,
            antialias: true
        })
        renderer.setSize(w, h)

        const scene: Scene = new Scene()

        const mesh: Mesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial({ color: "red" })
        )

        scene.add(mesh)

        const camera: PerspectiveCamera = new PerspectiveCamera(60, w / h,0.1, 1000)
        camera.position.set(0, 1.5, 3)
        camera.lookAt(0, 0, 0)

        renderer.setAnimationLoop(() => {
            mesh.rotation.y += 0.01
            renderer.render(scene, camera)
        })

        window.addEventListener('resize', () => {
            const w: number = window.innerWidth
            const h: number = window.innerHeight

            camera.aspect = w / h
            camera.updateProjectionMatrix()

            renderer.setSize(w, h)
        })
    }, [])

    return (
        <Flex
            w="full"
            h="full"
        >
            <canvas ref={ canvas_element } />
        </Flex>
    )
}

export default Index