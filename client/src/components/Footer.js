import React from 'react'

function Footer() {
  return (
    <>
<footer class="relative mt-20 bg-gray-900 px-4 pt-20">
  <div class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-gray-900 bg-gray-50 p-2">  <svg className="mr-1 w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.37 1277.39">
          <polygon className="fill-current text-gray-600" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
          <polygon className="fill-current text-gray-400" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
          <polygon className="fill-current text-gray-700" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
          <polygon className="fill-current text-gray-400" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
          <polygon className="fill-current text-gray-900" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
          <polygon className="fill-current text-gray-700" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
        </svg></div>
  <nav aria-label="Footer Navigation" class="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">

    <a href="#" class="font-medium text-white">Support</a>
    <a href="#" class="font-medium text-white">Disclaimer</a>
    <a href="#" class="font-medium text-white">Privacy Policy</a>
    <a href="#" class="font-medium text-white">Terms & Conditions</a>
  </nav>
  <p class="py-10 text-center text-gray-300">© 2024 Drive Trust | All Rights Reserved</p>
</footer>

    </>
  )
}

export default Footer