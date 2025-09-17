// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.
let hideModalTimeout = null

const modal = document.getElementById('modal')
const closeModalButton = document.getElementById('closeModal')
const modalCancelButton = document.getElementById('modalCancel')
const modalTitle = document.getElementById('modalTitle')
const modalBody = document.getElementById('modalBody')
const modalAction = document.getElementById('modalPrimaryAction')

// Close modal when clicking outside of the content
modal.addEventListener('click', (e) => {
  console.log(e.target)
  if (
    e.target === document.querySelector('.modal__overlay')
  ) {
    closeModal()
  }
})

function closeModal() {
  if (hideModalTimeout) {
    clearTimeout(hideModalTimeout)
  }

  modal.setAttribute('aria-hidden', 'true')
  modal.classList.remove('opacity-100', 'pointer-events-auto')
  modal.classList.add('opacity-0', 'pointer-events-none')

  hideModalTimeout = setTimeout(() => {
    modal.style.display = 'none'
    hideModalTimeout = null
  }, 300)
}

closeModalButton.addEventListener('click', closeModal)
modalCancelButton?.addEventListener('click', closeModal)

function openModal(variant, title, body) {
  if (hideModalTimeout) {
    clearTimeout(hideModalTimeout)
    hideModalTimeout = null
  }

  modalTitle.textContent = title
  modalBody.textContent = body

  // Set the button style based on the variant
  if (variant === 'primary') {
    modalAction.classList.remove('bg-red-600', 'hover:bg-red-700', 'focus:bg-red-700', 'focus:shadow-[0_0_0_1px_#d92d20,0_0_0_4px_rgba(217,45,32,0.12)]')
    modalAction.classList.add('bg-indigo-700', 'hover:bg-indigo-800', 'focus:bg-indigo-800', 'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)]')
    modalAction.textContent = 'Yes'
  } else {
    modalAction.classList.remove('bg-indigo-700', 'hover:bg-indigo-800', 'focus:bg-indigo-800', 'focus:shadow-[0_0_0_4px_rgba(68,76,231,0.12)]')
    modalAction.classList.add('bg-red-600', 'hover:bg-red-700', 'focus:bg-red-700', 'focus:shadow-[0_0_0_1px_#d92d20,0_0_0_4px_rgba(217,45,32,0.12)]')
    modalAction.textContent = 'Delete'
  }
  
  modal.style.display = 'flex'
  // 在下一次重绘前执行，让 display 变化先生效
  // 等待浏览器处理 display 变化后，在下一帧开始 opacity 过渡动画
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0', 'pointer-events-none')
    modal.classList.add('opacity-100', 'pointer-events-auto')
    modal.setAttribute('aria-hidden', 'false')
  })
}

window.onload = () => {
  openModal(
    'primary',
    'Are you sure you want to leave the process?',
    'Your upgrade plan process will be cancelled. You need to start again if you leave the process.',
  )
}