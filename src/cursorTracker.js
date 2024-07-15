import { ref,onMounted,onUnmounted } from 'vue'

export function useCursorTracker(){
const cursorX=ref(0);
const cursorY=ref(0);
const updateCursorPosition=(event)=>{
  cursorX.value=event.clientX;
  cursorY.value=event.clientY;
};
onMounted(()=>{
  window.addEventListener('mousemove',updateCursorPosition);
})
onUnmounted(()=>{
  window.removeEventListener('mousemove',updateCursorPosition);
})
  return {cursorX, cursorY};
}