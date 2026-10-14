<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  Clock,
  DirectionalLight,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const props = defineProps({
  src: { type: String, default: "/Hulk3d.glb" },
  autoRotate: { type: Boolean, default: true },
});

const container = ref(null);
const status = ref("loading"); // loading | ready | error

let renderer;
let scene;
let camera;
let controls;
let frameId;
let resizeObserver;
let clock;
let model;
let disposed = false;

function init() {
  const el = container.value;
  if (!el) return;

  const width = el.clientWidth;
  const height = el.clientHeight || 400;

  // initialize renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // prevent performance issues on high-DPI screens
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.65; // reduce brightness
  el.appendChild(renderer.domElement);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";

  scene = new Scene();
  scene.background = null;

  const pmrem = new PMREMGenerator(renderer); // generate environment map for lighting
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.4;

  camera = new PerspectiveCamera(35, width / height, 0.1, 100); // create camera with a field of view of 35 degrees
  camera.position.set(1.8, 1.4, 2.6);

  const ambient = new AmbientLight(0xffffff, 0.15); // add ambient light
  scene.add(ambient);

  const key = new DirectionalLight(0xffffff, 0.6); // add key light
  key.position.set(3, 4, 2);
  scene.add(key);

  const rim = new DirectionalLight(0x9bd6ff, 0.25); // add rim light
  rim.position.set(-3, 2, -3);
  scene.add(rim);

  // initialize orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 6;
  controls.minPolarAngle = 0.2;
  controls.maxPolarAngle = Math.PI * 0.55;
  controls.target.set(0, 0.9, 0);

  // load GLB model
  const loader = new GLTFLoader();
  loader.load(
    props.src,
    (gltf) => {
      if (disposed) return;
      model = gltf.scene;

      const box = new Box3().setFromObject(model);
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      model.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const targetHeight = 1.8;
      const scaleFactor = targetHeight / maxDim;
      model.scale.setScalar(scaleFactor);

      const scaledBox = new Box3().setFromObject(model);
      model.position.y -= scaledBox.min.y;

      scene.add(model);
      controls.target.set(0, targetHeight * 0.5, 0);
      controls.update();
      status.value = "ready";
    },
    undefined,
    (err) => {
      console.error("Failed to load GLB", err);
      status.value = "error";
    },
  );

  clock = new Clock();

  // animation loop for auto-rotation
  const animate = () => {
    if (disposed) return;
    frameId = requestAnimationFrame(animate);
    const dt = clock.getDelta();
    if (props.autoRotate && model) {
      model.rotation.y += dt * 0.25;
    }
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  // observe window reszie to handle window resize
  resizeObserver = new ResizeObserver(() => {
    if (!renderer || !camera || !el) return;
    const w = el.clientWidth;
    const h = el.clientHeight || 400;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  resizeObserver.observe(el);
}

// cleanup function
function dispose() {
  disposed = true;
  if (frameId) cancelAnimationFrame(frameId);
  if (resizeObserver) resizeObserver.disconnect();
  if (controls) controls.dispose();
  if (renderer) {
    renderer.dispose();
    renderer.domElement?.remove();
  }
  scene?.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose?.();
    if (obj.material) {
      const materials = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];
      materials.forEach((m) => m.dispose?.());
    }
  });
}

onMounted(init);
onBeforeUnmount(dispose);
</script>

<template>
  <div
    class="relative h-full w-full overflow-hidden rounded-2xl border border-ink-200 bg-white bg-grid-light bg-grid dark:border-ink-800 dark:bg-ink-950 dark:bg-grid-dark"
  >
    <div
      ref="container"
      class="h-full w-full"
      aria-label="Interactive 3D model of a HULKs humanoid robot"
      role="img"
    ></div>

    <div
      v-if="status === 'loading'"
      class="pointer-events-none absolute inset-0 grid place-items-center text-ink-500 dark:text-ink-400"
    >
      <div class="flex flex-col items-center gap-3">
        <span
          class="block h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"
        ></span>
        <span class="font-mono text-xs uppercase tracking-widest">
          Loading robot…
        </span>
      </div>
    </div>

    <div
      v-else-if="status === 'error'"
      class="pointer-events-none absolute inset-0 grid place-items-center p-6 text-center text-ink-500 dark:text-ink-400"
    >
      <span class="font-mono text-xs uppercase tracking-widest">
        Could not load 3D model
      </span>
    </div>

    <div
      v-else
      class="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm"
    >
      Drag to rotate · scroll to zoom
    </div>
  </div>
</template>
