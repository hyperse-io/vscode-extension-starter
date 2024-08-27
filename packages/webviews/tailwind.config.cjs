/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // Avoid conflicts with antd
    preflight: false,
  },
  plugins: [
    // 此处需要调整 font size base, 调整 tailwindcss 默认的 1rem==16px; 适配移动端.
    // "tailwindCSS.rootFontSize": 10 // <- your root font size here
    // require('tailwindcss-base-font-size')({
    //   baseFontSize: 100,
    // }),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
  ],
};
